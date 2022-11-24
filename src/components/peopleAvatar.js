import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PeopleAvatar = ({ title = "", name, lastname }) => {
  const { peopleImages } = useStaticQuery(graphql`
    query {
      peopleImages: allFile(
        filter: { relativeDirectory: { eq: "images/people" } }
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 160)
            }
          }
        }
      }
    }
  `)

  const alt = title ? `${title} ${name} ${lastname}` : `${name} ${lastname}`

  const placeHolderImageNode = peopleImages.edges.find(
    ({ node }) => node.name === "placeholder"
  )

  const personImageNode = peopleImages.edges.find(
    ({ node }) => node.name === `${name}-${lastname}`
  )

  return getImage((personImageNode || placeHolderImageNode).node) ? (
    <GatsbyImage
      image={getImage((personImageNode || placeHolderImageNode).node)}
      alt={alt}
      style={{ pointerEvents: "none" }}
    />
  ) : null
}

export default PeopleAvatar
