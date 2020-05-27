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
const maincontent = function({ motion, className }) {
  return (
    <div className={className}>
      <h2>{motion.name}</h2>
      <div>{motion.content}</div>
      <div>hello</div>
    </div>
  )
}

const MainContent = styled(maincontent)``

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

const Container = styled.div`
  display: flex;
  flex-flow: row;
`
const MotionPage = props => {
  const {
    data: { motion },
  } = props

  console.log(props)
  return (
    <Layout>
      <Container>
        <MainContent motion={motion} />
        <Member motion={motion} />
      </Container>
    </Layout>
  )
}

export default MotionPage
