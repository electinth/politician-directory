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
        fields {
          slug
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100vw;

  ${MotionMenu} {
    flex: 0 0 300px;
  }

  ${Info} {
    flex: 1;
  }

  ${Nominator} {
    flex: 0 0 300px;
  }
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
        <Info motion={motion} members={members} />
        <Nominator motion={motion} />
      </Container>
    </Layout>
  )
}

export default MotionPage
