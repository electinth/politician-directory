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
  isMobile,
  setIsPosition,
  setIsGovernment,
  setIsYourself,
  isOn,
  setIsOn,
  senatorTypeId,
  isSelectedPosition,
  isSelectedGovernment,
  isSelectedYourself,
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
    return (
      [
        "เวลาล่าสุด",
        "เห็นด้วย",
        "ไม่เห็นด้วย",
        "งดออกเสียง",
        "ไม่ลงมติ",
        "ขาด",
      ].indexOf(type) || "เวลาล่าสุด"
    )
  }

  useEffect(() => {
    if (isShowAll) {
      setIsGovernment(false)
      setIsPosition(false)
      setIsYourself(false)
    }
    setCurrentFilter(false)
  }, [isShowAll]) // eslint-disable-line react-hooks/exhaustive-deps

  const [set_formatter, SetFormatter] = useState()
  useEffect(() => {
    setCurrentFilter(set_formatter)
  }, [setFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = e => {
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
  }
  const handleFilter_1 = e => {
    setIsPosition(true)
    setIsGovernment(false)
    setIsYourself(false)
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
    console.log(filter)
  }
  const handleFilter_2 = e => {
    setIsGovernment(false)
    setIsPosition(false)
    setIsYourself(true)
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
  }
  const handleFilter_3 = e => {
    setIsYourself(false)
    setIsGovernment(true)
    setIsPosition(false)
    let filter = e.target.innerText
    SetFormatter(formatTypes(filter))
    setHandleFilter(filter)
  }
  const getWidth = () => {
    return document.body.clientWidth
  }

  return (
    <div css={cssFilterWrapper}>
      {isShowAll ? (
        <div
          style={{
            display: "flex",
            width: `${getWidth}px`,
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
            <ToggleSwitch is_On={isOn} handleToggle={() => setIsOn(!isOn)} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: `${getWidth - 100}px`,
            margin: "0 3%",
          }}
        >
          {((senatorTypeId === 1 && isMobile) || !isMobile) && (
            <div
              style={{
                width: isMobile ? getWidth - 100 : barchartGroupWidth[0] + 235,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <DropDown
                  choices={choices}
                  currentFilter={isSelectedPosition ? currentFilter : false}
                  handleFilter={handleFilter_1}
                  is_senate={is_senate}
                  colors={colors}
                  is_selected_position={isSelectedPosition}
                />
              </div>
            </div>
          )}
          {((senatorTypeId === 2 && isMobile) || !isMobile) && (
            <div
              style={{
                width: isMobile ? getWidth - 100 : barchartGroupWidth[1] + 105,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <DropDown
                  choices={choices}
                  currentFilter={isSelectedYourself ? currentFilter : false}
                  handleFilter={handleFilter_2}
                  is_senate={is_senate}
                  colors={colors}
                  is_selected_yourSelf={isSelectedYourself}
                />
              </div>
            </div>
          )}
          {((senatorTypeId === 3 && isMobile) || !isMobile) && (
            <div
              style={{
                display: "flex",
                width: isMobile ? getWidth - 100 : barchartGroupWidth[2],
              }}
            >
              <div style={{ justifyContent: "flex-start", display: "flex" }}>
                <DropDown
                  choices={choices}
                  currentFilter={isSelectedGovernment ? currentFilter : false}
                  handleFilter={handleFilter_3}
                  is_senate={is_senate}
                  colors={colors}
                  is_selected_government={isSelectedGovernment}
                />
              </div>
            </div>
          )}
          <div
            className="switch"
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "flex-end",
              transform: "translateX(-50px)",
            }}
          >
            <ToggleSwitch is_On={isOn} handleToggle={() => setIsOn(!isOn)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SenateFilter
