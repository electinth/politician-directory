import React from "react"
import moment from "moment"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VoteLogCard from "../components/voteLogCard"

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allVotelogYaml(limit: $limit, skip: $skip) {
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
    voteRecordImage: file(
      relativePath: { eq: "images/votelog/VoteRecord.png" }
    ) {
      childImageSharp {
        fixed(width: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    updateImage: file(relativePath: { eq: "images/update/Update.png" }) {
      childImageSharp {
        fixed(width: 17) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const paginationStyle = {
  color: "var(--cl-black)",
  fontSize: "2.2rem",
  fontWeight: "bold",
  textDecoration: "none",
  margin: "0.2rem 0.3rem 0 0.3rem",
  "&:hover": {
    textDecoration: "none",
  },
}

const VoteLogPage = ({
  data: { allVotelogYaml, voteRecordImage, updateImage },
  pageContext,
}) => {
  const { currentPage, numPages } = pageContext
  const votelogs = allVotelogYaml.edges.sort(({ node: a }, { node: b }) =>
    moment(b.vote_date).diff(moment(a.vote_date), "days")
  )

  return (
    <Layout>
      <SEO title="บันทึกการประชุมและการลงมติ" />
      <section
        css={{
          backgroundColor: "#222222",
          padding: "8rem 0 4rem 0",
          color: "--cl-white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div>
            <Img
              fixed={voteRecordImage.childImageSharp.fixed}
              css={{ width: "48px", margin: "auto" }}
            ></Img>
          </div>
          <h1
            css={{
              color: "var(--cl-white)",
              textAlign: "center",
              fontSize: "4.8rem",
            }}
          >
            บันทึกการประชุมและการลงมติ
          </h1>
          <p css={{ padding: "0 8rem", color: "#eeeeee" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <h1
            css={{
              textAlign: "center",
              fontSize: "4.8rem",
              margin: "6rem 0",
            }}
          >
            สรุปผลการลงมติล่าสุด
          </h1>
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginTop: "6rem",
            }}
          >
            {votelogs.map(({ node }) => (
              <VoteLogCard
                key={node.id}
                css={{
                  width: `calc((var(--container-width) - 4rem) / 2)`,
                  margin: "0 1rem 2rem 1rem",
                  border: "2px solid var(--cl-black)",
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
                slug={node.fields.slug}
              />
            ))}
          </div>
        </div>
      </section>
      <section css={{ padding: "8rem 0" }}>
        <div className="container">
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              color: "var(--cl-black)",
            }}
          >
            {currentPage !== 1 ? (
              <Link
                to={`/votelog${
                  currentPage - 1 === 1 ? "" : `/page/${currentPage - 1}`
                }`}
                css={{
                  ...paginationStyle,
                  marginTop: "0rem",
                }}
              >
                &lt;
              </Link>
            ) : (
              ""
            )}
            {Array.from({ length: numPages }, (_, i) => {
              const pageNumber = i + 1
              if (pageNumber === currentPage) {
                return (
                  <span
                    key={`page-number-${pageNumber}`}
                    css={{
                      ...paginationStyle,
                      textDecoration: "underline",
                    }}
                  >
                    {pageNumber}
                  </span>
                )
              }
              return (
                <Link
                  key={`page-number-${pageNumber}`}
                  to={`/votelog${
                    pageNumber === 1 ? "" : `/page/${pageNumber}`
                  }`}
                  css={paginationStyle}
                >
                  {pageNumber}
                </Link>
              )
            })}
            {currentPage !== numPages ? (
              <Link
                to={`/votelog${`/page/${currentPage + 1}`}`}
                css={{
                  ...paginationStyle,
                  marginTop: "0rem",
                }}
              >
                &gt;
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default VoteLogPage
