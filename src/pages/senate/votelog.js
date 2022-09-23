import React, { useState, useReducer } from "react"
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
  const [popupState, setPopupState] = useState(false)
  const [voteSelected, setVoteSelected] = useState("")
  const [isShowAll, setIsShowAll] = useState(true)
  const [countByGroup, setCountByGroup] = useState([])
  const [barchartGroupWidth, setBarchartGroupWidth] = useState([])
  const [handleFilter, setHandleFilter] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [isSelectedPosition, setIsSelectedPosition] = useState(false)
  const [isSelectedGovernment, setIsSelectedGovernment] = useState(false)
  const [isSelectedYourself, setIsSelectedYourself] = useState(false)
  const [isOn, setIsOn] = useState(false)

  const [, setVoteId] = useReducer((_prevState, voteId) => {
    if (voteId) {
      setVoteSelected(_.find(data.allSenateVotelogYaml.nodes, { id: voteId }))
    }
    return voteId
  }, "")

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
            isMobile={isMobile}
            setIsPosition={setIsSelectedPosition}
            setIsGovernment={setIsSelectedGovernment}
            setIsYourself={setIsSelectedYourself}
            isSelectedPosition={isSelectedPosition}
            isSelectedGovernment={isSelectedGovernment}
            isSelectedYourSelf={isSelectedYourself}
            senatorTypeId={senatorTypeId}
            isOn={isOn}
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
          setIs_mobile_width={setIsMobile}
          is_selected_position={isSelectedPosition}
          is_selected_government={isSelectedGovernment}
          is_selected_yourSelf={isSelectedYourself}
          is_On={isOn}
          setIsOn={setIsOn}
        />
      </Layout>
    </div>
  )
}

export default VotelogPage
