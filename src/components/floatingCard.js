import React from "react"
import "../styles/global.css"

const FloatingCard = ({ children, ...props }) => {
  return (
    <div
      css={{
        boxShadow: "0 0 16px 16px #F4F4F4",
        borderRadius: "1rem",
        backgroundColor: "var(--cl-white)",
      }}
      style={props.style || {}}
    >
      {children}
    </div>
  )
}

export default FloatingCard
