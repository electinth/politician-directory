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
 * Format number with thousands
 * @param {Number} num
 */
export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

/**
 * Format ordinal number e.g. 2 => 2nd, 3 => 3rd
 * @param {Number} num
 */
export function formatOrdinalNumber(num) {
  const s = num.toString()
  const n = s.slice(-1)
  let ord
  switch (n) {
    case "1":
      ord = "st"
      break
    case "2":
      ord = "nd"
      break
    case "3":
      ord = "rd"
      break
    default:
      ord = "th"
  }
  return `${s}<sup>${ord}</sup>`
}

/**
 * Comparator function to use in Array.sort(sortThaiLocale)
 * @param {People} a Person object
 * @param {People} b Person object
 */
export function sortThaiLocale(a, b) {
  return a.name === b.name
    ? a.lastname.localeCompare(b.lastname, "th")
    : a.name.localeCompare(b.name, "th")
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

export function assetHistogram(edges, bins = [10, 100, 1000]) {
  const unknown = { name: "ไม่พบข้อมูล", value: 0 }
  let lowerbound = -1
  let prev_lowerbound
  const assets = [
    ...bins.map(max => {
      prev_lowerbound = lowerbound + 1
      lowerbound = max
      return {
        name: `${prev_lowerbound}-${max} ล้านบาท`,
        value: 0,
        max: max * 1e6,
      }
    }),
    {
      name: `${bins[bins.length - 1] + 1} ล้านบาทขึ้นไป`,
      value: 0,
      max: Number.POSITIVE_INFINITY,
    },
  ]
  edges.forEach(({ node }) => {
    if (typeof node.asset === "number" && node.asset >= 0) {
      for (const bin of assets) {
        if (node.asset <= bin.max) {
          bin.value++
          break
        }
      }
    } else {
      unknown.value++
    }
  })
  return [...assets, unknown]
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

/**
 * Template is an ordered list of columns to sort and set color
 * template = [
 *   { name: 'Male', label: 'เพศชาย', background: 'blue' },
 *   { name: 'Female', label: 'เพศหญฺิง', background: 'red' },
 * ]
 *
 * Where
 * - `name` is a group value to match
 * - `label`, if specified, use this value as a label name instead of value of `name`
 * - `background` set color for this stack
 * @param {*} data
 * @param {Array} template
 */
export function arrangeData(data, template, options = {}) {
  options = {
    valueKey: "name",
    ...options,
  }
  return _.compact(
    template.map((col, i) => {
      const item = _.find(data, [options.valueKey, col.name])
      if (!item) return null
      return {
        ...item,
        name: col.label || col.name,
        background: col.background,
      }
    })
  )
}

export function loadCategoryStats(data) {
  let education
  if (_.get(data, "education.group")) {
    education = [..._.get(data, "education.group")]
    education = arrangeData(education, [
      { name: "ต่ำกว่าปริญญาตรี", background: "var(--cl-theme-1)" },
      { name: "สถาบันทหาร", background: "var(--cl-theme-2)" },
      { name: "ปริญญาตรี", background: "var(--cl-theme-3)" },
      { name: "ปริญญาโท", background: "var(--cl-theme-4)" },
      { name: "ปริญญาเอก", background: "var(--cl-theme-5)" },
      { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
    ])
  }

  let occupation_group
  if (_.get(data, "occupation_group.group")) {
    occupation_group = [..._.get(data, "occupation_group.group")]
    occupation_group = padCategory(occupation_group)
    occupation_group = combineCategory(occupation_group)
    const main_occupation_group = occupation_group.filter(
      oc => !["อื่นๆ", "ไม่พบข้อมูล"].includes(oc.name)
    )
    occupation_group = arrangeData(occupation_group, [
      ...main_occupation_group.slice(0, 3).map((group, i) => ({
        name: group.name,
        background: `var(--cl-theme-${2 + i})`,
      })),
      { name: "อื่นๆ", background: "var(--cl-theme-5)" },
      { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
    ])
  }

  let gender
  if (_.get(data, "gender.group")) {
    gender = [..._.get(data, "gender.group")]
    gender = arrangeData(gender, [
      { name: "ชาย", background: "var(--cl-theme-2)" },
      { name: "หญิง", background: "var(--cl-theme-5)" },
      { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
    ])
  }

  let age
  if (_.get(data, "age.edges")) {
    age = [..._.get(data, "age.edges")]
    age = birthdayToAgeHistogram(age)
    age = arrangeData(age, [
      { name: "25-38 ปี", background: "var(--cl-theme-2)" },
      { name: "39-54 ปี", background: "var(--cl-theme-3)" },
      { name: "55-73 ปี", background: "var(--cl-theme-4)" },
      { name: "74 ปีขึ้นไป", background: "var(--cl-theme-5)" },
      { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
    ])
  }

  let asset
  if (_.get(data, "asset.edges")) {
    asset = [..._.get(data, "asset.edges")]
    asset = assetHistogram(asset)
    asset = arrangeData(asset, [
      { name: "0-10 ล้านบาท", background: "var(--cl-theme-2)" },
      { name: "11-100 ล้านบาท", background: "var(--cl-theme-3)" },
      { name: "101-1000 ล้านบาท", background: "var(--cl-theme-4)" },
      { name: "1001 ล้านบาทขึ้นไป", background: "var(--cl-theme-5)" },
      { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
    ])
  }

  let mp_type
  if (_.get(data, "mp_type.group")) {
    mp_type = [..._.get(data, "mp_type.group")]
    mp_type = arrangeData(mp_type, [
      { name: "บัญชีรายชื่อ", background: "var(--cl-theme-2)" },
      { name: "แบ่งเขต", background: "var(--cl-theme-5)" },
    ])
  }

  return {
    gender,
    asset,
    age,
    education,
    occupation_group,
    mp_type,
  }
}

export function filterVote(peopleVotelog, key, value) {
  return _.filter(peopleVotelog, o => {
    return _.find(o.votelog, p => p.key === key).value === value
  })
}

export function joinPeopleVotelog(people, peopleVotelogs, votelogs) {
  const votelogByPeople = peopleVotelogs.edges.map(({ node }) => node)
  const allPeople = people.edges.map(({ node: person }) => {
    const vote = _.find(votelogByPeople, ["id", person.id])
    return {
      ...person,
      ...vote,
    }
  })

  return votelogs.edges.map(({ node: votelog }) => {
    const approve = filterVote(allPeople, votelog.id, "1").length
    const disprove = filterVote(allPeople, votelog.id, "2").length
    const abstained = filterVote(allPeople, votelog.id, "3").length
    const absent = filterVote(allPeople, votelog.id, "4").length
    const filteredVoteResult = {
      approve,
      disprove,
      abstained,
      absent,
      total_voter: approve + disprove + abstained + absent,
    }
    return {
      ...votelog,
      ...filteredVoteResult,
    }
  })
}

export function calculateVoteLog(votelog) {
  const { approve, disprove, abstained, absent } = votelog
  const total_voter = approve + disprove + abstained + absent
  const passed = (total_voter > 0 ? approve / total_voter : 0) >= 0.5
  return {
    passed,
    total_voter,
    approve,
    disprove,
    abstained,
    absent,
  }
}
