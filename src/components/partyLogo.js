import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PartyLogo = ({ name }) => {
  const { partyImages } = useStaticQuery(graphql`
    query {
      partyImages: allFile(
        filter: { relativeDirectory: { eq: "images/party" } }
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 45)
            }
          }
        }
      }
    }
  `)

  const placeHolderImageNode = partyImages.edges.find(
    ({ node }) => node.name === "placeholder"
  )

  const partyImageNode = partyImages.edges.find(
    ({ node }) => node.name === name
  )

  return (
    <GatsbyImage
      image={getImage((partyImageNode || placeHolderImageNode).node)}
      alt={name || ""}
    />
  )
}

export default PartyLogo
