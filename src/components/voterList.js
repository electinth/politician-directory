import React, { Component } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { css } from "@emotion/core"
import _ from "lodash"

const filterVote = (combined, key, value) =>
  _.filter(combined, o => {
    return _.find(o.votelog, p => p.key === key).value === value
  })

class ListCard extends Component {
  state = {
    voter: this.props.voter,
    hidden: true,
  }
  render() {
    return (
      <div
        css={css`
          width: calc(50% - 2rem);
          min-height: 500px;
          border-radius: 10px;
          overflow: hidden;
          :nth-child(odd) {
            margin-right: 2rem;
          }
        `}
      >
        <h2
          css={css`
            padding: 1rem 3rem;
            font-size: 2.5rem;
          `}
        >{`${this.props.choice} (${this.state.voter.length})`}</h2>
        <ul
          css={css`
            min-height: 518px;
            position: relative;
            margin-bottom: 10rem;
          `}
        >
          {this.state.voter
            .sort((a, b) => a.name.localeCompare(b.name, "th"))
            .map((member, idx) => (
              <li
                css={css`
                  font-size: 2rem;
                  display: ${this.state.hidden && idx > 7 ? "none" : "block"};
                  margin: 2rem 2rem;
                `}
              >
                <Link to={member.fields.slug}>
                  <a
                    css={css`
                      font-weight: bold;
                      color: var(--cl-black);
                    `}
                  >
                    {member.name} {member.lastname}
                  </a>
                </Link>

                <p>{member.is_senator ? "สมาชิกวุฒิสภา" : member.party}</p>
              </li>
            ))}
          {this.state.hidden && this.props.voter.length > 8 ? (
            <button
              css={css`
                display: flex;
                padding: 0;
                border: none;
                background: none;
                width: 100%;
                padding-top: 20rem;
                background: transparent
                  linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, 0.5)
                  );
                border-radius: 10px;
                position: absolute;
                bottom: -2rem;
                pointer-events: none;
                &:focus {
                  outline: none;
                }
              `}
            >
              <span
                onClick={() => this.setState({ hidden: !this.state.hidden })}
                css={css`
                  font-family: var(--ff-title);
                  font-size: 2.4rem;
                  line-height: 3rem;
                  cursor: pointer;
                  border: 0.2rem solid black;
                  border-radius: 5px;
                  padding: 1rem 6rem;
                  display: block;
                  margin: 2rem auto;
                  background-color: white;
                  pointer-events: auto;
                `}
              >
                ดูทั้งหมด
              </span>
            </button>
          ) : (
            ""
          )}
        </ul>
      </div>
    )
  }
}

export default ({ votelogKey }) => {
  const data = useStaticQuery(graphql`
    query {
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
  `)
  let combined = []
  data.allPeopleVoteYaml.nodes.forEach(votelog => {
    const matched = _.find(data.allPeopleYaml.nodes, ["id", votelog.id])
    combined.push({ ...votelog, ...matched })
  })
  const agree = filterVote(combined, votelogKey, "1")
  const disagree = filterVote(combined, votelogKey, "2")
  const abstention = filterVote(combined, votelogKey, "3")
  const absent = filterVote(combined, votelogKey, "4")

  return (
    <section>
      <div className="container">
        <h1>บันทึกคะแนนเสียง</h1>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          <ListCard voter={agree} choice="เห็นด้วย" />
          <ListCard voter={disagree} choice="ไม่เห็นด้วย" />
          <ListCard voter={abstention} choice="งดออกเสียง" />
          <ListCard voter={absent} choice="ไม่เข้าร่วมประชุม" />
        </div>
      </div>
    </section>
  )
}
