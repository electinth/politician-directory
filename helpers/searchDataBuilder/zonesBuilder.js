const yaml = require("js-yaml")
const fs = require("fs")
const zones = require("../../src/contents/zones.json")

const loadPeoples = () =>
  yaml
    .safeLoad(fs.readFileSync("./src/contents/people.yaml", "utf8"))
    .filter(person => person.mp_type === "แบ่งเขต" && person.is_active)

const onlyPeopleInZone = zone => person =>
  +person.mp_zone === zone.zone && person.mp_province === zone.province

const pick = keys => object =>
  keys.reduce((obj, key) => {
    obj[key] = object[key]
    return obj
  }, {})

const buildSearchableZones = path => {
  try {
    const peoples = loadPeoples()

    const searchContent = zones.map(zone => ({
      ...zone,
      areas: zone.areas.map(area => area.area),
      peoples: peoples
        .filter(onlyPeopleInZone(zone))
        .map(pick(["title", "name", "lastname", "mp_province", "mp_zone"])),
    }))

    fs.writeFileSync(path, JSON.stringify(searchContent), "utf8")
  } catch (e) {
    console.log(e)
  }
}

module.exports = buildSearchableZones
