import React from "react"

import Img from "gatsby-image"

const FeatureIcon = ({ image }) => {
  return (
    <div
      style={{
        backgroundColor: "#222121",
        borderRadius: "50%",
        padding: "10%",
        width: "60%",
        marginBottom: "1.5rem",
      }}
    >
      <Img fluid={image.childImageSharp.fluid} style={{}} />
    </div>
  )
}

export default FeatureIcon
