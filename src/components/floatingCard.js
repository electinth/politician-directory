import React from "react"
import "../styles/global.css"

const FloatingCard = ({ children, cardStyles }) => {
  return (
    <div
      css={{
        boxShadow: "0 0 16px 0 #F4F4F4",
        borderRadius: "1rem",
        backgroundColor: "var(--cl-white)",
        ...cardStyles,
      }}
    >
      {children}
    </div>
  )
}

export default FloatingCard
