import React from "react"
import { graphql, Link } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import Hero from "../components/hero"
import VoteLogCard from "../components/voteLogCard"

export const query = graphql`
  query {
    cabinet: allPeopleYaml(filter: { is_cabinet: { eq: true } }) {
      totalCount
    }
    senator: allPeopleYaml(filter: { is_senator: { eq: true } }) {
      totalCount
    }
    partyCoalition: allPartyYaml(
      filter: { party_faction: { eq: "ร่วมรัฐบาล" } }
    ) {
      totalCount
    }
    partyOpposition: allPartyYaml(
      filter: { party_faction: { eq: "ฝ่ายค้าน" } }
    ) {
      totalCount
    }
    allPeopleYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          name
          lastname
          cabinet_position
          prev_polit_pos
          is_cabinet
          is_senator
          is_mp
        }
      }
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
          short_name
          party_faction
        }
      }
    }
    allVotelogYaml(limit: 6) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          legal_title
          en {
            legal_title
          }
          passed
          approve
          disprove
          abstained
          absent
          total_voter
          vote_date
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
const cssSectionWhite = {
  ...cssSection,
  background: "var(--cl-white)",
}
const cssSectionBlack = {
  ...cssSection,
  color: "var(--cl-white)",
  background: "var(--cl-black)",
  h2: {
    ...cssSection.h2,
    color: "var(--cl-white)",
  },
}

const cssPartyTypeCard = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 300,
  minHeight: 350,
  padding: "2rem",
  borderRadius: "10px",
  color: "var(--cl-white)",
  background: "var(--cl-black)",

  width: `calc(${100 / 2}% - 2rem)`,
  marginBottom: "2rem",
  "&:nth-child(2n+1)": {
    marginRight: "2rem",
  },
  "&:hover": {
    background: "var(--cl-gray-0)",
    textDecoration: "none",
  },
  h3: {
    color: "var(--cl-white)",
    fontSize: "3.6rem",
  },
  h4: {
    color: "var(--cl-white)",
    fontSize: "2.4rem",
    fontFamily: "var(--ff-text)",
    fontWeight: "normal",
  },
}
const cssMPColumn = {
  display: "block",
  // flexDirection: "column",
  // justifyContent: "center",
  // // alignItems: "center",
  // // minWidth: 300,
  // // minHeight: 350,
  padding: "2rem",
  // borderRadius: "10px",
  // color: "var(--cl-white)",
  // background: "var(--cl-black)",

  width: `calc(${100 / 2}% - 2rem)`,
  marginBottom: "2rem",
  "&:nth-child(2n+1)": {
    marginRight: "2rem",
  },
  // h3: {
  //   color: "var(--cl-white)",
  //   fontSize: "3.6rem",
  // },
  // h4: {
  //   color: "var(--cl-white)",
  //   fontSize: "2.4rem",
  //   fontFamily: "var(--ff-text)",
  //   fontWeight: "normal",
  // },
  h3: {
    textAlign: "center",
    fontSize: "2.4rem",
  },
}

const IndexPage = ({ data }) => (
  <Layout
    pageStyles={{
      background: "var(--cl-pink)",
    }}
  >
    <SEO title="Home" />
    <section css={{ ...cssSection }}>
      <div className="container">
        <h1
          css={{
            fontSize: "6rem",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 0,
            marginBottom: "1rem",
            paddingTop: "6rem",
          }}
        >
          ใครคือผู้แทนของเรา
        </h1>
        <h2
          css={{
            fontSize: "4.8rem",
            textAlign: "center",
            marginBottom: "8rem",
          }}
        >
          ค้นหา ตรวจสอบ โปร่งใส
        </h2>

        <div css={{ margin: `0 auto 1.45rem` }}>
          <Hero />

          <div css={{ textAlign: "center" }}>
            <Button to="/about">เกี่ยวกับเรา</Button>
          </div>
        </div>
      </div>
    </section>

    <section
      css={{
        ...cssSectionWhite,
      }}
    >
      <div className="container">
        <h2 css={{ ...cssH1 }}>สัดส่วนผู้แทนของเรา พวกเขาเป็นใครบ้าง</h2>
      </div>
    </section>

    <section
      css={{
        ...cssSectionBlack,
      }}
    >
      <div className="container">
        <h2 css={{ ...cssH1 }}>สรุปผลการลงมติล่าสุด</h2>
        <div
          css={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginTop: "6rem",
          }}
        >
          {data.allVotelogYaml.edges.map(({ node }) => (
            <VoteLogCard
              key={node.id}
              css={{
                width: `calc(${100 / 2}% - 2rem)`,
                marginBottom: "2rem",
                "&:nth-child(2n+1)": {
                  marginRight: "2rem",
                },
              }}
              legal_title={node.legal_title}
              legal_title_en={node.en.legal_title}
              passed={node.passed}
              approve={node.approve}
              disprove={node.disprove}
              abstained={node.abstained}
              absent={node.absent}
              total_voter={node.total_voter}
              vote_date={node.vote_date}
            />
          ))}
        </div>
      </div>
    </section>

    <section
      css={{
        ...cssSectionWhite,
      }}
    >
      <div className="container">
        <h2 css={{ ...cssH1 }}>สำรวจตามชนิดและสังกัดผู้แทน</h2>

        <div
          css={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginTop: "6rem",
          }}
        >
          <Link to={"/cabinet"} css={cssPartyTypeCard}>
            <h3>คณะรัฐมนตรี</h3>
            <h4>{data.cabinet.totalCount} คน</h4>
          </Link>
          <Link to={"/senate"} css={cssPartyTypeCard}>
            <h3>สมาชิกวุฒิสภา</h3>
            <h4>{data.senator.totalCount} คน</h4>
          </Link>
        </div>

        <div>
          <h3
            css={{ fontSize: "3.6rem", textAlign: "center", marginTop: "4rem" }}
          >
            สมาชิกสภาผู้แทนราษฎร
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
                {data.allPartyYaml.edges
                  .filter(({ node }) => node.party_faction === "ร่วมรัฐบาล")
                  .map(({ node }) => (
                    <li>
                      <Link to={node.fields.slug}>{node.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div css={cssMPColumn}>
              <h3>พรรคฝ่ายค้าน ({data.partyOpposition.totalCount})</h3>
              <ul>
                {data.allPartyYaml.edges
                  .filter(({ node }) => node.party_faction === "ฝ่ายค้าน")
                  .map(({ node }) => (
                    <li>
                      <Link to={node.fields.slug}>{node.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
