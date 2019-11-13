import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { css, Global } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VoterList from "../components/voterList"

export const query = graphql`
  query($slug: String!) {
    votelogYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      legal_title
      vote_date(formatString: "D MMM YY")
      description_th
      reference
      meeting
      passed
      total_voter
    }

    voteRecordIcon: file(
      relativePath: { eq: "images/votelog/VoteRecord.png" }
    ) {
      childImageSharp {
        fixed(height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
const VotelogPage = ({ data: { votelogYaml, voteRecordIcon } }) => {
  return (
    <Layout
      pageStyles={{
        background: "#000",
        paddingTop: "5rem",
      }}
      mainStyles={{
        background: "#fff",
        width: "920px",
        borderRadius: "10px",
        padding: "3rem",
      }}
    >
      <Global
        styles={css`
          section:not(:last-child) {
            border-bottom: 0.5rem solid black;
            padding-top: 3rem;
            padding-bottom: 3rem;
            h2 {
              font-size: 4.8rem;
              text-align: center;
            }
            .dot {
              margin: 0 1rem;
              height: 2rem;
              width: 2rem;
              display: inline-block;
              border-radius: 50%;
              background-color: ${votelogYaml.passed
                ? "var(--cl-vote-yes)"
                : "var(--cl-vote-no)"};
            }
          }
        `}
      />
      <SEO title="มติ" />
      <section
        css={css`
          padding-bottom: 1rem !important;
          span {
            font-size: 3rem;
          }
        `}
      >
        <div className="container">
          <span>
            <Img
              fixed={voteRecordIcon.childImageSharp.fixed}
              css={css`
                -webkit-filter: invert(100%);
                vertical-align: middle;
              `}
            />
            {votelogYaml.meeting}
            <span
              css={css`
                float: right;
              `}
            >
              {votelogYaml.vote_date}
            </span>
          </span>
        </div>
      </section>
      <section
        css={css`
          padding-bottom: 1rem !important;
          span {
            font-size: 3rem;
          }
        `}
      >
        <div
          className="container"
          css={css`
            margin-bottom: 3rem;
          `}
        >
          {" "}
          <h1
            css={{
              marginTop: 0,
            }}
          >{`${votelogYaml.title}`}</h1>
          <p
            css={css`
              font-size: 2rem;
            `}
          >
            {votelogYaml.legal_title}
          </p>
        </div>
        <span>
          สถานะ{" "}
          {votelogYaml.passed ? (
            <span
              css={css`
                color: var(--cl-vote-yes);
              `}
            >
              <span className="dot"></span>ผ่าน
            </span>
          ) : (
            <span
              css={css`
                color: var(--cl-vote-no);
              `}
            >
              <span className="dot"></span>ไม่ผ่าน
            </span>
          )}
          <span
            css={css`
              float: right;
            `}
          >
            ผู้ลงคะแนน {votelogYaml.total_voter} คน
          </span>
        </span>
      </section>
      <section>
        <h1>เนื้อหา</h1>
        <p
          css={css`
            font-size: 2rem;
          `}
        >
          {votelogYaml.description_th}
        </p>
      </section>
      <VoterList votelogKey={votelogYaml.id} />
    </Layout>
  )
}

export default VotelogPage
