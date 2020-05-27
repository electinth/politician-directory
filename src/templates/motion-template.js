import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import { css } from "@emotion/core"

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

const motionselector = ({ motion, className }) => {
  return (
    <div className={className}>
      MotionList
      <ul></ul>
    </div>
  )
}
const MotionSelector = styled(motionselector)`
  flex: 0 0 300px;
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

const MainContent = styled(maincontent)`
  margin: 50px 300px;
  padding: 40px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.15);
  min-height: 100vh;
`

const member = ({ className, motion: { purposers, seconders } }) => {
  return (
    <ul className={className}>
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
        <ul
          css={css`
            height: 50vh;
            overflow-y: scroll;
            list-style: none;

            & .party {
              color: grey;
            }
          `}
        >
          {seconders.map(({ title, name, last_name, party }) => (
            <li key={name + last_name}>
              <div>
                {name} {last_name}
              </div>
              <div className="party">{party}</div>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}
const Member = styled(member)`
  flex: 0 0 300px;
  height: 80vh;
`

const Container = styled.div`
  display: flex;
  flex-flow: row;
  position: absolute;
  justify-content: space-between;
  width: 100vw;
`
const MotionPage = props => {
  const {
    data: { motion },
  } = props

  console.log(props)
  return (
    <Layout>
      <Container>
        <MotionSelector motion={motion} />
        <Member motion={motion} />
      </Container>
      <MainContent motion={motion} />
    </Layout>
  )
}

export default MotionPage
