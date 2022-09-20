import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import _ from "lodash"
import PartyLogo from "./partyLogo"

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
      ({ node }) =>
        node.party_group === partyGroup && totalActiveMember(node.name)
    )
    members.sort(({ node: a }, { node: b }) => {
      const totalDiff = totalActiveMember(b.name) - totalActiveMember(a.name)
      return totalDiff !== 0 ? totalDiff : a.name.localeCompare(b.name, "th")
    })
    return members
  }

  const PartyListItem = ({ node }) => (
    <Link
      key={node.name}
      to={node.fields.slug}
      style={{
        fontSize: "2.2rem",
        display: "flex",
        flexDirection: "row",
        marginBottom: "0.5rem",
      }}
    >
      <PartyLogo name={node.name} />
      <p style={{ margin: "auto 10px" }}>
        {node.name} ({totalActiveMember(node.name)})
      </p>
    </Link>
  )

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
            <PartyListItem node={node} />
          ))}
        </ul>
      </div>
      <div css={cssMPColumn}>
        <h3 style={{ ...paneHeaderStyle }}>
          พรรคฝ่ายค้าน ({data.partyOpposition.totalCount} คน)
        </h3>
        <ul>
          {getSortedParties("ฝ่ายค้าน").map(({ node }) => (
            <PartyListItem node={node} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PartyGroupList
