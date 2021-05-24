import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { css } from "@emotion/react"
import _ from "lodash"

import ExternalLink from "../components/externalLink"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VoterList from "../components/voterList"
import Waffle from "../components/waffle"
import VoteLogLegend from "../components/voteLogLegend"
import { media } from "../styles"

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
      is_no_vote
      no_vote_description
      approve
      disprove
      abstained
      absent
      total_voter
    }

    voteRecordIcon: file(
      relativePath: { eq: "images/icons/votelog/votelog.png" }
    ) {
      childImageSharp {
        fixed(height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    downloadIcon: file(
      relativePath: { eq: "images/icons/download/download.png" }
    ) {
      childImageSharp {
        fixed(height: 20) {
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
        fields {
          slug
        }
        is_mp
        is_senator
        is_cabinet
        mp_type
        mp_list
        mp_province
        mp_zone
        party
      }
    }
  }
`

const cssSection = {
  borderBottom: "0.5rem solid black",
  paddingTop: "3rem",
  paddingBottom: "3rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
  ".dot": {
    margin: "0 1rem",
    height: "2rem",
    width: "2rem",
    display: "inline-block",
    borderRadius: "50%",
  },
}

const filterVote = (combined, key, value) =>
  _.filter(combined, o => {
    return (
      _.get(
        _.find(o.votelog || [], p => p.key === key),
        "value"
      ) === value
    )
  })

const VotelogPage = ({
  data: {
    votelogYaml,
    voteRecordIcon,
    downloadIcon,
    allPeopleVoteYaml,
    allPeopleYaml,
  },
}) => {
  const { passed, total_voter } = votelogYaml

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
        borderRadius: "10px",
        padding: "3rem",
      }}
      css={{
        maxWidth: "calc(100% - 2rem)",
        [media(767)]: {
          width: "920px",
        },
      }}
    >
      <SEO title={votelogYaml.title} imageUrl="/seo/share/votelog.png" />
      <section
        css={{
          ...cssSection,
          paddingBottom: "1rem !important",
          span: {
            fontSize: "3rem",
          },
        }}
      >
        <div className="container">
          <span>
            <Img
              fixed={voteRecordIcon.childImageSharp.fixed}
              css={css`
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
        css={{
          ...cssSection,
          paddingBottom: "1rem !important",
          span: {
            fontSize: "3rem",
          },
        }}
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
          {passed ? (
            <span
              css={css`
                color: var(--cl-vote-yes);
              `}
            >
              <span
                className="dot"
                css={{
                  backgroundColor: "var(--cl-vote-yes)",
                }}
              ></span>
              ผ่าน
            </span>
          ) : (
            <span
              css={css`
                color: var(--cl-vote-no);
              `}
            >
              <span
                className="dot"
                css={{
                  backgroundColor: "var(--cl-vote-no)",
                }}
              ></span>
              ไม่ผ่าน
            </span>
          )}
          <span
            css={{
              display: "block",
              [media(767)]: {
                float: "right",
              },
            }}
          >
            ผู้เข้าร่วมประชุม {total_voter} คน
          </span>
        </span>
      </section>
      <section
        css={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          ...cssSection,
        }}
      >
        {votelogYaml.is_no_vote ? (
          <div
            css={css`
              font-size: 2rem;
              align-self: flex-start;
            `}
          >
            {votelogYaml.no_vote_description || "-"}
          </div>
        ) : (
          <>
            <Waffle
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
                `var(--cl-vote-absent)`,
              ]}
              borderColors={[
                `var(--cl-vote-yes)`,
                `var(--cl-vote-no)`,
                `var(--cl-vote-abstained)`,
                `var(--cl-black)`,
              ]}
            />
            <div css={{ marginTop: "4rem" }}>
              <VoteLogLegend {...votelogYaml} />
            </div>
          </>
        )}
      </section>
      <section
        css={{
          ...cssSection,
          fontSize: "2rem",
        }}
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
          {votelogYaml.document
            .filter(doc => doc.link)
            .map(doc => (
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
                    font-size: 2.4rem;
                    font-family: var(--ff-title);
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
                  <Img
                    fixed={downloadIcon.childImageSharp.fixed}
                    css={{ marginRight: "1rem" }}
                  />
                  {doc.title || "เอกสาร"}
                </span>
              </ExternalLink>
            ))}
        </button>
      </section>
      <section>
        <div className="container">
          <h1>บันทึกคะแนนเสียง</h1>
          {votelogYaml.is_no_vote ? (
            <div
              css={css`
                font-size: 2rem;
              `}
            >
              ไม่มีข้อมูลการลงคะแนนเสียง
            </div>
          ) : (
            <VoterList data={[approve, disprove, abstained, absent]} />
          )}
        </div>
      </section>
    </Layout>
  )
}

export default VotelogPage
