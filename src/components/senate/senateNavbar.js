import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { media } from "../../styles"
import votelogIcon from "../../images/icons/votelog/votelog-white.png"

const cssHeader = {
  height: "4rem",
  background: "#000000",
  padding: "0",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  h1: {
    fontSize: "3.2rem",
    color: "#FFFFFF",
    flex: 1,
  },
  [media(767)]: {
    marginBottom: "0",
    padding: "0 5.8rem 0 2rem",
    height: "6rem",
  },
}
const cssIcon = {
  display: "block",
  height: "24px",
  margin: "0 1rem",
  [media(767)]: {
    display: "none",
  },
}
const cssTitle = {
  display: "none",
  [media(767)]: {
    display: "block",
  },
}
const cssBtn = ({ active }) => ({
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontSize: "1.4rem",
  height: "4rem",
  minWidth: "12.5rem",
  background: "inherit",
  color: active ? "#EEF090" : "#ffffff",
  borderBottom: active ? "0.5rem solid #EEF090" : "0.5rem solid #4C4C4C",
  [media(767)]: {
    fontSize: "1.8rem",
    height: "6rem",
    width: "19.5rem",
  },
})
const SenateNavbar = () => {
  const [score, setScore] = useState(false)
  const [votelog, setVotelog] = useState(false)

  useEffect(() => {
    if (window.location.pathname === "/senate/score") {
      setScore(true)
    } else if (window.location.pathname === "/senate/votelog") {
      setVotelog(true)
    }
  }, [])

  const selected = value => {
    if (value === "score") {
      setScore(true)
      setVotelog(false)
    } else {
      setVotelog(true)
      setScore(false)
    }
  }

  return (
    <div>
      <div css={cssHeader}>
        <div style={{ display: "flex" }}>
          <img css={cssIcon} src={votelogIcon} alt="" aria-hidden="true" />
          <h1 css={cssTitle}>ตรวจงาน ส.ว.</h1>
        </div>
        <div>
          <Link to={"/senate/score"} onClick={() => selected("score")}>
            <button type="button" css={cssBtn({ active: score })}>
              คะแนนจิตพิสัย ส.ว.
            </button>
          </Link>

          <Link to={"/senate/votelog"} onClick={() => selected("votelog")}>
            <button type="button" css={cssBtn({ active: votelog })}>
              ผลการลงมติ
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SenateNavbar
