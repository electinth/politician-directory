import React from "react"

import { css } from "@emotion/core"

const cssSection = { paddingBottom: "8rem" }
const cssSectionWhite = {
  ...cssSection,
  background: "var(--cl-white)",
}

const PeopleVote = ({
  allVote,
  handleFilter,
  activeFilter,
  filterChoiceState,
}) => {
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
    <section
      css={{
        ...cssSectionWhite,
      }}
    >
      <div className="container">
        <h2
          css={{
            fontSize: "4.8rem",
            textAlign: "center",
          }}
        >
          สรุปการลงมติในสภา
        </h2>
        <ul
          css={css`
            list-style: none;
            text-align: center;
            li {
              display: inline-block;
              margin: 10px;
              cursor: pointer;
              font-size: 2.5rem;
            }
          `}
        >
          {filterChoiceState.map(({ name, choice }) => (
            <li
              onClick={() => handleFilter(choice)}
              css={
                String(activeFilter) === choice
                  ? css`
                      color: ${voteColor[choice]};
                      border-bottom: 3px ${voteColor[choice]} solid;
                      font-weight: 600;
                    `
                  : null
              }
            >
              {name}
            </li>
          ))}
        </ul>
        {console.log(allVote)}
        {allVote.map(({ choice, title, legal_title, vote_date }) => (
          <div
            css={css`
              padding: 0.5rem 2rem;
              font-size: 24px;
              border-radius: 10px;
              border: 1px solid black;
              border-left: 15px solid ${voteColor[choice]};
              margin: 20px 0px;
            `}
          >
            <p
              css={css`
                color: ${voteColor[choice]};
                margin: 15px 0px;
              `}
            >
              <div
                css={css`
                  display: inline-block;
                  height: 15px;
                  width: 15px;
                  margin-right: 10px;
                  background-color: ${voteColor[choice]};
                `}
              ></div>
              {voteText[choice]}
            </p>
            <p>{title}</p>
            <h6>{choice}</h6>
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
        ))}
      </div>
    </section>
  )
}

export default PeopleVote
