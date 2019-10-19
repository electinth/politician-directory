import React from "react"

import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

const FeatureIcon = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "images/feature-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

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
      <Img fluid={data.placeholderImage.childImageSharp.fluid} style={{}} />
    </div>
  )
}

export default FeatureIcon
