// Run: cd tools/
// node -r esm csv2yaml <file.tsv>

import jsYaml from "js-yaml"
import csv from "csvtojson"
import fs from "fs"
import path from "path"
import _ from "lodash"
import moment from "moment"

if (process.argv.length < 3) {
  console.log("Usage: node -r esm csv2yaml <file.csv>")
  process.exit()
}

function splitPeopleName(people_name) {
  people_name = _.trim(people_name) ;
  let title = '';
  let name = people_name;
  let last_name = '';
  // TODO: #171 support split name fields semantically
  const r = /^(นาย|นางสาว|นาง)/gm;
  const matches = r.exec(people_name);
  if (matches) {
    if (matches.index === 0) {
      title = matches[0];
      const name_starts = matches.index + matches[0].length;
      const full_name = _.compact(people_name.slice(name_starts).split(' '));
      name = full_name[0];
      last_name = full_name.slice(1).join(' ');
    }
  }
  return {
    title,
    name,
    last_name
  };
}

function clean(val, key, object) {
  if (key === "deputy_prime_minister") console.log(object.name, val)
  try {
    // handle string
    if (_.isString(val)) {
      val = _.trim(val)
      // clear all occurences of "-"
      if (["-", " "].includes(val)) {
        val = ""
      }
    }
    // handle array
    if (Array.isArray(val)) {
      // clear falsy value e.g. '', false, null
      val = _.compact(val)
      // only unique values
      val = _.uniq(val)
      // clear all occurences of "-"
      val = _.filter(val, s => !["", "-", " "].includes(s))
      // clean items in array
      val = _.map(val, (v, i) => clean(v, i, val))
    }
    // handle object
    if (_.isPlainObject(val)) {
      // clean values for each key
      val = _.mapValues(val, clean)
    }
    // trim keys
    const trimKeys = [
      // people
      "quotes",
      "quotes_url",
    ]
    if (trimKeys.includes(key)) {
      val = _.trim(val.trim(), "\n\r")
    }
    // parse boolean keys
    // and keys with leading is_*
    const booleanKeys = [
      // votelog
      "passed",
    ]
    if (booleanKeys.includes(key) || /^is_/i.test(key)) {
      if (val === "-") return null
      if (["ผ่าน"].includes(val)) return true
      if (["ไม่ผ่าน"].includes(val)) return false
      val = String(val) === "1"
    }
    // parse date keys
    const dateKeys = [
      // people
      "birthdate",
      "active_since",
      "inactive_since",
      // party
      "established_date",
      // votelog
      "vote_date",
      // motion
      "proposal_date",
    ]
    if (dateKeys.includes(key)) {
      if (val === "-") return null
      // convert DD/MM/YYYY to YYYY-MM-DD
      if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(val)) {
        val = `${val.slice(6, 10)}-${val.slice(3, 5)}-${val.slice(0, 2)}`;
      }
      let dt
      if (val) {
        dt = moment(val)
        if (!dt.isValid()) {
          console.error(`Invalid date: ${key}=${val} at id=${object.id}`)
          val = null
        }
      }
      if (dt && dt.isValid()) {
        if (dt.year() > 2100) dt.year(dt.year() - 543)
        val = dt.format("YYYY-MM-DD")
      } else {
        val = null
      }
    }
    // parse number keys
    const numberKeys = [
      // people
      "vote",
      "asset",
      "debt",
      // party
      "total_member",
      "party_ordinal",
      // votelog
      "approve",
      "disprove",
      "abstained",
      "absent",
      "total_voter",
    ]
    if (numberKeys.includes(key)) {
      if (val === "-") return null
      val = val.replace(/,/g, "")
      val = val ? Number(val) : null
    }
    // parse votelog ID
    const votelogKeys = [
      // people_vote
      "votelog",
    ]
    if (votelogKeys.includes(key)) {
      // convert: * = { 'key__1': a }
      // to: * = { '1': a }
      val = _.mapKeys(val, (v, k) => k.replace(/^key__/gi, ""))
      // convert: * = { '1': a, '2': b, ... }
      // to: * = [{ key: '1', value: a }, { key: '2', value: b }, ...]
      val = _.map(val, (v, k) => ({ key: k, value: v }))
    }
    // parse purposers and seconders
    const purposerKeys = [
      // motion
      "purposers",
      "seconders",
      "adhoc_committee_members",
    ]
    if (purposerKeys.includes(key)) {
      // remove those without name
      val = val.filter(people => !!people.name);
      // TODO: split name into title, name, last_name
      val = val.map(people => ({
        ...people,
        ...splitPeopleName(people.name)
      }))
    }
  } catch (err) {
    console.error(`Error cleaning: [id=${object.id}] ${key}=${val}`)
  }

  return val
}

const inputPath = path.resolve(process.argv[2])
const inputExt = path.extname(inputPath)
const inputBasename = path.basename(inputPath, inputExt)
const outPath = path.join(path.dirname(inputPath), `${inputBasename}.yaml`)

async function start() {
  try {
    const csvOptions = { trim: true, checkColumn: true }
    const data = await csv(csvOptions).fromFile(inputPath)
    const clean_data = data.map(item => _.mapValues(item, clean))
    const yamlOptions = {}
    const yaml = jsYaml.safeDump(clean_data, yamlOptions)

    fs.writeFileSync(outPath, yaml)
  } catch (err) {
    console.error("Error:", err)
  }
  return outPath
}

console.log(`Converting CSV to YAML: ${inputPath}`)
start().then(outPath => {
  console.log(`Output: "${outPath}"`)
  console.log("Done.")
})
