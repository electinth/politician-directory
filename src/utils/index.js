import moment from "moment"
import _ from "lodash"

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
