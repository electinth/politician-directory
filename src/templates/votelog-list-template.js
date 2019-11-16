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
          title
          description_th
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
            นับตั้งแต่เปิดประชุมสภาหลังการเลือกตั้ง
            มีการประชุมสภามาแล้วหลายต่อหลายครั้ง แต่ละครั้งก็มีหลายวาระ
            และใช้ระยะเวลาในการประชุมยาวนาน
            จนบางทีเราก็ตามไม่ทันว่ามีการลงมติครั้งสำคัญเกิดขึ้นในการประชุมครั้งไหนในสภาบ้าง?
            ใครยกมือสนับสนุนหรือคัดค้านมติไหน?
            เราจึงรวบรวบการลงมติครั้งสำคัญมาให้ พร้อมอธิบายสรุปแบบเข้าใจง่ายๆ
            ว่าสิ่งที่ผู้แทนแต่ละคนสนับสนุนหรือคัดค้านคืออะไร
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
                title={node.title}
                description_th={node.description_th}
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
