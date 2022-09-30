import React from "react"

const ExternalLink = ({ children, ...props }) => {
  return (
    <a {...props} target="_blank" rel="noreferrer nofollow noopener">
      {children}
    </a>
  )
}

export default ExternalLink
