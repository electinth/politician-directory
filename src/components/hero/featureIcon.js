import React from "react"

import Img from "gatsby-image"

const FeatureIcon = ({ image, borderWidth }) => {
  return (
    <div
      style={{
        backgroundColor: "#19171a",
        borderRadius: "50%",
        width: "60%",
        marginBottom: "1.5rem",
      }}
    >
      <Img fluid={image.childImageSharp.fluid} style={{}} />
    </div>
  )
}

export default FeatureIcon
