import React from "react"
import { Link } from "gatsby"

const Button = ({ children, ...props }) => {
  return (
    <Link
      css={{
        display: "inline-block",
        background: "var(--cl-black)",
        padding: "1rem 3rem",
        textDecoration: "none",
        borderRadius: "1rem",
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
