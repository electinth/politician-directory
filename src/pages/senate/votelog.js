import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../components/layout"
import Autocomplete from "../../components/autocomplete"

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
  const [senatorId, setSenatorId] = useState('0');
  const [viewPerson, setViewPerson] = useState(true);
  const [viewGroup, setViewGroup] = useState(false);
  
  return (
    <div>
      <Layout style={{position: "relative"}}>
        <Autocomplete 
          setSenatorId={setSenatorId} 
          viewPerson={viewPerson} 
          viewGroup={viewGroup} 
          allSenateVoteYaml={data.allSenateVoteYaml}
        />
      </Layout>
    </div>
  )
}

export default VotelogPage