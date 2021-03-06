import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../components/layout"
import VotelogHeader from "../../components/senate/votelogHeader"
import VoteInfoPopup from "../../components/senate/voteInfoPopup"
import Autocomplete from "../../components/senate/autocomplete"
import SenateNavbar from "../../components/senate/senateNavbar"
import SenateVotelogBarchart from "../../components/senate/senateVotelogBarchart"
import SenateFilter from "../../components/senate/senateFilter"

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
  background: "white",
  position: "sticky",
  top: "0",
}

const VotelogPage = ({ data }) => {
  const [senatorTypeId, setSenatorTypeId] = useState(1)
  const [senatorId, setSenatorId] = useState("0")
  const [voteId, setVoteId] = useState("")
  const [popupState, setPopupState] = useState(false)
  const [voteSelected, setVoteSelected] = useState("")
  const [isShowAll, setIsShowAll] = useState(true)
  const [countByGroup, setCountByGroup] = useState([])
  const [barchartGroupWidth, setBarchartGroupWidth] = useState([])
  const [handleFilter, setHandleFilter] = useState("")
  const [is_mobile, setIs_mobile_width] = useState(false)
  const [is_selected_position, setIs_position] = useState(false)
  const [is_selected_government, setIs_government] = useState(false)
  const [is_selected_yourSelf, setIs_yourSelf] = useState(false)
  const [is_On, setIsOn] = useState(false)

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
        <SenateNavbar />
        <VotelogHeader
          setIsShowAll={setIsShowAll}
          setPopupState={setPopupState}
          allSenateVotelogYaml={data.allSenateVotelogYaml}
        />
        <div css={cssHeaderWrap}>
          <Autocomplete
            senatorTypeId={senatorTypeId}
            setSenatorTypeId={setSenatorTypeId}
            setSenatorId={setSenatorId}
            isShowAll={isShowAll}
            countByGroup={countByGroup}
            barchartGroupWidth={barchartGroupWidth}
            allSenateVotelogYaml={data.allSenateVotelogYaml}
            allSenateVoteYaml={data.allSenateVoteYaml}
            allPeopleYaml={data.allPeopleYaml}
          />
          <SenateFilter
            setFilter={handleFilter}
            setHandleFilter={setHandleFilter}
            isShowAll={isShowAll}
            barchartGroupWidth={barchartGroupWidth}
            is_mobile={is_mobile}
            setIs_position={setIs_position}
            setIs_government={setIs_government}
            setIs_yourSelf={setIs_yourSelf}
            is_selected_position={is_selected_position}
            is_selected_government={is_selected_government}
            is_selected_yourSelf={is_selected_yourSelf}
            senatorTypeId={senatorTypeId}
            is_On={is_On}
            setIsOn={setIsOn}
          />
        </div>
        <SenateVotelogBarchart
          handleFilter={handleFilter}
          setPopupState={setPopupState}
          senatorTypeId={senatorTypeId}
          senatorId={senatorId}
          setVoteId={setVoteId}
          isShowAll={isShowAll}
          setCountByGroup={setCountByGroup}
          setBarchartGroupWidth={setBarchartGroupWidth}
          setIs_mobile_width={setIs_mobile_width}
          is_selected_position={is_selected_position}
          is_selected_government={is_selected_government}
          is_selected_yourSelf={is_selected_yourSelf}
          is_On={is_On}
          setIsOn={setIsOn}
        />
      </Layout>
    </div>
  )
}

export default VotelogPage
