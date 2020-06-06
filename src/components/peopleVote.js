import React, { Component } from "react"
import { Link } from "gatsby"
import _ from "lodash"

import { formatDate } from "../utils"

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
  { text: "ไม่ลงคะแนน", choice: 4 },
]

const voteColor = {
  "1": "var(--cl-vote-yes)",
  "2": "var(--cl-vote-no)",
  "3": "var(--cl-vote-abstained)",
  "4": "#272727",
  "": "-",
}

const voteText = {
  "1": "เห็นด้วย",
  "2": "ไม่เห็นด้วย",
  "3": "งดออกเสียง",
  "4": "ไม่ลงคะแนน",
  "": "-",
}

const PeopleVoteCard = ({ choice, fields, title, legal_title, vote_date }) => (
  <Link
    to={fields.slug}
    css={{
      display: "block",
      color: "var(--cl-black)",
      padding: "0.5rem 2rem",
      fontSize: "2.4rem",
      borderRadius: 4,
      border: "1px solid black",
      borderLeft: `1rem solid ${voteColor[choice]}`,
      margin: "20px 0px",
      "&:hover": {
        textDecoration: "none",
      },
    }}
  >
    <div
      css={{
        color: choice === "3" ? "var(--cl-black)" : voteColor[choice],
        margin: "15px 0px",
        fontSize: "2.4rem",
      }}
    >
      <div
        css={{
          display: "inline-block",
          height: 15,
          width: 15,
          marginRight: 10,
          backgroundColor: voteColor[choice],
        }}
      ></div>
      {voteText[choice]}
    </div>
    <p css={{ fontFamily: "var(--ff-title)", fontSize: "2.4rem" }}>{title}</p>
    <p css={{ fontSize: "1.5rem", margin: "15px 0px" }}>
      {formatDate(vote_date)}
    </p>
  </Link>
)

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
          paddingTop: "6rem",
        }}
      >
        <div className="container">
          <h2
            css={{
              fontSize: "4.8rem",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            สรุปการลงมติในสภา
          </h2>
          <ul
            css={{
              display: "block",
              listStyle: "none",
              textAlign: "center",
              "> li": {
                display: "inline-block",
                fontSize: "2.4rem",
                padding: "1rem 0 0",
                margin: "0 1rem",
                cursor: "pointer",
                "&.active": {
                  borderBottom: "8px solid var(--cl-black)",
                },
              },
            }}
          >
            {filterChoice.map(({ text, choice }) => (
              <li
                key={choice}
                className={activeFilter === choice ? "active" : ""}
                onClick={() => this.handleFilter(choice)}
                style={
                  activeFilter === choice
                    ? {
                        borderBottomColor: voteColor[choice],
                      }
                    : null
                }
              >
                {text}
              </li>
            ))}
          </ul>
          {allVote.length > 0 ? (
            allVote.map(vote => (
              <PeopleVoteCard key={vote.id} {...vote}></PeopleVoteCard>
            ))
          ) : (
            <div
              css={{
                fontFamily: "var(--ff-title)",
                fontSize: "3.2rem",
                textAlign: "center",
                margin: "6rem 0",
              }}
            >
              ยังไม่เคยลงมติประเภทนี้
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default ({ peopleVoteYaml, allVotelogYaml }) => {
  const voteLogs = peopleVoteYaml.votelog || []
  const allVotes = [...allVotelogYaml.nodes]
  // merge allVote and voteLog into allVote
  allVotes.forEach(vote => {
    const matchedVotelog = _.find(voteLogs, ["key", vote.id])
    if (matchedVotelog) {
      vote.choice = matchedVotelog.value
    }
  })
  const sortedAllVotes = allVotes
    .filter(vote => vote.choice)
    .sort((a, b) => {
      return b.vote_date.localeCompare(a.vote_date)
    })

  return <PeopleVote allVote={sortedAllVotes} />
}
