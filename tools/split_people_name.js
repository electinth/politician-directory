import _ from "lodash"

const commons = [
  "นาย",
  "นางสาว", "น.ส.",
  "นาง",
  "เด็กชาย", "ด.ช.",
  "เด็กหญิง", "ด.ญ",
]

const academics = [
  // (*)ศาสตราจารย์* shall be defined before explicit (*)ศาสตราจารย์
  "ศาสตราจารย์พิเศษ", "ศ.",
  "ศาสตราจารย์เกียรติคุณ", "ศ.",
  "ศาสตราจารย์", "ศ.",
  "รองศาสตราจารย์พิเศษ", "รศ.",
  "รองศาสตราจารย์", "รศ.",
  "ผู้ช่วยศาสตราจารย์พิเศษ", "ผศ.",
  "ผู้ช่วยศาสตราจารย์", "ผศ.",
]

const ranks = [
  // Police
  // This shall be defined before any other sections; because of พล.ต.* and ร.ต.*
  "พลตำรวจเอก", "พล.ต.อ.",
  "พลตำรวจโท", "พล.ต.ท.",
  "พลตำรวจตรี", "พล.ต.ต.",
  "พันตำรวจเอก", "พ.ต.อ.",
  "พันตำรวจโท", "พ.ต.ท.",
  "พันตำรวจตรี", "พ.ต.ต.",
  "ร้อยตำรวจเอก", "ร.ต.อ.",
  "ร้อยตำรวจโท", "ร.ต.ท.",
  "ร้อยตำรวจตรี", "ร.ต.ต.",
  "ดาบตำรวจ", "ด.ต.",
  "จ่าสิบตำรวจ", "จ.ส.ต.",
  "สิบตำรวจเอก", "ส.ต.อ.",
  "สิบตำรวจโท", "ส.ต.ท.",
  "สิบตำรวจตรี", "ส.ต.ต.",

  // Air Force
  // This shall be defined before Army section; because of พล.อ.* and พ.อ.*
  "พลอากาศเอก", "พล.อ.อ.",
  "พลอากาศโท", "พล.อ.ท.",
  "พลอากาศตรี", "พล.อ.ต.",
  "นาวาอากาศเอก", "น.อ.",
  "นาวาอากาศโท", "น.ท.",
  "นาวาอากาศตรี", "น.ต.",
  "เรืออากาศเอก", "ร.อ.",
  "เรืออากาศโท", "ร.ท.",
  "เรืออากาศตรี", "ร.ต.",
  "พันจ่าอากาศเอกพิเศษ", "พ.อ.อ.(พ.).",
  "พันจ่าอากาศเอก", "พ.อ.อ.",
  "พันจ่าอากาศโท", "พ.อ.ท.",
  "พันจ่าอากาศตรี", "พ.อ.ต.",
  "จ่าอากาศเอก", "จ.อ.",
  "จ่าอากาศโท", "จ.ท.",
  "จ่าอากาศตรี", "จ.ต.",
  
  // Army
  "พลเอก", "พล.อ.",
  "พลโท", "พล.ท.",
  "พลตรี", "พล.ต.",
  "พันเอก", "พ.อ.",
  "พันโท", "พ.ท.",
  "พันตรี", "พ.ต.",
  "ร้อยเอก", "ร.อ.",
  "ร้อยโท", "ร.ท.",
  "ร้อยตรี", "ร.ต.",
  "จ่าสิบเอกพิเศษ", "จ.ส.อ(พ.).",
  "จ่าสิบเอก", "จ.ส.อ.",
  "จ่าสิบโท", "จ.ส.ท.",
  "จ่าสิบตรี", "จ.ส.ต.",
  "สิบเอก", "ส.อ.",
  "สิบโท", "ส.ท.",
  "สิบตรี", "ส.ต.",
  "สิบตรีกองประจำการ", "ส.ต.",

  // Navy
  "พลเรือเอก", "พล.ร.อ.",
  "พลเรือโท", "พล.ร.ท.",
  "พลเรือตรี", "พล.ร.ต.",
  "นาวาเอก", "น.อ.",
  "นาวาโท", "น.ท.",
  "นาวาตรี", "น.ต.",
  "เรือเอก", "ร.อ.",
  "เรือโท", "ร.ท.",
  "เรือตรี", "ร.ต.",
  "พันจ่าเอกพิเศษ", "พ.จ.อ.(พ.).",
  "พันจ่าเอก", "พ.จ.อ.",
  "พันจ่าโท", "พ.จ.ท.",
  "พันจ่าตรี", "พ.จ.ต.",
  "จ่าเอก", "จ.อ.",
  "จ่าโท", "จ.ท.",
  "จ่าตรี", "จ.ต.",
]

const royalsAndHonours = [
  "หม่อมราชนิกุล",
  "หม่อมราชวงศ์", "ม.ร.ว.",
  "หม่อมหลวง", "ม.ล.",
  "ท่านผู้หญิง",
  "คุณหญิง",
  "คุณ",
]

const commonsRegEx = getRegEx(
  removeDuplicated(commons)
)
const academicsRegEx = getRegEx(
  removeDuplicated(academics)
)
const ranksRegEx = getRegEx(
  removeDuplicated(
    ranks.concat(
      addActing(ranks)
    )
  )
)
const royalsAndHonoursRegEx = getRegEx(
  removeDuplicated(royalsAndHonours)
)

export function splitPeopleName(fullName) {
  let init = { title: "", name: _.trim(fullName) }

  /* Possible title patterns: 
   * - commoner only
   * - academic -> ranker -> royal/honour (according to Royal Society of Thailand)
   */

  let commoner = matchTitle(init, commonsRegEx)
  if (commoner.matched) {
    // Commoner pattern, early returns
    return seperateLastName(commoner)
  }

  let royalOrHonour = matchTitle(init, royalsAndHonoursRegEx)
  if (royalOrHonour.matched) {
    // Royal or honour title is the rearmost title, early returns
    return seperateLastName(royalOrHonour)
  }

  let ranker = matchTitle(init, ranksRegEx)
  if (ranker.matched) {
    // Rank title can be followed by royal or honour title
    let rankerAndRoyal = matchTitle(ranker, royalsAndHonoursRegEx)
    return seperateLastName(rankerAndRoyal)
  }

  let academic = matchTitle(init, academicsRegEx)
  if (academic.matched) {
    // Academic title can be followed by royal or honour title
    let academicAndRoyal = matchTitle(academic, royalsAndHonoursRegEx)
    if (academicAndRoyal.matched) {
      return seperateLastName(academicAndRoyal)
    }

    // Or ranker title (and then, royal or honour one)
    let academicAndRanker = matchTitle(academic, ranksRegEx)
    if (academicAndRanker.matched) {
      let academicAndRankerAndRoyal = matchTitle(academicAndRanker, royalsAndHonoursRegEx)  
      return seperateLastName(academicAndRankerAndRoyal)
    }

    return seperateLastName(academic)
  }

  return seperateLastName(init)
}

function matchTitle({ title, name }, regEx) {
  let matches = name.match(regEx)
  if (matches === null) {
    return { title, name, matched: false }
  }
  return {
    title: `${title}${matches[0]}`,
    name: name.slice(matches[0].length),
    matched: true,
  }
}

function seperateLastName({ title, name }) {
  const splited = _.compact(name.split(" "))
  return {
    title,
    name: splited[0],
    last_name: splited.slice(1).join(" "),
  }
}

function removeDuplicated(titles) {
  return [...(new Set(titles))]
}

function addActing(titles) {
  return titles.map(e => `ว่าที่${e}`)
}

function escapeStringInRegEx(word) {
  return word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

function getRegEx(titles) {
  const concated = titles
    .reduce((
      prev, curr) => `${prev}|${escapeStringInRegEx(curr)}`,
      "",
    )
    .substr(1)
  return new RegExp(`^(${concated})`, 'gm')
}