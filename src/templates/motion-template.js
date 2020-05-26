import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"

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

const Member = ({ motion: { purposers, seconders } }) => {
  return (
    <ul>
      <li>
        ผู้เสนอ
        <ul>
          {purposers.map(({ title, name, last_name, party }) => (
            <li key={name + last_name}>
              {name} {last_name}
            </li>
          ))}
        </ul>
      </li>
      <li>
        ผู้รับรอง
        <ul>
          {seconders.map(({ title, name, last_name, party }) => (
            <li key={name + last_name}>
              {name} {last_name}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}

const MotionPage = props => {
  const {
    data: { motion },
  } = props

  console.log(props)
  return (
    <Layout>
      Motion Detail Pages {motion.name}
      <Member motion={motion} />
    </Layout>
  )
}

export default MotionPage
