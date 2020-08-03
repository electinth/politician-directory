import React, { useState } from "react"
import _ from "lodash"
import moment from "moment"
import { graphql, useStaticQuery } from "gatsby"
import DropDown from "../components/page2/dropdown"
import BarChart from "../components/page2/barChart"
import ToggleSwitch from "../components/page2/toggleSwitch"

const cssGroupChart = {
  height: "300px",
  overflowY: "scroll",
  marginTop: "50px",
}
const cssGroupChartAll = {
  height: "300px",
  overflowY: "hidden",
}
const cssColumnChart = {
  display: "inline-block",
}

const Page2 = props => {
  const [count_all_senate, setCount_all_senate] = useState(
    props.count_all_senate
  )
  const [count_by_government, setCount_by_government] = useState(
    props.count_by_government
  )
  const [count_by_position, setCount_by_position] = useState(
    props.count_by_position
  )
  const [count_by_yourSelf, setCount_by_yourSelf] = useState(
    props.count_by_yourSelf
  )
  const [search_id, setSearch_id] = useState("")
  const [types, setTypes] = useState(props.types)
  const [is_senate, setIs_senate] = useState(true)
  const [is_starter_bars, setStarter] = useState(true)
  const [is_showAll, setShowAll] = useState(true)
  const [currentFilter, setCurrentFilter] = useState(props.choices)
  const [is_On, setIsOn] = useState(false)
  const [height_svg, setHeightSvg] = useState(count_all_senate.length * 30)
  const [is_all, setIs_all] = useState(true)
  const [is_selected_position, setIs_position] = useState(false)
  const [is_selected_government, setIs_government] = useState(false)
  const [is_selected_yourSelf, setIs_yourSelf] = useState(false)

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
      } else {
        return new Date(b.vote_date) - new Date(a.vote_date)
      }
    }
    let currentFilter = { ...currentFilter }
    formatTypes(filter)

    //set group-by
    let data_of_motion = []

    if (is_selected_position) {
      data_of_motion = [...count_by_position]
    } else if (is_selected_government) {
      data_of_motion = [...count_by_government]
    } else if (is_selected_yourSelf) {
      data_of_motion = [...count_by_yourSelf]
    } else if (is_showAll) {
      data_of_motion = [...count_all_senate]
      setCount_all_senate(data_of_motion)
    }
    data_of_motion.sort(sort_by_data)

    const set_government = data_of_motion.map(function(value) {
      return count_by_government[value.id - 1]
    })
    const set_position = data_of_motion.map(function(value) {
      return count_by_position[value.id - 1]
    })
    const set_yourSelf = data_of_motion.map(function(value) {
      return count_by_yourSelf[value.id - 1]
    })

    if (is_selected_position) {
      setCount_by_government(set_government)
      setCount_by_yourSelf(set_yourSelf)
      setCount_by_position(data_of_motion)
    } else if (is_selected_government) {
      setCount_by_government(data_of_motion)
      setCount_by_position(set_position)
      setCount_by_yourSelf(set_yourSelf)
    } else if (is_selected_yourSelf) {
      setCount_by_yourSelf(data_of_motion)
      setCount_by_government(set_government)
      setCount_by_position(set_position)
    }
    setCurrentFilter(currentFilter)
  }

  const selected_dropdown = selected => {
    if (selected === "count_by_position") {
      setIs_position(true)
      setIs_government(false)
      setIs_yourSelf(false)
    } else if (selected === "count_by_government") {
      setIs_government(true)
      setIs_position(false)
      setIs_yourSelf(false)
    } else if (selected === "count_by_yourSelf") {
      setIs_yourSelf(true)
      setIs_government(false)
      setIs_position(false)
    }
  }

  const showAll = () => {
    setShowAll(true)
    setIs_all(true)
    setIsOn(false)
  }
  const ShowGroup = () => {
    setShowAll(false)
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
            w={props.width}
            is_yAxis={props.is_yAxis}
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
          <div
            css={{ ...cssColumnChart, width: props.groupWidth[0] }}
            onClick={() => selected_dropdown("count_by_position")}
          >
            <DropDown
              choices={props.choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={props.colors}
            />
          </div>
          <div
            css={{ ...cssColumnChart, width: props.groupWidth[1] }}
            onClick={() => selected_dropdown("count_by_government")}
          >
            <DropDown
              choices={props.choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={props.colors}
            />
          </div>
          <div
            css={{ ...cssColumnChart, width: props.groupWidth[2] }}
            onClick={() => selected_dropdown("count_by_yourSelf")}
          >
            <DropDown
              choices={props.choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={props.colors}
            />
          </div>
          <ToggleSwitch is_On={is_On} handleToggle={() => setIsOn(!is_On)} />
          <div
            className="group_chart"
            css={is_On ? cssGroupChartAll : cssGroupChart}
          >
            <div css={{ ...cssColumnChart, width: props.groupWidth[0] }}>
              <BarChart
                data={count_by_position}
                types={types}
                w={props.groupWidth[0]}
                is_yAxis={props.is_yAxis}
                color_bars={props.colors}
                is_starter_bars={is_starter_bars}
                height_svg={height_svg}
                is_On={is_On}
                is_all={is_all}
              />
            </div>
            <div css={{ ...cssColumnChart, width: props.groupWidth[1] }}>
              <BarChart
                data={count_by_government}
                types={types}
                w={props.groupWidth[1]}
                color_bars={props.colors}
                height_svg={height_svg}
                is_On={is_On}
                is_all={is_all}
              />
            </div>
            <div css={{ ...cssColumnChart, width: props.groupWidth[2] }}>
              <BarChart
                data={count_by_yourSelf}
                types={types}
                w={props.groupWidth[2]}
                color_bars={props.colors}
                height_svg={height_svg}
                is_On={is_On}
                is_all={is_all}
              />
            </div>
          </div>
        </div>
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
  arr_votelog.forEach((s, i) => {
    let group_by_value = _(s.voter)
      .groupBy("value")
      .map(function(votes, value) {
        const zip = _.zipObject([value], [votes.length])
        return { ...zip }
      })
      .value()

    const set_format_date = moment(s.vote_date)
      .add(10, "days")
      .calendar()
    let count_date = 1
    if (i < arr_votelog.length - 1) {
      if (arr_votelog[i].vote_date === arr_votelog[i + 1].vote_date) {
        count_date++
      } else {
        count_date = 1
      }
    }

    group_by_value = merge_default(default_value, group_by_value)
    group_by_value = {
      ...group_by_value,
      id: s.id,
      vote_date: set_format_date + ` - ${count_date}`,
    }
    count_all_senate.push(group_by_value)
  })

  const count_by_position = []
  const count_by_government = []
  const count_by_yourSelf = []
  const count_by_group = []

  arr_votelog.forEach(s => {
    const by_position = s.voter.filter(m => m.senator_method == "โดยตำแหน่ง")
    let group_by_position = _(by_position)
      .groupBy("value")
      .map(function(votes, value) {
        return _.zipObject([value], [votes.length])
      })
      .value()

    const by_government = s.voter.filter(
      m => m.senator_method == "เลือกโดย คสช."
    )
    let group_by_government = _(by_government)
      .groupBy("value")
      .map(function(votes, value) {
        return _.zipObject([value], [votes.length])
      })
      .value()

    const by_youeSelf = s.voter.filter(m => m.senator_method == "เลือกกันเอง")
    let group_by_youeSelf = _(by_youeSelf)
      .groupBy("value")
      .map(function(votes, value) {
        return _.zipObject([value], [votes.length])
      })
      .value()
    group_by_government = merge_default(default_value, group_by_government)
    group_by_position = merge_default(default_value, group_by_position)
    group_by_youeSelf = merge_default(default_value, group_by_youeSelf)

    group_by_government = {
      ...group_by_government,
      id: s.id,
      vote_date: s.vote_date,
    }
    group_by_position = {
      ...group_by_position,
      id: s.id,
      vote_date: s.vote_date,
    }
    group_by_youeSelf = {
      ...group_by_youeSelf,
      id: s.id,
      vote_date: s.vote_date,
    }

    count_by_government.push(group_by_government)
    count_by_position.push(group_by_position)
    count_by_yourSelf.push(group_by_youeSelf)
  })

  count_by_group.push({
    count_by_government: count_by_government,
    position: count_by_position,
    your_self: count_by_yourSelf,
  })

  const types = ["id", "1", "2", "3", "4", "5"]
  const is_yAxis = true

  const width = window.innerWidth

  function count_people(count_type) {
    const peoples = _.dropRight(Object.values(count_type[0]), 2).reduce(
      function(a, b) {
        return parseInt(a) + parseInt(b)
      },
      0
    )
    return peoples
  }
  const all_peoples = count_people(count_all_senate)
  const groupWidth = [
    (32 / all_peoples) * width,
    (88 / all_peoples) * width,
    (130 / all_peoples) * width,
  ]

  const choices = {
    sort_by: {
      default: "เวลาล่าสุด",
      others: ["เห็นด้วย", "ไม่เห็นด้วย", "งดออกเสียง", "ไม่ลงมติ", "ขาด"],
    },
  }

  const colors = ["#76C8B8", "#F0324B", "#2D3480", "#7B90D1", "#E3E3E3"]

  return (
    <Page2
      types={types}
      width={width}
      is_yAxis={is_yAxis}
      choices={choices}
      colors={colors}
      count_all_senate={count_all_senate}
      count_by_government={count_by_government}
      count_by_position={count_by_position}
      count_by_yourSelf={count_by_yourSelf}
      groupWidth={groupWidth}
    />
  )
}