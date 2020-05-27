import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import { css } from "@emotion/core"
import Info from "../components/motion/info"
import Nominator from "../components/motion/nominator"
import MotionMenu from "../components/motion/motionmenu"

export const query = graphql`
  query($id: String!, $select_committee: String!) {
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
      vote_date(formatString: "DD/MM/YYYY")
      vote_result
      registration_no
      proposal_date(formatString: "DD/MM/YYYY")
      page_url
      main_cat
    }

    committee: allPeopleYaml(
      filter: {
        committee: { elemMatch: { set: { eq: $select_committee, ne: "" } } }
      }
    ) {
      nodes {
        id
        name
        lastname
        party
      }
    }
  }
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
    data: {
      motion,
      committee: { nodes: members },
    },
  } = props

  console.log(motion, members)
  return (
    <Layout>
      <Container>
        <MotionMenu motion={motion} />
        <Nominator motion={motion} />
      </Container>
      <Info motion={motion} members={members} />
    </Layout>
  )
}

export default MotionPage
