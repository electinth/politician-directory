import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import { css } from "@emotion/core"
import Info from "../components/motion/info"
import Nominator from "../components/motion/nominator"
import MotionMenu from "../components/motion/motionmenu"
import Breadcrumb from "../components/motion/breadcrumb"
import { createContext } from "react"
import { useState } from "react"
import { device } from "../components/motion/size"

export const query = graphql`
  query(
    $id: String!
    $select_committee: String!
    $main_cat: String!
    $votelog_id: String!
  ) {
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

    votelog: votelogYaml(id: { glob: $votelog_id }) {
      disprove
      approve
      passed
      absent
      abstained
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

  position: ${({ popup }) => (popup ? "absolute" : "sticky")};
  top: 0;
  left: 0;
  ${({ popup }) => popup && `z-index: 3;`}
  background-color: ${({ popup }) =>
    popup ? "var(--cl-white)" : "transparent"};

  pointer-events: none;
  & * {
    pointer-events: all;
  }

  ${MotionMenu} {
    flex: ${({ popup }) => (popup ? "1" : "0 0 250px")};
  }

  ${Nominator} {
    flex: ${({ popup }) => (popup ? "1" : "0 0 250px")};
    ${({ popup }) => popup && "margin: 10vh auto;"}
  }

  & > button {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 5;
  }

  & > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    margin-top: ${({ popup }) => (popup ? "10vh" : "0")};

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
export const MenuContext = createContext()
export const MenuChoice = {
  motion: "motion",
  nominator: "nominator",
}
const MotionPage = props => {
  const {
    data: {
      motion,
      committee: { nodes: members },
      motions: { nodes: motionCat },
      votelog,
    },
  } = props

  const [menu, setMenu] = useState(null)

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      <Layout>
        <Breadcrumb
          main_cat={motion.main_cat}
          registration_no={motion.registration_no}
        />
        <Container
          popup={!!menu}
          style={{ pointerEvents: !!menu ? "all" : "none" }}
        >
          {!!menu && <button onClick={() => setMenu(null)}>X</button>}
          {menu === MenuChoice.nominator ? (
            <></>
          ) : (
            <MotionMenu
              name={motion.name}
              motionCat={motionCat}
              popup={menu === MenuChoice.motion}
            />
          )}
          {menu === MenuChoice.motion ? (
            <></>
          ) : (
            <Nominator motion={motion} popup={menu === MenuChoice.nominator} />
          )}
        </Container>
        <Info
          css={css`
            margin: -100vh 250px 100px 250px;

            @media ${device.hideMotion} {
              margin-left: 0;
            }

            @media ${device.hideNominator} {
              margin-right: 0;
            }
          `}
          votelog={votelog}
          motion={motion}
          members={members}
        />
      </Layout>
    </MenuContext.Provider>
  )
}

export default MotionPage
