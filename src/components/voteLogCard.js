import React from "react"
import moment from "moment"

import { Link } from "gatsby"
import { css } from "@emotion/core"
import "../styles/global.css"

const VoteLogCard = ({
  className,
  legal_title,
  legal_title_en,
  passed,
  approve,
  disprove,
  abstained,
  absent,
  total_voter,
  vote_date,
  slug,
}) => {
  const resultColor = passed ? "green" : "red"
  const approveBar = (approve * 100) / total_voter + "%"
  const disproveBar = (disprove * 100) / total_voter + "%"
  const abstainedBar = (abstained * 100) / total_voter + "%"
  return (
    <div
      className={className}
      css={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        minWidth: 300,
        minHeight: 350,
        padding: "2rem",
        borderRadius: "10px",
        backgroundColor: "var(--cl-white)",
        color: "var(--cl-black)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "1.5rem",
          border: "1px solid var(--cl-black)",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            width: approveBar,
            height: "100%",
            backgroundColor: "var(--cl-vote-yes)",
            borderRight: "1px solid var(--cl-black)",
            boxSizing: "unset",
          }}
        />
        <div
          style={{
            width: disproveBar,
            height: "100%",
            backgroundColor: "var(--cl-vote-no)",
            borderRight: "1px solid var(--cl-black)",
            boxSizing: "unset",
          }}
        />
        <div
          style={{
            width: abstainedBar,
            height: "100%",
            backgroundColor: "var(--cl-vote-abstained)",
            boxSizing: "unset",
          }}
        />
      </div>
      <h2
        style={{
          color: "var(--cl-black)",
          textAlign: "left",
          marginTop: "2rem",
        }}
      >
        {parseInt((approve / total_voter) * 100)}% เห็นด้วย
      </h2>
      <Link
        to={slug}
        css={css`
          :hover {
            color: var(--cl-black);
          }
        `}
      >
        <h3
          style={{
            fontSize: "2.4rem",
            paddingTop: "1rem",
            lineHeight: "3rem",
          }}
        >
          {legal_title}
        </h3>
      </Link>
      <p
        style={{
          paddingTop: "1rem",
        }}
      >
        {legal_title_en}
      </p>
      <div style={{ display: "inline" }}>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: resultColor,
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        />{" "}
        <div
          style={{
            fontFamily: "var(--ff-text)",
            fontSize: "3rem",
            fontWeight: "bold",
            color: resultColor,
            display: "inline-block",
          }}
        >
          {passed ? "ผ่าน" : "ไม่ผ่าน"}
        </div>
      </div>
      <p
        style={{
          paddingTop: "1rem",
        }}
      >
        เห็นด้วย {approve} ไม่เห็นด้วย {disprove} งดออกเสียง {abstained}
      </p>
      <h3 style={{ fontSize: "2rem" }}>
        {moment(vote_date).format("D.M.YYYY")}
      </h3>
    </div>
  )
}
export default VoteLogCard
