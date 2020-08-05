import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../components/layout"
import VotelogHeader from "../../components/votelogHeader"
import VoteInfoPopup from "../../components/voteInfoPopup"
import Autocomplete from "../../components/autocomplete"
import SenateNavbar from "../../components/senateNavbar"
import SenateVotelogBarchart from "../../components/senateVotelogBarchart"

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

const VotelogPage = ({ data }) => {
  const [senatorId, setSenatorId] = useState('0');
  const [voteId, setVoteId] = useState('');
  const [popupState, setPopupState] = useState(false);
  const [voteSelected, setVoteSelected] = useState('');
  const [isShowAll,setIsShowAll] = useState(true);
  const [countByGroup, setCountByGroup] = useState([])
  
  useEffect(()=>{
    if (voteId) {
      console.log('voteId>',voteId);
      setVoteSelected(_.find(data.allSenateVotelogYaml.nodes, { 'id': voteId }))
    }
  },[voteId])

  useEffect(()=>{
    console.log('senatorId>',senatorId);
   },[senatorId])

  return (
    <div>
      <VoteInfoPopup 
        popupState={popupState}
        setPopupState={setPopupState}
        votelogInfo={voteSelected}
        allSenateVoteYaml={data.allSenateVoteYaml}
        allPeopleYaml={data.allPeopleYaml}
      />
      <Layout style={{position: "relative"}}>
        <SenateNavbar/>
        <VotelogHeader 
          setIsShowAll={setIsShowAll}
        />
        <Autocomplete 
          setSenatorId={setSenatorId} 
          isShowAll= {isShowAll}
          allSenateVoteYaml={data.allSenateVoteYaml}
          allPeopleYaml={data.allPeopleYaml}
          countByGroup={countByGroup}
        />
        <SenateVotelogBarchart 
          setPopupState={setPopupState} 
          setVoteId={setVoteId}
          isShowAll= {isShowAll}
          setCountByGroup={setCountByGroup}
        />
      </Layout>
    </div>
  )
}

export default VotelogPage
