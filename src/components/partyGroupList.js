import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

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
    fontSize: "4rem",
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
      partyCoalition: allPartyYaml(
        filter: { party_group: { eq: "ร่วมรัฐบาล" } }
      ) {
        totalCount
      }
      partyOpposition: allPartyYaml(
        filter: { party_group: { eq: "ฝ่ายค้าน" } }
      ) {
        totalCount
      }
      allPartyYaml(filter: { party_type: { eq: "พรรค" } }) {
        totalCount
        edges {
          node {
            id
            fields {
              slug
            }
            name
            party_group
            total_member
          }
        }
      }
    }
  `)

  const getSortedParties = partyGroup => {
    let members = data.allPartyYaml.edges.filter(
      ({ node }) => node.party_group === partyGroup
    )
    members.sort(({ node: a }, { node: b }) => b.total_member - a.total_member)
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
          พรรคร่วมรัฐบาล ({data.partyCoalition.totalCount})
        </h3>
        <ul>
          {getSortedParties("ร่วมรัฐบาล").map(({ node }) => (
            <div key={node.name} css={{ fontSize: "2.2rem" }}>
              <Link to={node.fields.slug}>
                <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                {node.name}&nbsp;
              </Link>
              ({node.total_member})
            </div>
          ))}
        </ul>
      </div>
      <div css={cssMPColumn}>
        <h3 style={{ ...paneHeaderStyle }}>
          พรรคฝ่ายค้าน ({data.partyOpposition.totalCount})
        </h3>
        <ul>
          {getSortedParties("ฝ่ายค้าน").map(({ node }) => (
            <div key={node.name} css={{ fontSize: "2.2rem" }}>
              <Link to={node.fields.slug}>
                <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                {node.name}&nbsp;
              </Link>
              ({node.total_member})
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PartyGroupList
