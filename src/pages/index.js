import React from "react"
import { graphql, Link } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import Hero from "../components/hero"
import VoteLogCard from "../components/voteLogCard";

export const query = graphql`
  query {
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
    allVotelogYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
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
            paddingTop: "6rem",
          }}
        >
          ใครคือผู้แทนของเรา
        </h1>
        <h2 css={{ fontSize: "4.8rem", textAlign: "center" }}>
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
        <div style={{marginTop: "6rem"}}>
          <VoteLogCard legal_title="ร่างข้อบังคับการประชุมสภาผู้แทนราษฎพ.ศ. ซึ่งคณะกกรมาธิการวิสามัญพิจารณาเสร็จแล้ว" legal_title_en="The Democrat Party is a Thail political party. The oldest party in Thailand, it was founded as a conservative and royalist party, and now upholds a conservative-" passed={false} approve={101} disprove={365} abstained={13}absent={0} total_voter={479} vote_date="2019-08-22" />
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
      </div>
    </section>

    <section css={{ ...cssSection, background: "#eeeeee" }}>
      <div className="container">
        <h2
          css={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          สารบัญ
        </h2>

        <div
          css={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
          }}
        >
          <div css={{ flex: "1 1 100px", display: "inline-block" }}>
            <h3>รัฐสภาไทย</h3>
            <ul>
              <li>
                <Link to="/cabinet/">ครม.</Link>
                <ul>
                  {data.allPeopleYaml.edges
                    .filter(({ node }) => node.is_cabinet)
                    .map(({ node }) => (
                      <li key={node.id}>
                        <Link
                          to={node.fields.slug}
                        >{`${node.title} ${node.name} ${node.lastname}`}</Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <Link to="/representatives/">ส.ส.</Link>
                <ul>
                  {data.allPeopleYaml.edges
                    .filter(({ node }) => node.is_mp)
                    .map(({ node }) => (
                      <li key={node.id}>
                        <Link
                          to={node.fields.slug}
                        >{`${node.title} ${node.name} ${node.lastname}`}</Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <Link to="/senate/">ส.ว.</Link>
                <ul>
                  {data.allPeopleYaml.edges
                    .filter(({ node }) => node.is_senator)
                    .map(({ node }) => (
                      <li key={node.id}>
                        <Link
                          to={node.fields.slug}
                        >{`${node.title} ${node.name} ${node.lastname}`}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>

          <div css={{ flex: "1 1 100px", display: "inline-block" }}>
            <h3>พรรคร่วมรัฐบาล</h3>
            <ul>
              {data.allPartyYaml.edges
                .filter(({ node }) => node.party_faction === "ร่วมรัฐบาล")
                .map(({ node }) => (
                  <li key={node.id}>
                    <Link to={node.fields.slug}>{`${node.name}`}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div css={{ flex: "1 1 100px", display: "inline-block" }}>
            <h3>พรรคฝ่ายค้าน</h3>
            <ul>
              {data.allPartyYaml.edges
                .filter(({ node }) => node.party_faction === "ฝ่ายค้าน")
                .map(({ node }) => (
                  <li key={node.id}>
                    <Link to={node.fields.slug}>{`${node.name}`}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div css={{ flex: "1 1 100px", display: "inline-block" }}>
            <h3>บันทึกมติ</h3>
            <ul>
              {data.allVotelogYaml.edges.map(({ node }) => (
                <li key={node.id}>
                  <Link to={node.fields.slug}>{`${node.title}`}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
