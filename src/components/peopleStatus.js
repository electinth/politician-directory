import React from "react"

const PeopleStatus = ({ isActive }) => {
  const getStatusColor = isActive => {
    return isActive ? "var(--cl-vote-yes)" : "var(--cl-vote-abstained)"
  }

  const getTextColor = isActive => {
    return isActive ? "var(--cl-vote-yes)" : "var(--cl-black)"
  }

  const getText = isActive => {
    return isActive ? "อยู่ในตำแหน่ง" : "พ้นจากตำแหน่ง"
  }

  return (
    <div
      css={{
        boxSizing: "border-box",
        width: "18rem",
        border: "1px solid var(--cl-gray-3)",
        borderRadius: "5px",
        margin: "1.5rem auto",
        fontWeight: "bold",
        lineHeight: "1.4",
      }}
    >
      <span>สถานะ</span>
      <span
        css={{
          height: "0.8rem",
          width: "0.8rem",
          backgroundColor: getStatusColor(isActive),
          borderRadius: "50%",
          display: "inline-block",
          margin: "0.1rem",
          marginLeft: "1rem",
        }}
      ></span>
      <span css={{ color: getTextColor(isActive) }}>{getText(isActive)}</span>
    </div>
  )
}

export default PeopleStatus
