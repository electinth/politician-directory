import React from "react"
import { OutboundLink } from "gatsby-plugin-gtag"

const ExternalLink = ({ children, ...props }) => {
  return (
    <OutboundLink {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </OutboundLink>
  )
}

export default ExternalLink
