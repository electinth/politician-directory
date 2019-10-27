import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import { css, cx } from "@emotion/core"

const PeopleVote = ({ voteLog }) => {
  const data = useStaticQuery(graphql`
    query {
      allVotelogYaml {
        nodes {
          id
          title
          legal_title
          vote_date
        }
      }
    }
  `)

  const voteText = {
    "1": "เห็นด้วย",
    "2": "ไม่เห็นด้วย",
    "3": "งดออกเสียง",
    "4": "ไม่เข้าประชุม",
    "-": "-",
  }

  const voteColor = {
    "1": "#2dc453",
    "2": "#ef314b",
    "3": "grey",
    "4": "#272727",
    "-": "-",
  }

  return (
    <>
      {data.allVotelogYaml.nodes.map(
        ({ id, title, legal_title, vote_date }) => (
          <div
            css={css`
              padding: 0.5rem 2rem;
              font-size: 24px;
              border-radius: 10px;
              border: 1px solid black;
              border-left: 15px solid ${voteColor[voteLog[`_${id}`]]};
              margin: 20px 0px;
            `}
          >
            <p
              css={css`
                color: ${voteColor[voteLog[`_${id}`]]};
                margin: 15px 0px;
              `}
            >
              <div
                css={css`
                  display: inline-block;
                  height: 15px;
                  width: 15px;
                  margin-right: 10px;
                  background-color: ${voteColor[voteLog[`_${id}`]]};
                `}
              ></div>
              {voteText[voteLog[`_${id}`]]}
            </p>
            <p>{title}</p>
            <p
              css={css`
                font-size: 2rem;
              `}
            >
              {legal_title}
            </p>
            <p
              css={css`
                font-size: 1.5rem;
                margin: 15 px 0px;
              `}
            >
              {vote_date}
            </p>
          </div>
        )
      )}
    </>
  )
}

export default PeopleVote
