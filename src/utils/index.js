import moment from "moment"
import _ from "lodash"

/**
 * Format date
 * @param {Date,String,moment} date
 */
export function formatDate(dt) {
  return moment(dt).format("DD.MM.YYYY")
}

/**
 * Create poltician profile image URL
 * @param {People} profile
 */
export function politicianPicture(profile) {
  if (!profile.name || !profile.lastname) return ""
  return `https://elect.thematter.co/data/politicians/${profile.name}-${profile.lastname}.jpg`
}
/**
 * Create poltician profile image URL
 * @param {People} profile
 */
export function partyLogo(partyName) {
  return `https://elect.in.th/candidates/statics/party-logos/${partyName}.png`
}

/**
 * Calcaulate person's age from his/her birthdaty
 * @param {String, Date} birthdate Date format accepted by moment
 */
export function ageFromBirthdate(birthdate) {
  return moment().diff(moment(birthdate), "years")
}

/**
 * For fun. Change arabic number to Thai reading
 * @param {Number} number
 */
export function getThaiName(number) {
  const mapping = d => {
    switch (d) {
      case "0":
        return "ศูนย์"
      case "1":
        return "หนึ่ง"
      case "2":
        return "สอง"
      case "3":
        return "สาม"
      case "4":
        return "สี่"
      case "5":
        return "ห้า"
      case "6":
        return "หก"
      case "7":
        return "เจ็ด"
      case "8":
        return "แปด"
      case "9":
        return "เก้า"
      default:
        return "ว่าง"
    }
  }
  const digits = String(number)
  return _.map(digits, d => mapping(d)).join("")
}

export function float2Grey(x) {
  x = 1 - x
  x = parseInt(x * 15)
  x = x.toString(16)
  return "#" + x + x + x
}

export function calculateBackground(input) {
  let count = input.length - 1
  input.forEach((x, idx) => {
    x.background = float2Grey(idx / count)
  })
  return input
}

export function combineCategory(input, restMin = 3) {
  // first, split 'unknown' and other values
  const unknownIndex = _.findIndex(input, ["name", "ไม่พบข้อมูล"])
  const [unknown] = unknownIndex >= 0 ? input.splice(unknownIndex, 1) : []

  // sort the rest by m
  input.sort((a, b) => parseInt(b.value) - parseInt(a.value))
  let temp = []
  let count_others = 0
  input.map((x, idx) => {
    if (idx > restMin - 1) {
      count_others += x.value
    } else {
      temp.push(x)
    }
    return x
  })
  if (count_others > 0) {
    temp.push({ value: count_others, name: "อื่นๆ" })
  }
  input = temp

  // lastly, put 'unknown' back as the last item
  if (unknown) {
    input.push(unknown)
  }
  return input
}

export function padCategory(input) {
  input.map(x => {
    if (!x.name) {
      x.name = "ไม่พบข้อมูล"
    }
    return x
  })
  return input
}

export function birthdayToAgeHistogram(birthdate, ageBin = [39, 55, 74]) {
  let age = []
  age.push({
    name: String("25-" + String(ageBin[0] - 1)) + " ปี",
    value: 0,
  })
  age.push({
    name: String(ageBin[0]) + "-" + String(ageBin[1] - 1) + " ปี",
    value: 0,
  })
  age.push({
    name: String(ageBin[1]) + "-" + String(ageBin[2] - 1) + " ปี",
    value: 0,
  })
  age.push({ name: String(ageBin[2]) + " ปีขึ้นไป", value: 0 })
  const today = parseInt(moment().format("YYYY"))
  birthdate.map(x => {
    const y = parseInt(moment(x.node.birthdate).format("YYYY"))
    const a = today - y
    if (a < ageBin[0]) {
      age[0].value++
    } else if (a < ageBin[1]) {
      age[1].value++
    } else if (a < ageBin[2]) {
      age[2].value++
    } else {
      age[3].value++
    }
    return x
  })
  return age
}
