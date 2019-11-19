import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { css, Global } from "@emotion/core"
import _ from "lodash"

import ExternalLink from "../components/externalLink"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VoterList from "../components/voterList"
import Waffle from "../components/waffle"

export const query = graphql`
  query($slug: String!) {
    votelogYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      legal_title
      vote_date(formatString: "DD.M.YYYY")
      description_th
      reference
      document {
        title
        link
      }
      meeting
      passed
      total_voter
      approve
      disprove
      abstained
      absent
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

    allPeopleVoteYaml {
      nodes {
        id
        title
        name
        lastname
        votelog {
          key
          value
        }
      }
    }
    allPeopleYaml {
      nodes {
        id
        is_senator
        party
        fields {
          slug
        }
      }
    }
  }
`

const filterVote = (combined, key, value) =>
  _.filter(combined, o => {
    return _.find(o.votelog, p => p.key === key).value === value
  })

const VotelogPage = ({
  data: { votelogYaml, voteRecordIcon, allPeopleVoteYaml, allPeopleYaml },
}) => {
  let combined = []
  allPeopleVoteYaml.nodes.forEach(votelog => {
    const matched = _.find(allPeopleYaml.nodes, ["id", votelog.id])
    combined.push({ ...votelog, ...matched })
  })
  const approve = filterVote(combined, votelogYaml.id, "1")
  const disprove = filterVote(combined, votelogYaml.id, "2")
  const abstained = filterVote(combined, votelogYaml.id, "3")
  const absent = filterVote(combined, votelogYaml.id, "4")

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
      <SEO title="มติ" imageUrl="/seo/votelog.png" />
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
        <Waffle
          // key="parliament"
          data={[
            approve.map(p => ({ node: p })),
            disprove.map(p => ({ node: p })),
            abstained.map(p => ({ node: p })),
            absent.map(p => ({ node: p })),
          ]}
          colors={[
            `var(--cl-vote-yes)`,
            `var(--cl-vote-no)`,
            `var(--cl-vote-abstained)`,
            `var(--cl-vote-abstained)`,
          ]}
        />
        <div
          style={{
            padding: "1rem 0",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              width: "9px",
              height: "9px",
              backgroundColor: "var(--cl-vote-yes)",
              border: "1px solid var(--cl-black)",
              boxSizing: "unset",
              display: "inline-block",
            }}
          />{" "}
          เห็นด้วย {approve.length}
          <div
            style={{
              width: "9px",
              height: "9px",
              backgroundColor: "var(--cl-vote-no)",
              border: "1px solid var(--cl-black)",
              boxSizing: "unset",
              display: "inline-block",
              marginLeft: "15px",
            }}
          />{" "}
          ไม่เห็นด้วย {disprove.length}
          <div
            style={{
              width: "9px",
              height: "9px",
              backgroundColor: "var(--cl-vote-abstained)",
              border: "1px solid var(--cl-black)",
              boxSizing: "unset",
              display: "inline-block",
              marginLeft: "15px",
            }}
          />{" "}
          งดออกเสียง {abstained.length}
          <div
            style={{
              width: "9px",
              height: "9px",
              backgroundColor: "var(--cl-white)",
              border: "1px solid var(--cl-black)",
              boxSizing: "unset",
              display: "inline-block",
              marginLeft: "15px",
            }}
          />{" "}
          ไม่ลงคะแนน {absent.length}
        </div>
      </section>
      <section
        css={css`
          font-size: 2rem;
        `}
      >
        <h1>เนื้อหา</h1>
        <p>{votelogYaml.description_th}</p>
        <p
          css={css`
            font-weight: bold;
            padding-top: 2em;
          `}
        >
          อ้างอิง
        </p>
        <ExternalLink
          href={votelogYaml.reference}
          css={css`
            :hover {
              color: var(--cl-black);
            }
          `}
        >
          <p>{votelogYaml.reference}</p>
        </ExternalLink>
        <p
          css={css`
            font-weight: bold;
            padding-top: 2em;
          `}
        >
          เอกสารการลงมติ
        </p>
        <button
          css={css`
            display: flex;
            flex-flow: row wrap;
            padding: 0;
            border: none;
            background: none;
            width: 100%;
            border-radius: 5px;
            pointer-events: none;
            &:focus {
              outline: none;
            }
            text-align: left;
          `}
        >
          {votelogYaml.document.map(doc => (
            <ExternalLink
              key={doc.link}
              href={doc.link}
              css={css`
                color: var(--cl-black);
                :hover {
                  color: var(--cl-black);
                }
              `}
            >
              <span
                css={css`
                  font-size: 1.8rem;
                  line-height: 3rem;
                  cursor: pointer;
                  border-radius: 5px;
                  padding: 1rem 1rem;
                  margin-right: 1rem;
                  margin-bottom: 1rem;
                  display: block;
                  background-color: var(--cl-pink);
                  pointer-events: auto;
                `}
              >
                {doc.title}
              </span>
            </ExternalLink>
          ))}
        </button>
      </section>
      <VoterList data={[approve, disprove, abstained, absent]} />
    </Layout>
  )
}

export default VotelogPage
