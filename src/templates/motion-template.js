import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import { css } from "@emotion/core"
import Info from "../components/motion/info"
import Nominator from "../components/motion/nominator"
import MotionMenu from "../components/motion/motionmenu"
import Breadcrumb from "../components/motion/breadcrumb"

export const query = graphql`
  query($id: String!, $select_committee: String!, $main_cat: String!) {
    motion: motionYaml(id: { glob: $id }) {
      id
      content
      name
      votelog_id
      voting_url
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
      voting_date
      voting_result
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

    motions: allMotionYaml(filter: { main_cat: { eq: $main_cat } }) {
      nodes {
        name
        registration_no
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
  max-width: 100%;
  height: 100vh;

  position: sticky;
  top: 0;
  left: 0;

  pointer-events: none;
  & * {
    pointer-events: all;
  }

  ${MotionMenu} {
    flex: 0 0 300px;
  }

  ${Nominator} {
    flex: 0 0 300px;
  }

  & > * {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 60vh;
      left: 0;
      pointer-events: none;
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1) 90%
      );
      width: 100%;
      height: 20vh;
    }
  }
`
const MotionPage = props => {
  const {
    data: {
      motion,
      committee: { nodes: members },
      motions: { nodes: motionCat },
    },
  } = props

  console.log(motion, members, motionCat)
  return (
    <Layout>
      <Breadcrumb
        main_cat={motion.main_cat}
        registration_no={motion.registration_no}
      />
      <Container>
        <MotionMenu name={motion.name} motionCat={motionCat} />
        <Nominator motion={motion} />
      </Container>
      <Info
        css={css`
          margin: -100vh 300px 100px 300px;
        `}
        motion={motion}
        members={members}
      />
    </Layout>
  )
}

export default MotionPage
