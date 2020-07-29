import React, { useState } from 'react';
import { Link } from "gatsby";
import { media } from "../styles";

const cssHeader = {
  width: "100vw",
  height: "4rem",
  background: "#000000",
  padding: "0",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  h1: {
    fontSize: "3.2rem",
    color: "#FFFFFF",
    flex: 1,
  },
  [media(767)]: {
    marginBottom: "5.6rem",
    padding: "0 5.8rem 0 2rem",
    height: "6rem",
    justifyContent: "unset",
  }
}
const cssTitle = {
  display: "none",
  [media(767)]: {
    display: "block",
  }
}
const cssBtn = ({ active }) => ({
    border: "none",
    outline: 'none',
    cursor: "pointer",
    fontSize: "1.4rem",
    height: "4rem",
    width: "14rem",
    background: "inherit",
    color: active ? '#EEF090' : '#ffffff',
    borderBottom: active ? '0.5rem solid #EEF090' : '0.5rem solid #ffffff',
    [media(767)]: {
      fontSize: "1.8rem",
      height: "6rem",
      width: "19.5rem",
    }
})
const SenateNavbar = () => {
  const [score, setScore] = useState(true);
  const [votelog, setVotelog] = useState(false);

  const selected = (value) => {
    if (value === 'score') {
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
        <h1 css={cssTitle}>ตรวจงาน สว.</h1>
        <Link to={"/senate/score"} onClick={() => selected('score')}>
          <button css={cssBtn({ active: score })}>
            คะแนนจิตพิสัย สว.
          </button>
        </Link>
        
        <Link to={"/senate/votelog"} onClick={() => selected('votelog')}>
          <button css={cssBtn({ active: votelog })}>
            ผลการลงมติ
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SenateNavbar