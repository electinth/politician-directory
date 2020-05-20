import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import Hero from "../components/hero"
import VoteLogCard from "../components/voteLogCard"
import WaffleFilter from "../components/waffleFilter"
import PartyGroupList from "../components/partyGroupList"

export const query = graphql`
  query {
    cabinet: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      totalCount
    }
    senator: allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
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
          birthdate(fromNow: true)
          degree
          education
          ex_occupation
          graduation
          gender
          occupation_group
          name
          lastname
          title
          cabinet_position
          is_active
          is_cabinet
          is_senator
          is_mp
          mp_type
          mp_list
          mp_province
          mp_zone
          party
        }
      }
    }
    allVotelogYaml(
      filter: { is_active: { eq: true } }
      limit: 6
      sort: { fields: vote_date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          description_th
          approve
          disprove
          abstained
          absent
          vote_date
        }
      }
    }
    cabinetImage: file(
      relativePath: { eq: "images/icons/cabinet/cabinet.png" }
    ) {
      childImageSharp {
        fixed(width: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    senateImage: file(relativePath: { eq: "images/icons/senate/senate.png" }) {
      childImageSharp {
        fixed(width: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    representativeImage: file(
      relativePath: { eq: "images/icons/representative/representative.png" }
    ) {
      childImageSharp {
        fixed(width: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const cssH1 = { fontSize: "4.8rem", marginTop: "4rem" }

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
  minHeight: "300px",
  padding: "2rem",
  borderRadius: "10px",
  color: "var(--cl-white)",
  background: "var(--cl-black)",

  width: `calc((var(--container-width) - 4rem) / 2)`,
  margin: "1rem",
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

const PeoplePage = ({ data }) => {
  return (
    <Layout
      pageStyles={{
        background: "var(--cl-people-section)",
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
              <Link
                to="/about"
                css={{
                  padding: "1rem 4rem",
                  fontFamily: "var(--ff-title)",
                  fontSize: "2.4rem",
                  color: "var(--cc-white)",
                  textDecoration: "underline",
                  border: "none",
                  background: "none",
                  "&:hover": {
                    color: "gray",
                  },
                }}
              >
                เกี่ยวกับเรา
              </Link>
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
          <WaffleFilter
            // key="parliament"
            data={data.allPeopleYaml.edges}
          />
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
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginTop: "6rem",
            }}
          >
            {data.allVotelogYaml.edges.map(({ node }) => (
              <VoteLogCard
                key={node.id}
                view={"full"}
                css={{
                  width: `calc((var(--container-width) - 4rem) / 2)`,
                  margin: "0 1rem 2rem 1rem",
                }}
                title={node.title}
                description_th={node.description_th}
                approve={node.approve}
                disprove={node.disprove}
                abstained={node.abstained}
                absent={node.absent}
                vote_date={node.vote_date}
                slug={node.fields.slug}
              />
            ))}
          </div>
          <div
            css={{
              textAlign: "center",
              margin: "4.8rem 0 0 0",
            }}
          >
            <Button to="/votelog">ดูทั้งหมด</Button>
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
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginTop: "6rem",
            }}
          >
            <Link to={"/cabinet"} css={cssPartyTypeCard}>
              <Img
                css={{ marginBottom: "1.2rem" }}
                fixed={data.cabinetImage.childImageSharp.fixed}
              />
              <h3>คณะรัฐมนตรี</h3>
              <h4>{data.cabinet.totalCount} คน</h4>
            </Link>
            <Link to={"/senate"} css={cssPartyTypeCard}>
              <Img
                css={{ marginBottom: "1.2rem" }}
                fixed={data.senateImage.childImageSharp.fixed}
              />
              <h3>สมาชิกวุฒิสภา</h3>
              <h4>{data.senator.totalCount} คน</h4>
            </Link>
          </div>

          <div css={{ marginTop: "4rem" }}>
            <div
              css={{
                marginBottom: "1.2rem",
                textAlign: "center",
              }}
            >
              <Img fixed={data.representativeImage.childImageSharp.fixed} />
            </div>
            <h3
              css={{
                fontSize: "3.6rem",
                textAlign: "center",
              }}
            >
              <Link
                to={"/representatives"}
                css={{
                  color: "var(--cl-black)",
                }}
              >
                สมาชิกสภาผู้แทนราษฎร
              </Link>
            </h3>
            <PartyGroupList
              paneHeaderStyle={{
                textAlign: "center",
                fontSize: "2.4rem",
              }}
            />
            <div
              css={{
                textAlign: "center",
                margin: "4.8rem 0 0 0",
              }}
            >
              <Button to="/representatives">ดู ส.ส. ทั้งหมด</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PeoplePage
