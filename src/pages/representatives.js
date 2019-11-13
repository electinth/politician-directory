import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { partyLogo } from "../utils"

export const query = graphql`
  query {
    partyCoalition: allPartyYaml(
      filter: { party_group: { eq: "ร่วมรัฐบาล" } }
    ) {
      totalCount
    }
    partyOpposition: allPartyYaml(filter: { party_group: { eq: "ฝ่ายค้าน" } }) {
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
`

const cssH1 = { fontSize: "4.8rem" }

const cssSection = {
  paddingTop: "3rem",
  paddingBottom: "8rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
}

const cssMPColumn = {
  display: "block",
  padding: "2rem",

  width: `calc(${100 / 2}% - 2rem)`,
  marginBottom: "2rem",
  "&:nth-of-type(2n+1)": {
    marginRight: "2rem",
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

const RepresentativesPage = ({ data }) => {
  const getSortedParties = partyGroup => {
    let members = data.allPartyYaml.edges.filter(
      ({ node }) => node.party_group === partyGroup
    )
    members.sort(({ node: a }, { node: b }) => b.total_member - a.total_member)
    return members
  }

  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <section css={{ ...cssSection, background: "#eeeeee" }}>
        <h1 css={{ textAlign: "center" }}>สมาชิกสภาผู้แทนราษฎรไทย</h1>
      </section>
      <section css={{ ...cssSection, background: "var(--cl-white)" }}>
        <div className="container">
          <h2 css={{ ...cssH1 }}>สรุปการลงมติล่าสุด</h2>
        </div>
      </section>
      <section css={{ ...cssSection, background: "#eeeeee" }}>
        <div className="container">
          <div>
            <h3
              css={{
                fontSize: "4.5rem",
                textAlign: "center",
                marginTop: "4rem",
              }}
            >
              สำรวจตามพรรคการเมือง
            </h3>
            <div
              css={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <div css={cssMPColumn}>
                <h3>พรรคร่วมรัฐบาล ({data.partyCoalition.totalCount})</h3>
                <ul>
                  {getSortedParties("ร่วมรัฐบาล").map(({ node }) => (
                    <div key={node.name} css={{ fontSize: "2.2rem" }}>
                      <Link to={node.fields.slug}>
                        <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                        {node.name}
                      </Link>
                      ({node.total_member})
                    </div>
                  ))}
                </ul>
              </div>
              <div css={cssMPColumn}>
                <h3>พรรคฝ่ายค้าน ({data.partyOpposition.totalCount})</h3>
                <ul>
                  {getSortedParties("ฝ่ายค้าน").map(({ node }) => (
                    <div key={node.name} css={{ fontSize: "2.2rem" }}>
                      <Link to={node.fields.slug}>
                        <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                        {node.name}
                      </Link>
                      ({node.total_member})
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default RepresentativesPage
