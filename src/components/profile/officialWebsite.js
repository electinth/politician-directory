import React from "react"
import _ from "lodash"
import ExternalLink from "../externalLink"

const cssLinkBox = {
  fontSize: "1.7rem",
  fontFamily: "var(--ff-title)",
  fontWeight: "bold",
  textDecoration: "none",
  border: "1px solid var(--cl-black)",
  marginRight: "1rem",
  padding: "0 1rem",
  textDecoration: "none",
  color: "var(--cl-black)",
  "&:hover": {
    textDecoration: "none",
  },
}

// component to show official websites
const OfficialWebsite = profile => {
  const items = _.compact(
    ["website", "facebook", "twitter"].map(key => {
      const official = profile[key]
      if (!official) return null
      return (
        <ExternalLink key={key} href={official} css={{ ...cssLinkBox }}>
          {_.startCase(key)}
        </ExternalLink>
      )
    })
  )
  return (
    <div className="official-website">
      {items.length > 0 ? items : "ไม่มีข้อมูล"}
    </div>
  )
}

export default OfficialWebsite
