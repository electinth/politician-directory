import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

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
      <GatsbyImage image={image.childImageSharp.gatsbyImageData} style={{}} />
    </div>
  )
}

export default FeatureIcon
