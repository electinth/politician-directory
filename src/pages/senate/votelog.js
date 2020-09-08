import React, { useState, useEffect } from "react"
import { media } from "../../styles"
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../components/layout"
import VotelogHeader from "../../components/senate/votelogHeader"
import VoteInfoPopup from "../../components/senate/voteInfoPopup"
import Autocomplete from "../../components/senate/autocomplete"
import SenateNavbar from "../../components/senate/senateNavbar"
import SenateVotelogBarchart from "../../components/senate/senateVotelogBarchart"

export const query = graphql`
  query {
    allSenateVoteYaml {
      nodes {
        id
        title
        name
        lastname
        votelog {
          key
          value
        }
      }
    }

    allSenateVotelogYaml {
      nodes {
        id
        title
        is_active
        vote_date
        description_th
        document {
          title
          link
        }
      }
    }

    allPeopleYaml {
      nodes {
        id
        fields {
          slug
        }
        is_senator
        senator_method
      }
    }
  }
`
const cssHeaderWrap = {
  position: "sticky",
  top: "0",
  background: "white",
  [media(767)]: {},
}

const VotelogPage = ({ data }) => {
  const [senatorId, setSenatorId] = useState("0")
  const [voteId, setVoteId] = useState("")
  const [popupState, setPopupState] = useState(false)
  const [voteSelected, setVoteSelected] = useState("")
  const [isShowAll, setIsShowAll] = useState(true)
  const [countByGroup, setCountByGroup] = useState([])
  const [barchartGroupWidth, setBarchartGroupWidth] = useState([])

  useEffect(() => {
    if (voteId) {
      setVoteSelected(_.find(data.allSenateVotelogYaml.nodes, { id: voteId }))
    }
  }, [voteId])

  return (
    <div>
      <VoteInfoPopup
        popupState={popupState}
        setPopupState={setPopupState}
        votelogInfo={voteSelected}
        allSenateVoteYaml={data.allSenateVoteYaml}
        allPeopleYaml={data.allPeopleYaml}
      />
      <Layout style={{ position: "relative" }}>
        <div css={cssHeaderWrap}>
          <SenateNavbar />
          <VotelogHeader
            setIsShowAll={setIsShowAll}
            allSenateVotelogYaml={data.allSenateVotelogYaml}
          />
          <Autocomplete
            setSenatorId={setSenatorId}
            isShowAll={isShowAll}
            countByGroup={countByGroup}
            barchartGroupWidth={barchartGroupWidth}
            allSenateVotelogYaml={data.allSenateVotelogYaml}
            allSenateVoteYaml={data.allSenateVoteYaml}
            allPeopleYaml={data.allPeopleYaml}
          />
        </div>
        <SenateVotelogBarchart
          setPopupState={setPopupState}
          senatorId={senatorId}
          setVoteId={setVoteId}
          isShowAll={isShowAll}
          setCountByGroup={setCountByGroup}
          setBarchartGroupWidth={setBarchartGroupWidth}
        />
      </Layout>
    </div>
  )
}

export default VotelogPage
