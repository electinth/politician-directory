import React, { Component } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import { media } from "../styles"

class ListCard extends Component {
  state = {
    voter: this.props.voter,
    hidden: true,
    check: this.props.check,
  }
  render() {
    return (
      <div
        css={{
          width: "100%",
          minHeight: this.props.check ? "unset" : "500",
          borderRadius: 10,
          overflow: "hidden",

          [media(767)]: {
            width: "calc(50% - 2rem)",
            ":nth-child(odd)": {
              marginRight: "2rem",
            },
          },
        }}
      >
        <h2
          style={{
            fontSize: !this.props.check ? "2.5rem" : "3.2rem",
            marginTop: !this.props.check ? "0" : "2.6rem",
            padding: !this.props.check ? "1rem 3rem" : "1rem 0 2rem 0",
          }}
        >{`${this.props.choice} (${this.state.voter.length})`}</h2>
        {this.state.voter.length > 0 ? (
          <ul
            css={css`
              position: relative;
            `}
            style={{
              minHeight: !this.props.check ? "518px" : "285px",
              marginBottom: !this.props.check ? "10rem" : "1rem",
              marginLeft: !this.props.check ? "1.44rem" : "0",
            }}
          >
            {this.state.voter
              .sort((a, b) => a.name.localeCompare(b.name, "th"))
              .map((member, idx) => (
                <li
                  key={member.fields.slug}
                  css={css`
                    display: ${this.state.hidden && idx > 7 ? "none" : "block"};
                  `}
                  style={{
                    fontSize: !this.props.check ? "2rem" : "1.8rem",
                    margin: !this.props.check ? "2rem 2rem" : "0.5rem 2rem",
                  }}
                >
                  <Link
                    to={member.fields.slug}
                    css={css`
                      color: var(--cl-black);
                    `}
                    style={{
                      fontWeight: !this.props.check ? "bold" : "normal",
                    }}
                  >
                    <span>{idx + 1}.&nbsp;</span>
                    {member.title} {member.name} {member.lastname}
                  </Link>
                  {!this.props.check && (
                    <p>{member.is_senator ? "สมาชิกวุฒิสภา" : member.party}</p>
                  )}
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
                type="button"
                onClick={() => this.setState({ hidden: !this.state.hidden })}
              >
                <span
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
        ) : (
          <div
            css={{
              fontSize: "2rem",
              margin: "6rem 0",
              textAlign: "center",
            }}
          >
            ไม่มีคะแนนเลือกมติประเภทนี้
          </div>
        )}
      </div>
    )
  }
}

export default function VoterList({ data, page }) {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <ListCard voter={data[0]} check={page} choice="เห็นด้วย" />
      <ListCard voter={data[1]} check={page} choice="ไม่เห็นด้วย" />
      <ListCard voter={data[2]} check={page} choice="งดออกเสียง" />
      <ListCard
        voter={data[3]}
        check={page}
        choice={data.length === 5 ? "ไม่ลงมติ" : "ไม่ลงคะแนน"}
      />
      {data.length === 5 && (
        <ListCard voter={data[4]} check={page} choice="ขาด" />
      )}
    </div>
  )
}
