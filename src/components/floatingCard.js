import React from "react"
import "../styles/global.css"

const FloatingCard = ({ children, cardStyles }) => {
  return (
    <div
      css={{
        boxShadow: "8px 0 24px 16px #F8F8F8",
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
