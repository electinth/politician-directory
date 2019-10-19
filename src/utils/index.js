import moment from "moment"

export function ageFromBirthdate(birthdate) {
  return moment().diff(moment(birthdate), "years")
}
