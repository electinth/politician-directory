import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../components/layout"
import VotelogHeader from "../../components/votelogHeader"
import VoteInfoPopup from "../../components/voteInfoPopup"
import Autocomplete from "../../components/autocomplete"
import MockBarchart from "../../components/mockBarchart"

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
        reference
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
  const voteSelected = _.find(data.allSenateVotelogYaml.nodes, { 'id': '1' })
  const [senatorId, setSenatorId] = useState('0');
  const [popupState, setPopupState] = useState(false);
  const [viewPerson, setViewPerson] = useState(true);
  const [viewGroup, setViewGroup] = useState(false);
  
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
        <MockBarchart setPopupState={setPopupState}/>
      </Layout>
    </div>
  )
}

export default VotelogPage
