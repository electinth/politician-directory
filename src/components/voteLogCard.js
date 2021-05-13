import React from "react"
import dayjs from "dayjs"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import VoteLogLegend from "./voteLogLegend"

import "../styles/global.css"

const VoteLogCard = votelog => {
  const {
    className,
    title,
    description_th,
    approve,
    disprove,
    abstained,
    absent,
    vote_date,
    slug,
    isCompact = false,
  } = votelog
  let { passed } = votelog

  const totalVoter = approve + disprove + abstained + absent

  const resultColor = passed ? "var(--cl-vote-yes)" : "var(--cl-vote-no)"
  const approveBar = (approve * 100) / totalVoter + "%"
  const disproveBar = (disprove * 100) / totalVoter + "%"
  const abstainedBar = (abstained * 100) / totalVoter + "%"
  const absentBar = (absent * 100) / totalVoter + "%"

  return (
    <div
      className={className}
      css={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        minWidth: 300,
        height: !isCompact ? 450 : 370,
        minHeight: !isCompact ? 450 : 370,
        padding: "2rem",
        border: "2px solid var(--cl-black)",
        borderRadius: "10px",
        backgroundColor: "var(--cl-white)",
        color: "var(--cl-black)",
        position: "relative",
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
            borderRight: "1px solid var(--cl-black)",
            boxSizing: "unset",
          }}
        />
        <div
          style={{
            width: absentBar,
            height: "100%",
            backgroundColor: "var(--cl-white)",
            boxSizing: "unset",
          }}
        />
      </div>
      <h4
        css={{
          fontSize: "4.8rem",
          color: "var(--cl-black)",
          textAlign: "left",
          marginTop: "2rem",
        }}
      >
        {totalVoter > 0 ? Math.round((approve / totalVoter) * 100) : 0}%
        เห็นด้วย
      </h4>
      <Link
        to={slug}
        css={css`
          :hover {
            color: var(--cl-black);
          }
        `}
      >
        <h5
          style={{
            fontSize: "2.4rem",
            paddingTop: "1rem",
            lineHeight: "3rem",
          }}
        >
          {title}
        </h5>
      </Link>
      {!isCompact ? (
        <p
          style={{
            paddingTop: "1rem",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {description_th}
        </p>
      ) : null}

      <div
        style={{
          position: "absolute",
          bottom: "1rem",
        }}
      >
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
        <div
          style={{
            padding: "1rem 0",
            fontSize: "14px",
          }}
        >
          <VoteLogLegend {...votelog} />
        </div>
        <h6 style={{ fontSize: "2rem" }}>
          {dayjs(vote_date).format("D.M.YYYY")}
        </h6>
      </div>
    </div>
  )
}
export default VoteLogCard
