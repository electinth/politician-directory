import React from "react"

const ExternalLink = ({ children, ...props }) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default ExternalLink
