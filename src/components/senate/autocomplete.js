import React, { useState, useEffect } from "react"
import Autosuggest from "react-autosuggest"
import AutosuggestHighlightMatch from "autosuggest-highlight/match"
import AutosuggestHighlightParse from "autosuggest-highlight/parse"
import VoteLogLegend from "../voteLogLegend"
import styled from "@emotion/styled"
import DropDown from "../dropdown"
import download from "../../images/icons/download/download.png"
import search from "../../images/icons/search/search-grey.png"
import { media } from "../../styles"
import _ from "lodash"
import PeopleAvatar from "../peopleAvatar"

const cssContainer = ({ isShowAll }) => ({
  display: "flex",
  padding: "26px 22px",
  [media(767)]: {
    padding: isShowAll ? "42px 43px 12px 57px" : "42px 0 12px 0",
  },
})
const cssWrapper = ({ isShowAll }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [media(767)]: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: isShowAll ? "0" : "3%",
  },
})
const Style = styled.div`
  .react-autosuggest__suggestions-container {
    max-height: 200px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .react-autosuggest__container {
    position: relative;
  }
  .react-autosuggest__input {
    width: 325px;
    height: 30px;
    padding: ${props =>
      props.value === "ทั้งหมด" || props.value === "" || !props.searchFullname
        ? "10px 26px 10px"
        : "10px 26px 10px 62px"};
    font-weight: 300;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #aaa;
    margin-bottom: 1.8rem;
  }
  .react-autosuggest__input--focused {
    outline: none;
  }
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .react-autosuggest__suggestions-container {
    display: none;
  }
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    width: 325px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 26px;
  }
  .react-autosuggest__suggestion--highlighted {
    background-color: #f7f7c7;
  }
  .highlight {
    color: black;
    font-weight: bold;
  }
`
const cssClearIcon = {
  position: "absolute",
  top: "0",
  right: "0",
  width: "18px",
  height: "18px",
  cursor: "pointer",
  opacity: "0.3",
  background: "transparent",
  border: "none",
  "&:hover": {
    opacity: "1",
  },
  "&:before, &:after": {
    position: "absolute",
    top: "6px",
    right: "12px",
    content: '""',
    height: "18px",
    width: "2px",
    backgroundColor: "#333",
  },
  "&:before": {
    transform: "rotate(45deg)",
  },
  "&:after": {
    transform: "rotate(-45deg)",
  },
}
const cssSearchIcon = {
  position: "absolute",
  top: "9px",
  left: "0",
  width: "15px",
}
const cssAvg = {
  display: "none",
  [media(767)]: {
    display: "unset",
    flex: "none",
  },
}
const cssTypeDetails = {
  display: "none",
  [media(767)]: {
    display: "unset",
  },
}
const cssDropdown = {
  display: "unset",
  [media(767)]: {
    display: "none",
  },
}
const cssGroup = {
  fontWeight: "bold",
  fontSize: "1.8rem",
}
const cssMobile = {
  display: "unset",
  [media(767)]: {
    display: "none",
  },
}

const AutoComplete = ({
  senatorTypeId,
  setSenatorTypeId,
  setSenatorId,
  isShowAll,
  countByGroup,
  barchartGroupWidth,
  allSenateVotelogYaml,
  allSenateVoteYaml,
  allPeopleYaml,
}) => {
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [senator, setSenator] = useState([])
  const [valueSelected, setValueSelected] = useState({})
  const [avgVotelog, setAvgVotelog] = useState({})
  const [select_by_government, setSelectByGovernment] = useState({
    approve: 0,
    disprove: 0,
    abstained: 0,
    absent: 0,
    missing: 0,
  })
  const [select_by_position, setSelectByPosition] = useState({
    approve: 0,
    disprove: 0,
    abstained: 0,
    absent: 0,
    missing: 0,
  })
  const [select_by_career, setSelectByCareer] = useState({
    approve: 0,
    disprove: 0,
    abstained: 0,
    absent: 0,
    missing: 0,
  })
  const [totalVotelogType] = useState({
    approve: 0,
    disprove: 0,
    abstained: 0,
    absent: 0,
    missing: 0,
  })
  const [senatorType, setSenatorType] = useState({
    approve: 0,
    disprove: 0,
    abstained: 0,
    absent: 0,
    missing: 0,
  })
  const [fullname] = useState([])
  const [searchFullname, setSearchFullname] = useState(false)
  const choices = {
    senatorType: {
      default: "โดยตำแหน่ง",
      others: ["คสช. สรรหา", "ตามกลุ่มอาชีพ"],
    },
  }
  const [currentFilter, setCurrentFilter] = useState(choices)

  useEffect(() => {
    setCurrentFilter({ senatorType: "โดยตำแหน่ง" })
  }, [])

  useEffect(() => {
    const found = allSenateVoteYaml.nodes.find(element => element.id === 0)
    if (found === undefined) {
      allSenateVoteYaml.nodes.unshift({
        id: "0",
        lastname: "",
        name: "",
        title: "ทั้งหมด",
        votelog: [],
      })
    }
    allSenateVoteYaml.nodes.forEach(item => {
      if (item.id === "0") {
        fullname.push(item.title)
        item.fullname = item.title
      } else {
        fullname.push(item.title + " " + item.name + " " + item.lastname)
        item.fullname = item.title + " " + item.name + " " + item.lastname
      }
    })
    setSenator(allSenateVoteYaml.nodes)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setValue(senator[0] ? senator[0].title : "")
  }, [senator])

  useEffect(() => {
    setAvgVotelog(calPercentLegend())
  }, [valueSelected, isShowAll]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    countVoteLogGroup()
    calLegend()
    setAvgVotelog(calPercentLegend())
  }, [countByGroup]) // eslint-disable-line react-hooks/exhaustive-deps

  const escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  const getSuggestions = (value, senator) => {
    const escapedValue = escapeRegexCharacters(value.trim())
    const regex = new RegExp(escapedValue, "gi")
    return senator.filter(
      person => person.id === "0" || regex.test(getSuggestionValue(person))
    )
  }

  const getSuggestionValue = suggestion => {
    if (suggestion.id === "0") {
      return `${suggestion.title}`
    }
    return `${suggestion.title} ${suggestion.name} ${suggestion.lastname}`
  }

  const renderSuggestion = (suggestion, { query }) => {
    let suggestionText = `${suggestion.title} ${suggestion.name} ${suggestion.lastname}`
    if (suggestion.id === "0") {
      suggestionText = `${suggestion.title}`
    }
    const matches = AutosuggestHighlightMatch(suggestionText, query)
    const parts = AutosuggestHighlightParse(suggestionText, matches)
    return (
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          )
        })}
      </span>
    )
  }

  const onChange = (event, { newValue }) => {
    setValue(newValue)
    if (fullname.includes(newValue)) {
      const match = _.find(senator, ["fullname", newValue])
      setValueSelected(match)
      setSenatorId(match.id)
      setSearchFullname(true)
    } else {
      setValueSelected({})
      setSenatorId("0")
      setSearchFullname(false)
    }
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    if (value === "ทั้งหมด") {
      setValue("")
      setValueSelected({})
      setSenatorId("0")
      setSuggestions(getSuggestions("", senator))
    } else {
      setSuggestions(getSuggestions(value, senator))
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const shouldRenderSuggestions = value => {
    if (value === "") {
      return true
    } else {
      return value.trim().length > 1
    }
  }

  const clearInput = () => {
    setValue("")
    setValueSelected({})
    setSenatorId("0")
    setSearchFullname(false)
  }

  const renderInputComponent = inputProps => (
    <div>
      <button
        type="button"
        aria-label="เคลียร์"
        css={cssClearIcon}
        onClick={clearInput}
      />
      <img css={cssSearchIcon} src={search} alt="ค้นหา" />
      {_.isEmpty(valueSelected) ||
        (value !== "ทั้งหมด" && <PeopleAvatar {...valueSelected} />)}
      <input {...inputProps} />
    </div>
  )

  const calPercentLegend = () => {
    const all_motion = allSenateVotelogYaml.nodes.length
    if (isShowAll) {
      if (_.isEmpty(valueSelected) || valueSelected.id === "0") {
        return totalVotelogType
      } else {
        const voteGroup = _.groupBy(valueSelected.votelog, "value")
        const vote = {
          approve: _.get(voteGroup, "1.length", 0),
          disprove: _.get(voteGroup, "2.length", 0),
          abstained: _.get(voteGroup, "3.length", 0),
          absent: _.get(voteGroup, "4.length", 0),
          missing: _.get(voteGroup, "5.length", 0),
        }
        for (const item in vote) {
          vote[item] = ((vote[item] / all_motion) * 100).toFixed(2)
          if (vote[item] === 0) {
            vote[item] = 0
          }
        }
        return vote
      }
    }
  }

  const getAllPeopleVotes = () => {
    const people_votes = allSenateVoteYaml.nodes
    const people_method = allPeopleYaml.nodes
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
    return voter_in_votelog
  }

  const countTotalVoteLog = () => {
    totalVotelogType.approve =
      select_by_government.approve +
      select_by_position.approve +
      select_by_career.approve
    totalVotelogType.disprove =
      select_by_government.disprove +
      select_by_position.disprove +
      select_by_career.disprove
    totalVotelogType.abstained =
      select_by_government.abstained +
      select_by_position.abstained +
      select_by_career.abstained
    totalVotelogType.absent =
      select_by_government.absent +
      select_by_position.absent +
      select_by_career.absent
    totalVotelogType.missing =
      select_by_government.missing +
      select_by_position.missing +
      select_by_career.missing
  }

  const countVoteLogGroup = () => {
    if (countByGroup[0] !== undefined) {
      countByGroup[0].count_by_government.forEach(item => {
        select_by_government.approve += item[1]
        select_by_government.disprove += item[2]
        select_by_government.abstained += item[3]
        select_by_government.absent += item[4]
        select_by_government.missing += item[5]
      })
      countByGroup[0].count_by_position.forEach(item => {
        select_by_position.approve += item[1]
        select_by_position.disprove += item[2]
        select_by_position.abstained += item[3]
        select_by_position.absent += item[4]
        select_by_position.missing += item[5]
      })
      countByGroup[0].count_by_yourSelf.forEach(item => {
        select_by_career.approve += item[1]
        select_by_career.disprove += item[2]
        select_by_career.abstained += item[3]
        select_by_career.absent += item[4]
        select_by_career.missing += item[5]
      })
    }
    countTotalVoteLog()
  }

  const calLegend = () => {
    const numberType = _.groupBy(getAllPeopleVotes(), "senator_method")
    const sumVoteGovernment = numberType["เลือกโดย คสช."].length
    const sumVotePosition = numberType["โดยตำแหน่ง"].length
    const sumVoteCareer = numberType["เลือกกันเอง"].length
    const sumTotal =
      totalVotelogType.approve +
      totalVotelogType.disprove +
      totalVotelogType.abstained +
      totalVotelogType.absent +
      totalVotelogType.missing

    for (const item in select_by_government) {
      select_by_government[item] = (
        (select_by_government[item] / sumVoteGovernment) *
        100
      ).toFixed(2)
      if (select_by_government[item] === 0) {
        select_by_government[item] = 0
      }
    }
    setSelectByGovernment(select_by_government)

    for (const item in select_by_position) {
      select_by_position[item] = (
        (select_by_position[item] / sumVotePosition) *
        100
      ).toFixed(2)
      if (select_by_position[item] === 0) {
        select_by_position[item] = 0
      }
    }
    setSelectByPosition(select_by_position)
    setSenatorType(select_by_position)

    for (const item in select_by_career) {
      select_by_career[item] = (
        (select_by_career[item] / sumVoteCareer) *
        100
      ).toFixed(2)
      if (select_by_career[item] === 0) {
        select_by_career[item] = 0
      }
    }
    setSelectByCareer(select_by_career)

    for (const item in totalVotelogType) {
      totalVotelogType[item] = (
        (totalVotelogType[item] / sumTotal) *
        100
      ).toFixed(2)
      if (totalVotelogType[item] === 0) {
        totalVotelogType[item] = 0
      }
    }
  }

  const handleFilter = e => {
    let _currentFilter = { ...currentFilter }
    let filter = e.target.innerText
    _currentFilter = { senatorType: filter }
    if (filter === "โดยตำแหน่ง") {
      setSenatorTypeId(1)
      setSenatorType(select_by_position)
    } else if (filter === "คสช. สรรหา") {
      setSenatorTypeId(2)
      setSenatorType(select_by_government)
    } else if (filter === "ตามกลุ่มอาชีพ") {
      setSenatorTypeId(3)
      setSenatorType(select_by_career)
    }

    setCurrentFilter(_currentFilter)
  }

  const colors = ["#76C8B8", "#F0324B", "#2D3480", "#7B90D1", "#E3E3E3"]

  return (
    <div css={cssContainer({ isShowAll })}>
      {isShowAll ? (
        <div css={cssWrapper({ isShowAll })}>
          <Style value={value} searchFullname={searchFullname}>
            <Autosuggest
              className="cssSearchboxDropdown"
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              shouldRenderSuggestions={shouldRenderSuggestions}
              renderSuggestion={renderSuggestion}
              inputProps={{ value, onChange }}
              renderInputComponent={renderInputComponent}
            >
              <img src={download} alt="ดาวน์โหลด" />
            </Autosuggest>
          </Style>
          <span css={cssAvg} style={{ margin: "0 1.5rem" }}>
            โดยเฉลี่ย
          </span>
          <VoteLogLegend {...avgVotelog} />
        </div>
      ) : (
        <div css={cssWrapper({ isShowAll })}>
          <div
            css={cssTypeDetails}
            style={{ width: barchartGroupWidth[0] + 230 }}
          >
            <span css={cssGroup}>โดยตำแหน่ง</span>
            <VoteLogLegend type="group" {...select_by_position} />
          </div>
          <div
            css={cssTypeDetails}
            style={{ width: barchartGroupWidth[1] + 105 }}
          >
            <span css={cssGroup}>คสช. สรรหา</span>
            <VoteLogLegend type="group" {...select_by_government} />
          </div>
          <div css={cssTypeDetails} style={{ width: barchartGroupWidth[2] }}>
            <span css={cssGroup}>ตามกลุ่มอาชีพ</span>
            <VoteLogLegend type="group" {...select_by_career} />
          </div>
          <div css={cssDropdown}>
            <DropDown
              filter={"senatorType"}
              choices={choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={true}
              is_mobile={true}
              colors={colors}
            />
          </div>
          <div css={cssMobile}>
            <VoteLogLegend {...senatorType} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AutoComplete
