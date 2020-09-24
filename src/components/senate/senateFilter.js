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
}) => {
  const [currentFilter, setCurrentFilter] = useState("เวลาล่าสุด")

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
    } else if (type === "เวลาล่าสุด" || type === "") {
      return "เวลาล่าสุด"
    }
  }

  useEffect(() => {
    if (isShowAll) {
      setIs_government(false)
      setIs_position(false)
      setIs_yourSelf(false)
    }
  }, [isShowAll])

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

  const handleFilter = e => {
    let filter = e.target.innerText
    let set_formatter = formatTypes(filter)
    setCurrentFilter(set_formatter)
    setHandleFilter(filter)
  }

  return (
    <div css={cssFilterWrapper}>
      {isShowAll ? (
        <div
          style={{
            display: "flex",
            width: `${window.innerWidth - 100}px`,
            margin: "0 5%",
          }}
        >
          <div>
            <DropDown
              choices={choices}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              is_senate={is_senate}
              colors={colors}
            />
          </div>
          <div
            style={{
              transform: `translateX(${
                is_mobile ? window.innerWidth - 100 : window.innerWidth - 190
              }px)`,
            }}
          >
            <ToggleSwitch is_On={is_On} handleToggle={() => setIsOn(!is_On)} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: `${window.innerWidth - 100}px`,
            margin: "0 5%",
          }}
        >
          {((senatorTypeId === 1 && window.innerWidth < 768) ||
            window.innerWidth > 768) && (
            <div
              style={{
                width: barchartGroupWidth[0] + 250,
                display: "flex",
                justifyContent: "flex-start",
              }}
              onClick={() => selected_dropdown("count_by_position")}
            >
              <DropDown
                style={{
                  margin: "0 70px",
                }}
                choices={choices}
                currentFilter={currentFilter}
                handleFilter={handleFilter}
                is_senate={is_senate}
                colors={colors}
              />
            </div>
          )}
          {((senatorTypeId === 2 && window.innerWidth < 768) ||
            window.innerWidth > 768) && (
            <div
              style={{
                width: is_mobile
                  ? barchartGroupWidth[0] + 250
                  : barchartGroupWidth[1] + 160,
                display: "flex",
                justifyContent: "flex-start",
              }}
              onClick={() => selected_dropdown("count_by_yourSelf")}
            >
              <DropDown
                choices={choices}
                currentFilter={currentFilter}
                handleFilter={handleFilter}
                is_senate={is_senate}
                colors={colors}
              />
            </div>
          )}
          {((senatorTypeId === 3 && window.innerWidth < 768) ||
            window.innerWidth > 768) && (
            <div
              style={{
                display: "flex",
                width: is_mobile
                  ? barchartGroupWidth[0] + 250
                  : barchartGroupWidth[2] - 90,
              }}
              onClick={() => selected_dropdown("count_by_government")}
            >
              <div style={{ justifyContent: "flex-start", display: "flex" }}>
                <DropDown
                  choices={choices}
                  currentFilter={currentFilter}
                  handleFilter={handleFilter}
                  is_senate={is_senate}
                  colors={colors}
                />
              </div>
            </div>
          )}
          <div
            style={{
              transform: is_mobile
                ? `translateX(${0}px)`
                : `translateX(${-70}px)`,
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
