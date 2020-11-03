import React, { useState, useEffect } from "react"
import _ from "lodash"
import moment from "moment"
import { graphql, useStaticQuery } from "gatsby"
import BarChart from "./barChart"

const cssSenateVotelogBarchart = {
  margin: "0 2%",
}

const BarCharts = props => {
  const sort_by_data = (a, b) => {
    return (
      new Date(b.vote_date.substring(0, 10)) -
      new Date(a.vote_date.substring(0, 10))
    )
  }
  let sort_data = props.count_all_senate.sort(sort_by_data)

  const [count_all_senate, setCount_all_senate] = useState(sort_data)
  const [count_by_government, setCount_by_government] = useState(
    props.count_by_government
  )
  const [count_by_position, setCount_by_position] = useState(
    props.count_by_position
  )
  const [count_by_yourSelf, setCount_by_yourSelf] = useState(
    props.count_by_yourSelf
  )
  const types = props.types
  const size_per_bar = 30
  const height_svg = count_all_senate.length * size_per_bar
  const [filter_senatorId, setFilter_senatorId] = useState()
  const senatorTypeId = props.senatorTypeId
  const is_mobile = props.width > 768 ? false : true
  props.setIs_mobile_width(is_mobile)

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
    } else if (type === "เวลาล่าสุด" || type === "") {
      return "เวลาล่าสุด"
    }
  }

  useEffect(() => {
    setFilter_senatorId(
      props.filter_senatorId ? props.filter_senatorId.votes : ""
    )
  }, [props.filter_senatorId])

  let data_of_motion = []

  useEffect(() => {
    handleFilter(props.handleFilter)
  }, [props.handleFilter])

  const handleFilter = filter => {
    const sort_by_data = (a, b) => {
      if (filter !== "เวลาล่าสุด") {
        return b[formatTypes(filter)] - a[formatTypes(filter)]
      } else {
        return (
          new Date(b.vote_date.substring(0, 10)) -
          new Date(a.vote_date.substring(0, 10))
        )
      }
    }
    //set group-by

    if (props.is_selected_position) {
      data_of_motion = [...count_by_position]
    } else if (props.is_selected_government) {
      data_of_motion = [...count_by_government]
    } else if (props.is_selected_yourSelf) {
      data_of_motion = [...count_by_yourSelf]
    } else if (props.isShowAll) {
      data_of_motion = [...count_all_senate]
      setCount_all_senate(data_of_motion)
    }

    data_of_motion.sort(sort_by_data)

    if (filter_senatorId) {
      const set_ids = data_of_motion.map(function(value) {
        const index = filter_senatorId.findIndex(g => g.key === value.id)
        return filter_senatorId[index]
      })
      setFilter_senatorId(set_ids)
    }

    const set_government = data_of_motion.map(function(value) {
      const index = count_by_government.findIndex(g => g.id === value.id)
      return count_by_government[index]
    })
    const set_position = data_of_motion.map(function(value) {
      const index = count_by_position.findIndex(g => g.id === value.id)
      return count_by_position[index]
    })
    const set_yourSelf = data_of_motion.map(function(value) {
      const index = count_by_yourSelf.findIndex(g => g.id === value.id)
      return count_by_yourSelf[index]
    })
    if (props.is_selected_position) {
      setCount_by_government(set_government)
      setCount_by_yourSelf(set_yourSelf)
      setCount_by_position(data_of_motion)
    } else if (props.is_selected_government) {
      setCount_by_government(data_of_motion)
      setCount_by_position(set_position)
      setCount_by_yourSelf(set_yourSelf)
    } else if (props.is_selected_yourSelf) {
      setCount_by_yourSelf(data_of_motion)
      setCount_by_government(set_government)
      setCount_by_position(set_position)
    }
  }
  // ---------
  if (props.width) {
    return (
      <div className="senateVotelogBarcharts">
        {props.isShowAll ? (
          <BarChart
            data={count_all_senate}
            types={types}
            width_of_barChart={props.width}
            is_yAxis={props.is_yAxis}
            color_bars={props.colors}
            height_svg={height_svg}
            is_On={props.is_On}
            isShowAll={props.isShowAll}
            setVoteId={props.setVoteId}
            setPopupState={props.setPopupState}
            filter_senatorId={filter_senatorId}
            setCountByGroup={props.setCountByGroup}
          />
        ) : (
          <div className="is_group">
            <div
              style={{
                display: is_mobile ? "block" : "inline-block",
                width: is_mobile
                  ? document.body.clientWidth - 30
                  : props.groupWidth[0] + 250,
              }}
            >
              {((senatorTypeId === 1 && is_mobile) || !is_mobile) && (
                <BarChart
                  data={count_by_position}
                  types={types}
                  width_of_barChart={props.groupWidth[0]}
                  is_yAxis={props.is_yAxis}
                  color_bars={props.colors}
                  height_svg={height_svg}
                  is_On={props.is_On}
                  isShowAll={props.isShowAll}
                  setVoteId={props.setVoteId}
                  setPopupState={props.setPopupState}
                  is_mobile={is_mobile}
                  senatorTypeId={senatorTypeId}
                />
              )}
            </div>
            <div
              style={{
                display: is_mobile ? "block" : "inline-block",
                width: is_mobile
                  ? document.body.clientWidth - 30
                  : props.groupWidth[1] + 105,
              }}
            >
              {((senatorTypeId === 2 && is_mobile) || !is_mobile) && (
                <BarChart
                  data={count_by_yourSelf}
                  types={types}
                  width_of_barChart={props.groupWidth[1]}
                  color_bars={props.colors}
                  height_svg={height_svg}
                  is_On={props.is_On}
                  isShowAll={props.isShowAll}
                  setVoteId={props.setVoteId}
                  setPopupState={props.setPopupState}
                  is_mobile={is_mobile}
                  senatorTypeId={senatorTypeId}
                  is_yAxis={is_mobile ? props.is_yAxis : ""}
                />
              )}
            </div>
            <div
              style={{
                display: is_mobile ? "block" : "inline-block",
                width: is_mobile
                  ? document.body.clientWidth - 30
                  : props.groupWidth[2],
              }}
            >
              {((senatorTypeId === 3 && is_mobile) || !is_mobile) && (
                <BarChart
                  data={count_by_government}
                  types={types}
                  width_of_barChart={props.groupWidth[2]}
                  color_bars={props.colors}
                  height_svg={height_svg}
                  is_On={props.is_On}
                  isShowAll={props.isShowAll}
                  setVoteId={props.setVoteId}
                  setPopupState={props.setPopupState}
                  is_mobile={is_mobile}
                  senatorTypeId={senatorTypeId}
                  is_yAxis={is_mobile ? props.is_yAxis : ""}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return <div>loading barchart</div>
  }
}

export default ({
  setVoteId,
  setPopupState,
  senatorTypeId,
  senatorId,
  isShowAll,
  setCountByGroup,
  senatorType,
  setBarchartGroupWidth = { setBarchartGroupWidth },
  handleFilter,
  setIs_mobile_width,
  is_selected_position,
  is_selected_government,
  is_selected_yourSelf,
  is_On,
}) => {
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
  const [firstTime, setFirstTime] = useState(false)

  const voter_in_votelog = []
  people_votes.forEach(p => {
    p.votelog.forEach(l => {
      const method = people_method.filter(m => m.id === p.id)
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

  const [filter_senatorId, setFilter_senatorId] = useState()
  useEffect(() => {
    const group_senatorId = _.chain(voter_in_votelog)
      .groupBy("senator_id")
      .map((value, key) => ({ id: key, votes: value }))
      .value()
    setFilter_senatorId(_.find(group_senatorId, ["id", senatorId]))
  }, senatorId)

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
    const voter = voter_in_votelog.filter(p => p.key === v.id)
    return { ...v, voter }
  })

  const count_all_senate = []
  let count_same_date = 0

  arr_votelog.forEach(function(s, index) {
    let group_by_value = _(s.voter)
      .groupBy("value")
      .map(function(votes, value) {
        const zip = _.zipObject([value], [votes.length])
        return { ...zip }
      })
      .value()

    const set_format_date = moment(s.vote_date).calendar()

    if (index != 0) {
      if (arr_votelog[index].vote_date === arr_votelog[index - 1].vote_date) {
        count_same_date++
      } else {
        count_same_date = 1
      }
    } else {
      count_same_date = 1
    }

    group_by_value = merge_default(default_value, group_by_value)
    group_by_value = {
      ...group_by_value,
      id: s.id,
      vote_date: set_format_date + ` - ${count_same_date}`,
    }
    count_all_senate.push(group_by_value)
  })

  const count_by_position = []
  const count_by_government = []
  const count_by_yourSelf = []
  const count_by_group = []

  arr_votelog.forEach(function(s, index) {
    const set_format_date = moment(s.vote_date).calendar()

    if (index > 0) {
      if (arr_votelog[index].vote_date === arr_votelog[index - 1].vote_date) {
        count_same_date++
      } else {
        count_same_date = 1
      }
    } else {
      count_same_date = 1
    }

    const by_position = s.voter.filter(m => m.senator_method === "โดยตำแหน่ง")
    let group_by_position = _(by_position)
      .groupBy("value")
      .map(function(votes, value) {
        return _.zipObject([value], [votes.length])
      })
      .value()

    const by_government = s.voter.filter(
      m => m.senator_method === "เลือกโดย คสช."
    )
    let group_by_government = _(by_government)
      .groupBy("value")
      .map(function(votes, value) {
        return _.zipObject([value], [votes.length])
      })
      .value()

    const by_yourSelf = s.voter.filter(m => m.senator_method === "เลือกกันเอง")
    let group_by_yourSelf = _(by_yourSelf)
      .groupBy("value")
      .map(function(votes, value) {
        return _.zipObject([value], [votes.length])
      })
      .value()

    group_by_government = merge_default(default_value, group_by_government)
    group_by_position = merge_default(default_value, group_by_position)
    group_by_yourSelf = merge_default(default_value, group_by_yourSelf)

    group_by_government = {
      ...group_by_government,
      id: s.id,
      vote_date: set_format_date + ` - ${count_same_date}`,
    }
    group_by_position = {
      ...group_by_position,
      id: s.id,
      vote_date: set_format_date + ` - ${count_same_date}`,
    }
    group_by_yourSelf = {
      ...group_by_yourSelf,
      id: s.id,
      vote_date: set_format_date + ` - ${count_same_date}`,
    }

    count_by_government.push(group_by_government)
    count_by_position.push(group_by_position)
    count_by_yourSelf.push(group_by_yourSelf)
  })

  count_by_group.push({
    count_by_government: count_by_government,
    count_by_position: count_by_position,
    count_by_yourSelf: count_by_yourSelf,
  })

  const types = ["id", "1", "2", "3", "4", "5"]
  const is_yAxis = true
  //width without scroll bar for window user
  let size_width = 0
  if (typeof document !== "undefined") {
    size_width = document.body.clientWidth
  }
  const width = size_width
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
  const people_in_position = count_people(count_by_position)
  const people_in_yourSelf = count_people(count_by_yourSelf)
  const people_in_government = count_people(count_by_government)
  const sum_allMargin = width < 768 ? 0 : 435
  const width_is_margin = width - sum_allMargin
  let groupWidth = []
  const rect_1 = width_is_margin * (1 / all_peoples) * people_in_position
  const rect_2 = width_is_margin * (1 / all_peoples) * people_in_yourSelf
  const rect_3 = width_is_margin * (1 / all_peoples) * people_in_government
  groupWidth = [rect_1, rect_2, rect_3]
  useEffect(() => {
    setCountByGroup(count_by_group)
  }, [firstTime])

  if (!firstTime) {
    setFirstTime(true)
    setBarchartGroupWidth(groupWidth)
  }

  const choices = {
    sort_by: {
      default: "เวลาล่าสุด",
      others: ["เห็นด้วย", "ไม่เห็นด้วย", "งดออกเสียง", "ไม่ลงมติ", "ขาด"],
    },
  }

  const colors = ["#76C8B8", "#F0324B", "#2D3480", "#7B90D1", "#E3E3E3"]
  return (
    <div className="wrapperBarchart" css={cssSenateVotelogBarchart}>
      <BarCharts
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
        setVoteId={setVoteId}
        setPopupState={setPopupState}
        filter_senatorId={filter_senatorId}
        senatorTypeId={senatorTypeId}
        senatorId={senatorId}
        isShowAll={isShowAll}
        setCountByGroup={setCountByGroup}
        senatorType={senatorType}
        handleFilter={handleFilter}
        setIs_mobile_width={setIs_mobile_width}
        is_selected_position={is_selected_position}
        is_selected_government={is_selected_government}
        is_selected_yourSelf={is_selected_yourSelf}
        is_On={is_On}
      />
    </div>
  )
}
