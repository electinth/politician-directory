import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import VoteLogCard from "../components/voteLogCard"
import VoteSearch from "../components/votesearch/VoteSearch"
import { Router } from "@reach/router"

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allVotelogYaml(
      filter: { is_active: { eq: true } }
      limit: $limit
      skip: $skip
      sort: { vote_date: DESC }
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
          passed
          approve
          disprove
          abstained
          absent
          vote_date
        }
      }
    }
    voteRecordImage: file(
      relativePath: { eq: "images/icons/votelog/votelog-white.png" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 48, layout: FIXED)
      }
    }
    updateImage: file(relativePath: { eq: "images/icons/update/update.png" }) {
      childImageSharp {
        gatsbyImageData(width: 17, layout: FIXED)
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

const VoteLogWrapper = votelogs => {
  const { data } = votelogs
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginTop: "6rem",
      }}
    >
      {data.map(({ node: { id, fields, ...voteLog } }) => (
        <VoteLogCard
          key={id}
          css={{
            width: `calc((var(--container-width) - 4rem) / 2)`,
            margin: "0 1rem 2rem 1rem",
          }}
          slug={fields.slug}
          {...voteLog}
        />
      ))}
    </div>
  )
}

const VoteLogPage = ({
  data: { allVotelogYaml, voteRecordImage, updateImage },
  pageContext,
}) => {
  const { currentPage, numPages } = pageContext
  const votelogs = allVotelogYaml.edges

  return (
    <Layout>
      <Seo
        title="บันทึกการประชุมและการลงมติ"
        imageUrl="/seo/share/votelog.png"
      />
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
            <GatsbyImage
              image={voteRecordImage.childImageSharp.gatsbyImageData}
              alt=""
              aria-hidden="true"
              css={{ width: "48px", margin: "auto" }}
            />
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
          <VoteSearch />
          <Router>
            {votelogs ? (
              <VoteLogWrapper
                path={currentPage === 1 ? "/votelog" : "/votelog/page/:id"}
                data={votelogs}
              />
            ) : (
              ""
            )}
          </Router>
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
              // console.log(pageNumber)
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
