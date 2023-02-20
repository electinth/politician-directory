const fs = require("fs")
const zones = require("../../src/contents/zones.json")

const removeDuplicate = arr => Array.from(new Set(arr))

const buildLocationOptions = path => {
  try {
    const provincesAndAreas = zones.reduce((acc, zone) => {
      if (acc[zone.province]) {
        return {
          ...acc,
          [zone.province]: removeDuplicate([
            ...acc[zone.province],
            ...zone.areas.map(area => area.area),
          ]),
        }
      }

      return {
        ...acc,
        [zone.province]: [
          zone.prefixes.area, // first of the province array is the prefix of the area
          ...zone.areas.map(area => area.area), // the rest are the areas
        ],
      }
    }, {})

    // produce the options (label, value) for the location search ReactSelect
    const locationOptions = Object.keys(provincesAndAreas).reduce(
      (acc, key) => {
        const areas = provincesAndAreas[key]

        let prefix = areas.shift()
        if (prefix === "อำเภอ") {
          prefix = "อ."
        }
        if (areas.length === 1) {
          prefix = ""
        }

        return [
          ...acc,
          ...areas.map(area => ({
            label: `${prefix}${area} จ.${key}`,
            value: `${key} ${area}`,
          })),
        ]
      },
      []
    )

    fs.writeFileSync(path, JSON.stringify(locationOptions), "utf8")
  } catch (e) {
    console.log(e)
  }
}

module.exports = buildLocationOptions
