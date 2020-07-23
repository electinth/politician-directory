import React, { useState } from "react"
import _ from "lodash"

import DropDown from "../components/page2/dropdown"
import BarChart from "../components/page2/barChart"
import ToggleSwitch from "../components/page2/toggleSwitch"

import data250 from "../contents/all250.yaml"

const cssGroupChart = {
  height: "300px",
  overflowY: "scroll",
  marginTop: "50px",
}
const cssColumnChart = {
  display: "inline-block",
}

const Page2 = props => {
  const [data, setData] = useState(data250)
  const [search_id, setSearch_id] = useState("")
  const [types, setTypes] = useState(props.types_250)
  const [is_yAxis, setYAxis] = useState(props.is_yAxis)
  const [width, setWidth] = useState(props.width)
  const [is_senate, setIs_senate] = useState(true)
  const [is_starter_bars, setStarter] = useState(true)
  const [is_showAll, setShowAll] = useState(true)
  const [is_showGroup, setShowGroup] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(props.choices)
  const [is_On, setIsOn] = useState(false)
  const [height_svg, setHeightSvg] = useState(data250.length * 30)
  const [is_all, setIs_all] = useState(true)

  const formatTypes = type => {
    if (type === "เห็นด้วย") {
      return 1
    } else if (type === "ไม่เห็นด้วย") {
      return 2
    } else if (type === "งดออกเสียง") {
      return 3
    } else if (type === "ไม่ลงมติ") {
      return 4
    } else if (type === "ขาด") {
      return 5
    }
  }

  const handleFilter = e => {
    let filter = e.target.innerText
    const sort_by_data = (a, b) => {
      if (filter !== "เวลาล่าสุด") {
        return b[formatTypes(filter)] - a[formatTypes(filter)]
      }
    }
    let currentFilter = { ...currentFilter }
    formatTypes(filter)
    let data_of_motion = [...data250]
    data_of_motion.sort(sort_by_data)
    setData(data_of_motion)
    setCurrentFilter(currentFilter)
  }

  const showAll = () => {
    setShowAll(true)
    setShowGroup(false)
    setIs_all(true)
  }
  const ShowGroup = () => {
    setShowAll(false)
    setShowGroup(true)
    setIs_all(false)
    setIsOn(false)
  }
  return (
    <div>
      Page 2<button onClick={showAll}>show all</button>
      <button onClick={ShowGroup}>show group</button>
      {is_showAll ? (
        <div>
          <DropDown
            choices={props.choices}
            currentFilter={currentFilter}
            handleFilter={handleFilter}
            is_senate={is_senate}
            colors={props.colors}
          />
          <ToggleSwitch is_On={is_On} handleToggle={() => setIsOn(!is_On)} />
          <BarChart
            data={data}
            types={types}
            w={width}
            is_yAxis={is_yAxis}
            color_bars={props.colors}
            is_starter_bars={is_starter_bars}
            height_svg={height_svg}
            is_On={is_On}
            is_all={is_all}
            search_id={search_id}
          />
        </div>
      ) : (
        <div>
          <div css={{ ...cssColumnChart, width: (32 / 250) * width }}>
            <DropDown
              choices={props.choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={props.colors}
            />
          </div>
          <div css={{ ...cssColumnChart, width: (88 / 250) * width }}>
            <DropDown
              choices={props.choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={props.colors}
            />
          </div>
          <div css={{ ...cssColumnChart, width: (130 / 250) * width }}>
            <DropDown
              choices={props.choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={props.colors}
            />
          </div>
          <div className="group_chart" css={cssGroupChart}>
            <div css={{ ...cssColumnChart, width: (32 / 250) * width }}>
              <BarChart
                data={data}
                types={types}
                w={(32 / 250) * width}
                is_yAxis={is_yAxis}
                color_bars={props.colors}
                is_starter_bars={is_starter_bars}
                height_svg={height_svg}
                is_On={is_On}
              />
            </div>
            <div css={{ ...cssColumnChart, width: (88 / 250) * width }}>
              <BarChart
                data={data}
                types={types}
                w={(88 / 250) * width}
                color_bars={props.colors}
                height_svg={height_svg}
                is_On={is_On}
              />
            </div>
            <div css={{ ...cssColumnChart, width: (130 / 250) * width }}>
              <BarChart
                data={data}
                types={types}
                w={(130 / 250) * width}
                color_bars={props.colors}
                height_svg={height_svg}
                is_On={is_On}
              />
            </div>
            {/* <ToggleSwitch
              is_On = {is_On}
              handleToggle = {() => setIsOn(!is_On)}
            /> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ({ data }) => {
  const types = ["id", "agree", "not_agree", "no_vote", "not_vote", "missing"]

  const types_250 = ["id", "1", "2", "3", "4", "5"]
  const is_yAxis = true

  const width = window.innerWidth

  const choices = {
    sort_by: {
      default: "เวลาล่าสุด",
      others: ["เห็นด้วย", "ไม่เห็นด้วย", "งดออกเสียง", "ไม่ลงมติ", "ขาด"],
    },
  }

  const colors = ["#76C8B8", "#F0324B", "#2D3480", "#7B90D1", "#E3E3E3"]

  return (
    <Page2
      data={data}
      types={types}
      types_250={types_250}
      width={width}
      is_yAxis={is_yAxis}
      choices={choices}
      colors={colors}
    />
  )
}
