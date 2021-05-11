// Run: cd tools/
// node -r esm csv2yaml

import csv from "csvtojson"
import fs from "fs"
import path from "path"
import _ from "lodash"
import dayjs from "dayjs"

dayjs.extend(customParseFormat)

if (process.argv.length < 3) {
  console.log("Usage: node -r esm csv2dictionary <file.csv>")
  process.exit()
}

function createMarkdownTable(data) {
  return [
    "|Field|Description|Notes|",
    "|--:|--|--|",
    ..._.map(data, (val, key) => {
      return `|${val}|${key}| |`
    }),
  ].join("\n")
}

function clean(val, key, object) {
  try {
    if (Array.isArray(val)) {
      val = _.compact(val)
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
    ]
    if (dateKeys.includes(key)) {
      let date = dayjs(val, ["DD/MM/YYYY", "YYYY-MM-DD"])

      if (date.isValid()) {
        if (date.year() > 2100) {
          date = date.year(date.year() - 543)
        }

        val = date.format("YYYY-MM-DD")
      } else {
        console.error(`Invalid date: ${key}=${val} at id=${object.id}`)
        val = null
      }
    }
    // parse number keys
    const numberKeys = [
      // people
      "vote",
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
      val = val.replace(/,/g, "")
      val = val ? Number(val) : null
    }
    // parse votelog ID
    const votelogKeys = [
      // people_vote
      "votelog",
    ]
    if (votelogKeys.includes(key)) {
      val = _.mapKeys(val, (v, k) => k.replace(/^key__/gi, ""))
    }
  } catch (err) {
    console.error(`Error cleaning: [id=${object.id}] ${key}=${val}`)
  }

  return val
}

const inputPath = path.resolve(process.argv[2])
const inputExt = path.extname(inputPath)
const inputBasename = path.basename(inputPath, inputExt)
const outPath = path.join(path.dirname(inputPath), `${inputBasename}.md`)

async function start() {
  try {
    const csvOptions = { trim: true, checkColumn: true, delimiter: "\t" }
    const data = await csv(csvOptions).fromFile(inputPath)
    const clean_data = data.map(item => _.mapValues(item, clean))
    const markdownContent = createMarkdownTable(clean_data[0])

    fs.writeFileSync(outPath, markdownContent)
  } catch (err) {
    console.error("Error:", err)
  }
  return outPath
}

console.log("converting headers in CSV to data dictionary in MD...")
start().then(outPath => {
  console.log(`output: "${outPath}"`)
  console.log("done")
})
