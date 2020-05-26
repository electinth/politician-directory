import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query($id: String!) {
    motion: motionYaml(id: { glob: $id }) {
      id
      content
      name
      votelog_id
      vote_url
      purposers {
        last_name
        name
        party
        title
      }
      seconders {
        last_name
        name
        party
        title
      }
      select_committee
      status
      sub_cat
      vote_date(formatString: "")
      vote_result
      registration_no
      proposal_date(formatString: "")
      page_url
      main_cat
    }
  }
`

const MotionPage = props => {
  const {
    data: { motion },
  } = props

  console.log(props)
  return <h1>Motion Detail Pages {motion.name}</h1>
}

export default MotionPage
