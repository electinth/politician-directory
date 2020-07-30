import React, { useState } from "react"
import _ from "lodash"
import { graphql, useStaticQuery } from "gatsby"
import DropDown from "../components/page2/dropdown"
import BarChart from "../components/page2/barChart"
import ToggleSwitch from "../components/page2/toggleSwitch"

// import data250 from "../contents/all250.yaml"

const cssGroupChart = {
  height: "300px",
  overflowY: "scroll",
  marginTop: "50px",
}
const cssGroupChartAll = {
  height: "300px",
  overflowY: "hidden",
  marginTop: "50px",
}
const cssColumnChart = {
  display: "inline-block",
}

const Page2 = props => {
  // console.log(props.count_all_senate,'count_all_senate')
  // const [data, setData] = useState(data250)
  const [count_all_senate, setCount_all_senate] = useState(
    props.count_all_senate
  )
  const [search_id, setSearch_id] = useState("")
  const [types, setTypes] = useState(props.types)
  const [is_yAxis, setYAxis] = useState(props.is_yAxis)
  const [width, setWidth] = useState(props.width)
  const [is_senate, setIs_senate] = useState(true)
  const [is_starter_bars, setStarter] = useState(true)
  const [is_showAll, setShowAll] = useState(true)
  const [is_showGroup, setShowGroup] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(props.choices)
  const [is_On, setIsOn] = useState(false)
  const [height_svg, setHeightSvg] = useState(count_all_senate.length * 30)
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
    let data_of_motion = [...count_all_senate]
    data_of_motion.sort(sort_by_data)
    setCount_all_senate(data_of_motion)
    setCurrentFilter(currentFilter)
  }

  const showAll = () => {
    setShowAll(true)
    setShowGroup(false)
    setIs_all(true)
    setIsOn(true)
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
            data={count_all_senate}
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
        {
          /* <div>
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
          <ToggleSwitch
              is_On = {is_On}
              handleToggle = {() => setIsOn(!is_On)}
          />
          <div className="group_chart" css={is_On ? cssGroupChartAll : cssGroupChart}>
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
                is_all={is_all}
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
                is_all={is_all}
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
                is_all={is_all}
              />
            </div>
          </div>
        </div> */
        }
      )}
    </div>
  )
}

export default ({ data }) => {
  const senate = useStaticQuery(
    graphql`
      query {
        allSenateVoteYaml {
          nodes {
            id
            votelog {
              key
              value
            }
          }
        }

        allSenateVotelogYaml {
          nodes {
            id
            vote_date
          }
        }
        allPeopleYaml {
          nodes {
            id
            senator_method
          }
        }
      }
    `
  )

  const people_votes = senate.allSenateVoteYaml.nodes
  const votelogs = senate.allSenateVotelogYaml.nodes
  const people_method = senate.allPeopleYaml.nodes

  const voter_in_votelog = []
  people_votes.forEach(p => {
    p.votelog.forEach(l => {
      const method = people_method.filter(m => m.id == p.id)
      method.forEach(pm => {
        voter_in_votelog.push({
          ...l,
          senator_id: p.id,
          senator_method: pm.senator_method,
        })
      })
    })
  })
  _.remove(voter_in_votelog, function(n) {
    return n.value === "-"
  })

  const default_value = [
    { "1": 0 },
    { "2": 0 },
    { "3": 0 },
    { "4": 0 },
    { "5": 0 },
  ]

  function merge_default(default_value, group_by_value) {
    const merge = [...default_value, ...group_by_value]
    const result = {}

    merge.forEach(basket => {
      for (let [key, value] of Object.entries(basket)) {
        if (result[key]) {
          result[key] += value
        } else {
          result[key] = value
        }
      }
    })
    return result
  }

  const arr_votelog = votelogs.map(v => {
    const voter = voter_in_votelog.filter(p => p.key == v.id)
    return { ...v, voter }
  })

  const count_all_senate = []
  arr_votelog.forEach(s => {
    let group_by_value = _(s.voter)
      .groupBy("value")
      .map(function(votes, value) {
        const zip = _.zipObject([value], [votes.length])
        return { ...zip }
      })
      .value()

    group_by_value = merge_default(default_value, group_by_value)
    group_by_value = { ...group_by_value, id: s.id }
    count_all_senate.push({ ...s, group_by_value })
  })
  console.log(count_all_senate)

  const count_groupBy = []
  arr_votelog.forEach(s => {
    const by_position = s.voter.filter(m => m.senator_method == "โดยตำแหน่ง")
    const group_by_position = _(by_position)
      .groupBy("value")
      .map(function(votes, value) {
        return { value: value, count: votes.length }
      })
      .value()

    const by_government = s.voter.filter(
      m => m.senator_method == "เลือกโดย คสช."
    )
    const group_by_government = _(by_government)
      .groupBy("value")
      .map(function(votes, value) {
        return { value: value, count: votes.length }
      })
      .value()

    const by_youeSelf = s.voter.filter(m => m.senator_method == "เลือกกันเอง")
    const group_by_youeSelf = _(by_youeSelf)
      .groupBy("value")
      .map(function(votes, value) {
        return { value: value, count: votes.length }
      })
      .value()

    const group_of_voters = {
      group_by_position,
      group_by_government,
      group_by_youeSelf,
    }
    count_groupBy.push({ ...s, group_of_voters })
  })
  // console.log(count_groupBy)

  const types = ["id", "1", "2", "3", "4", "5"]
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
      count_all_senate={count_all_senate}
      types={types}
      width={width}
      is_yAxis={is_yAxis}
      choices={choices}
      colors={colors}
    />
  )
}
