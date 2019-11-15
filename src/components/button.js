import React from "react"
import { Link } from "gatsby"

const Button = ({ children, ...props }) => {
  return (
    <Link
      css={{
        display: "inline-block",
        background: "var(--cl-black)",
        padding: "1rem 4rem",
        textDecoration: "none",
        borderRadius: "0.8rem",
        border: "1px solid var(--cl-white)",
        fontSize: "2.4rem",
        fontFamily: "var(--ff-title)",
        color: "var(--cl-white)",
        "&:hover": {
          color: "gray",
        },
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default Button
