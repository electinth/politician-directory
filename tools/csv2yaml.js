// Run: cd tools/
// node -r esm csv2yaml <file.tsv>

import jsYaml from "js-yaml"
import csv from "csvtojson"
import fs from "fs"
import path from "path"
import _ from "lodash"
import moment from "moment"
import { splitPeopleName } from "./split_people_name"

if (process.argv.length < 3) {
  console.log("Usage: node -r esm csv2yaml <file.csv>")
  process.exit()
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
        val = `${val.slice(6, 10)}-${val.slice(3, 5)}-${val.slice(0, 2)}`
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
      // convert: * = { '__1': a }
      // to: * = { '1': a }
      val = _.mapKeys(val, (v, k) => k.replace(/^__/gi, ""))
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
      val = val.filter(people => !!people.name)
      // TODO: split name into title, name, last_name
      val = val.map(people => ({
        ...people,
        ...splitPeopleName(people.name),
      }))
    }

    // Lastly, handle object
    if (_.isPlainObject(val)) {
      // clean values for each key
      val = _.omitBy(_.mapValues(val, clean), omit)
    }
  } catch (err) {
    console.error(`Error cleaning: [id=${object.id}] ${key}=${val}`)
  }

  return val
}

// Exclude some field by its key or value
function omit(val, key) {
  if (key.indexOf("__") === 0) {
    console.log("omit:", key)
    return true
  }
  return false
}

function transform(object) {
  if (typeof object !== "object") return object

  // senate_votelog: add votelog slug
  if (inputBasename === 'senate_votelog') {
    if (object.vote_date) {
      const dt = moment(object.vote_date);
      const year_be = String(+dt.format('YYYY') + 543);
      const votelog_code = `${dt.format('DD/MM/')}${year_be.slice(-2)}-${object.id}`;
      object.code = votelog_code;
    }
  }

  return object
}

const inputPath = path.resolve(process.argv[2])
const inputExt = path.extname(inputPath)
const inputBasename = path.basename(inputPath, inputExt)
const outPath = path.join(path.dirname(inputPath), `${inputBasename}.yaml`)

async function start() {
  try {
    const csvOptions = { trim: true, checkColumn: true }
    const data = await csv(csvOptions).fromFile(inputPath)
    const clean_data = data.map(item =>
      _.omitBy(transform(_.mapValues(item, clean)), omit)
    )
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
