import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../components/layout"
import VotelogHeader from "../../components/votelogHeader"
import VoteInfoPopup from "../../components/voteInfoPopup"
import Autocomplete from "../../components/autocomplete"
import MockBarchart from "../../components/mockBarchart"
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
  const [viewPerson, setViewPerson] = useState(true);
  const [viewGroup, setViewGroup] = useState(false);
  const [voteSelected, setVoteSelected] = useState('');
  
  useEffect(()=>{
    if (voteId) {
      console.log('voteId>',voteId);
      setVoteSelected(_.find(data.allSenateVotelogYaml.nodes, { 'id': voteId }))
    }
  },[voteId])
  
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
          viewPerson={viewPerson} 
          viewGroup={viewGroup} 
          setViewPerson={setViewPerson} 
          setViewGroup={setViewGroup}
        />
        <Autocomplete 
          setSenatorId={setSenatorId} 
          viewPerson={viewPerson} 
          viewGroup={viewGroup} 
          allSenateVoteYaml={data.allSenateVoteYaml}
        />
        {/* <MockBarchart 
          setPopupState={setPopupState}
          setVoteId={setVoteId} /> */}
        <SenateVotelogBarchart 
          setPopupState={setPopupState} 
          setVoteId={setVoteId} 
        />
      </Layout>
    </div>
  )
}

export default VotelogPage
