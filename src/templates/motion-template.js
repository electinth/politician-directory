import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query($id: String!) {
    allMotionYaml(filter: { id: { eq: $id } }) {
      nodes {
        id
        name
        page_url
      }
    }
  }
`

const MotionPage = props => {
  const {
    pageContext: { id },
    data: {
      allMotionYaml: {
        nodes: [motion],
      },
    },
  } = props

  console.log(motion)
  return <h1>Motion Detail Pages {motion.id}</h1>
}

export default MotionPage
