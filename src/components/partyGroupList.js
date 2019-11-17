import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import _ from "lodash"

import { partyLogo } from "../utils"

const cssMPColumn = {
  display: "block",
  padding: "2rem",
  width: `calc((var(--container-width) - 4rem) / 2)`,
  margin: "0 1rem",
  a: {
    color: "var(--cl-black)",
  },
  h3: {
    textAlign: "left",
    fontSize: "3.2rem",
    padding: "2rem",
  },
  img: {
    height: "4.5rem",
    width: "4.5rem",
    borderRadius: "50%",
    display: "inline-block",
    verticalAlign: "middle",
  },
}

const PartyGroupList = ({ paneHeaderStyle }) => {
  const data = useStaticQuery(graphql`
    query {
      partyCoalition: allPeopleYaml(
        filter: {
          party_group: { eq: "ร่วมรัฐบาล" }
          is_mp: { eq: true }
          is_active: { eq: true }
        }
      ) {
        totalCount
      }
      partyOpposition: allPeopleYaml(
        filter: {
          party_group: { eq: "ฝ่ายค้าน" }
          is_mp: { eq: true }
          is_active: { eq: true }
        }
      ) {
        totalCount
      }
      mpParty: allPeopleYaml(
        filter: { is_mp: { eq: true }, is_active: { eq: true } }
      ) {
        edges {
          node {
            party
          }
        }
      }
      allPartyYaml(
        filter: { party_type: { eq: "พรรค" }, is_active: { eq: true } }
      ) {
        totalCount
        edges {
          node {
            id
            fields {
              slug
            }
            name
            party_group
          }
        }
      }
    }
  `)

  // Get active member count of each party
  const activeMpByParty = _.mapValues(
    _.groupBy(data.mpParty.edges.map(({ node }) => node.party)),
    list => list.length
  )

  function totalActiveMember(partyName) {
    return activeMpByParty[partyName] || 0
  }

  // sort by more members first, then alphabetically
  const getSortedParties = partyGroup => {
    let members = data.allPartyYaml.edges.filter(
      ({ node }) => node.party_group === partyGroup
    )
    members.sort(({ node: a }, { node: b }) => {
      const totalDiff = totalActiveMember(b.name) - totalActiveMember(a.name)
      return totalDiff !== 0 ? totalDiff : a.name.localeCompare(b.name, "th")
    })
    return members
  }

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginTop: "2rem",
      }}
    >
      <div css={cssMPColumn}>
        <h3 style={{ ...paneHeaderStyle }}>
          พรรคร่วมรัฐบาล ({data.partyCoalition.totalCount} คน)
        </h3>
        <ul>
          {getSortedParties("ร่วมรัฐบาล").map(({ node }) => (
            <div key={node.name} css={{ fontSize: "2.2rem" }}>
              <Link to={node.fields.slug}>
                <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                {node.name}&nbsp;
              </Link>
              ({totalActiveMember(node.name)})
            </div>
          ))}
        </ul>
      </div>
      <div css={cssMPColumn}>
        <h3 style={{ ...paneHeaderStyle }}>
          พรรคฝ่ายค้าน ({data.partyOpposition.totalCount} คน)
        </h3>
        <ul>
          {getSortedParties("ฝ่ายค้าน").map(({ node }) => (
            <div key={node.name} css={{ fontSize: "2.2rem" }}>
              <Link to={node.fields.slug}>
                <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                {node.name}&nbsp;
              </Link>
              ({totalActiveMember(node.name)})
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PartyGroupList
