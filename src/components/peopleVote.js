import React, { Component } from "react"

import { css } from "@emotion/core"
import _ from "lodash"

const cssSection = { paddingBottom: "8rem" }
const cssSectionWhite = {
  ...cssSection,
  background: "var(--cl-white)",
}

const filterChoice = [
  { text: "ทั้งหมด", choice: 0 },
  { text: "เห็นด้วย", choice: 1 },
  { text: "ไม่เห็นด้วย", choice: 2 },
  { text: "งดออกเสียง", choice: 3 },
  { text: "ไม่เข้าประชุม", choice: 4 },
]

const voteColor = {
  "1": "#2dc453",
  "2": "#ef314b",
  "3": "grey",
  "4": "#272727",
  "": "-",
}

const voteText = {
  "1": "เห็นด้วย",
  "2": "ไม่เห็นด้วย",
  "3": "งดออกเสียง",
  "4": "ไม่เข้าประชุม",
  "": "-",
}

class PeopleVote extends Component {
  state = {
    allVote: this.props.allVote,
    activeFilter: 0,
  }

  handleFilter = choice => {
    let allVote = this.props.allVote
    if (choice === 0) {
      this.setState({ allVote, activeFilter: choice })
    } else {
      allVote = _.filter(allVote, function(o) {
        return o["choice"] === String(choice)
      })
      this.setState({ allVote, activeFilter: choice })
    }
  }

  render() {
    const { allVote, activeFilter } = this.state
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
            {filterChoice.map(({ text, choice }) => (
              <li
                key={choice}
                onClick={() => this.handleFilter(choice)}
                css={
                  activeFilter === choice
                    ? css`
                        color: ${voteColor[choice]};
                        border-bottom: 3px ${voteColor[choice]} solid;
                        font-weight: 600;
                      `
                    : null
                }
              >
                {text}
              </li>
            ))}
          </ul>
          {allVote.map(({ choice, title, legal_title, vote_date }) => (
            <div
              key={title}
              css={css`
                padding: 0.5rem 2rem;
                font-size: 24px;
                border-radius: 10px;
                border: 1px solid black;
                border-left: 15px solid ${voteColor[choice]};
                margin: 20px 0px;
              `}
            >
              <div
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
              </div>
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
          ))}
        </div>
      </section>
    )
  }
}

export default ({ peopleVoteYaml, allVotelogYaml }) => {
  const voteLogs = peopleVoteYaml.votelog
  const allVote = allVotelogYaml.nodes
  // merge allVote and voteLog into allVote
  allVote.forEach(vote => {
    const matchedVotelog = _.find(voteLogs, ["key", vote.id])
    if (matchedVotelog) {
      vote.choice = matchedVotelog.value
    }
  })

  const sortedAllVotes = allVote.sort( (a, b) => {
    return b.vote_date.localeCompare(a.vote_date)
  })

  return <PeopleVote allVote={sortedAllVotes}/>
}
