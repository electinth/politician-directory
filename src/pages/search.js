import React from "react"
import axios from "axios"
import Select from "react-select"

const getLocationOptions = () => axios.get("/content/locations.json")
const getZones = () => axios.get("/content/zones.json")

const SearchPage = () => {
  const [selected, setSelected] = React.useState()
  const [zones, setZones] = React.useState([])
  const [locationOptions, setLocationOptions] = React.useState([])

  React.useEffect(() => {
    let ignore = false

    Promise.all([getLocationOptions(), getZones()]).then(results => {
      if (!ignore) {
        setLocationOptions(results[0].data)
        setZones(results[1].data)
      }
    })

    return () => {
      ignore = true
    }
  }, [])

  const filteredZones = React.useMemo(() => {
    if (!selected || !zones) return []
    const [province, area] = selected.split(" ")

    return zones
      .filter(({ province: p }) => p === province)
      .filter(({ areas }) => areas.includes(area))
  }, [selected, zones])

  return (
    <div style={{ padding: "1rem" }}>
      <Select
        options={locationOptions}
        onChange={({ value }) => setSelected(value)}
      />
      {selected && (
        <ul style={{ marginTop: "1rem" }}>
          {filteredZones.map((item, key) => (
            <li key={key}>
              {(() => {
                const { title, name, lastname } = item.peoples[0]
                return (
                  <div>
                    <div>{`${title} ${name} ${lastname}`}</div>
                    <div>
                      {`จังหวัด${item.province}, เขตการเลือกตั้ง ${item.zone}`}
                    </div>
                    <div>
                      {item.areas
                        .map(area => `${item.prefixes.area}${area}`)
                        .join(", ")}
                    </div>
                  </div>
                )
              })()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchPage
