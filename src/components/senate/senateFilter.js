import React, { useState, useEffect } from "react"
import DropDown from "../dropdown"
import ToggleSwitch from "./toggleSwitch"

const cssFilterWrapper = {
  height: "50px",
  position: "relative",
}

const SenateFilter = ({
  setHandleFilter,
  isShowAll,
  barchartGroupWidth,
  is_mobile,
  setIs_position,
  setIs_government,
  setIs_yourSelf,
  is_On,
  setIsOn,
  senatorTypeId,
  is_selected_position,
  is_selected_government,
  is_selected_yourSelf,
  setFilter,
}) => {
  const [currentFilter, setCurrentFilter] = useState(false)
  const is_senate = true
  const colors = ["#76C8B8", "#F0324B", "#2D3480", "#7B90D1", "#E3E3E3"]
  const choices = {
    sort_by: {
      default: "เวลาล่าสุด",
      others: ["เห็นด้วย", "ไม่เห็นด้วย", "งดออกเสียง", "ไม่ลงมติ", "ขาด"],
    },
  }
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
    } else if (type === "เวลาล่าสุด") {
      return "เวลาล่าสุด"
    }
  }

  useEffect(() => {
    if (isShowAll) {
      setIs_government(false)
      setIs_position(false)
      setIs_yourSelf(false)
    }
    setCurrentFilter(false)
  }, [isShowAll])

  const [set_formatter, SetFormatter] = useState()
  useEffect(() => {
    setCurrentFilter(set_formatter)
  }, [setFilter])

  const handleFilter = e => {
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
  }
  const handleFilter_1 = e => {
    setIs_position(true)
    setIs_government(false)
    setIs_yourSelf(false)
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
    console.log(filter)
  }
  const handleFilter_2 = e => {
    setIs_government(false)
    setIs_position(false)
    setIs_yourSelf(true)
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
  }
  const handleFilter_3 = e => {
    setIs_yourSelf(false)
    setIs_government(true)
    setIs_position(false)
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
  }

  return (
    <div css={cssFilterWrapper}>
      {isShowAll ? (
        <div
          style={{
            display: "flex",
            width: `${document.body.clientWidth}px`,
            padding: "0 3%",
          }}
        >
          <div className="dropDown" style={{ display: "flex", flex: "1" }}>
            <DropDown
              choices={choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={colors}
              isShowAll={isShowAll}
            />
          </div>
          <div
            className="switch"
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "flex-end",
              transform: "translateX(-50px)",
            }}
          >
            <ToggleSwitch is_On={is_On} handleToggle={() => setIsOn(!is_On)} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: `${document.body.clientWidth - 100}px`,
            margin: "0 3%",
          }}
        >
          {((senatorTypeId === 1 && is_mobile) || !is_mobile) && (
            <div
              style={{
                width: is_mobile
                  ? document.body.clientWidth - 100
                  : barchartGroupWidth[0] + 235,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <DropDown
                  choices={choices}
                  currentFilter={is_selected_position ? currentFilter : false}
                  handleFilter={handleFilter_1}
                  is_senate={is_senate}
                  colors={colors}
                  is_selected_position={is_selected_position}
                />
              </div>
            </div>
          )}
          {((senatorTypeId === 2 && is_mobile) || !is_mobile) && (
            <div
              style={{
                width: is_mobile
                  ? document.body.clientWidth - 100
                  : barchartGroupWidth[1] + 105,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <DropDown
                  choices={choices}
                  currentFilter={is_selected_yourSelf ? currentFilter : false}
                  handleFilter={handleFilter_2}
                  is_senate={is_senate}
                  colors={colors}
                  is_selected_yourSelf={is_selected_yourSelf}
                />
              </div>
            </div>
          )}
          {((senatorTypeId === 3 && is_mobile) || !is_mobile) && (
            <div
              style={{
                display: "flex",
                width: is_mobile
                  ? document.body.clientWidth - 100
                  : barchartGroupWidth[2],
              }}
            >
              <div style={{ justifyContent: "flex-start", display: "flex" }}>
                <DropDown
                  choices={choices}
                  currentFilter={is_selected_government ? currentFilter : false}
                  handleFilter={handleFilter_3}
                  is_senate={is_senate}
                  colors={colors}
                  is_selected_government={is_selected_government}
                />
              </div>
            </div>
          )}
          <div
            className="switch"
            style={{
              transform: is_mobile
                ? `translateX(${20}px)`
                : `translateX(${-80}px)`,
            }}
          >
            <ToggleSwitch is_On={is_On} handleToggle={() => setIsOn(!is_On)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SenateFilter
