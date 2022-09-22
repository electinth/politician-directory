import React, { useState, useEffect } from "react"
import { media } from "../../styles"

const cssContainer = {
  display: "flex",
  justifyContent: "space-between",
  padding: "25px 22px",
  [media(767)]: {
    padding: "81px 43px 0 57px",
  },
}
const cssTitle = {
  fontFamily: "var(--ff-title)",
  fontSize: "3.2rem",
  lineHeight: 1.2,
  fontWeight: 800,
  marginBottom: "50px",
  [media(767)]: {
    fontSize: "4.8rem",
  },
}
const cssBtn = ({ active }) => ({
  backgroundColor: "white",
  fontSize: "1.4rem",
  color: active ? "black" : "#b3b3b3",
  border: active ? "2px solid black" : "2px solid #b3b3b3",
  borderRadius: "50px",
  width: "88%",
  margin: "0 auto 5px auto",
  height: "40px",
  outline: "none",
  "&:hover": {
    color: "black",
    border: "2px solid black",
    cursor: "pointer",
  },
  [media(767)]: {
    fontSize: "1.8rem",
    width: "180px",
  },
})
const cssVoteBoxWrap = {
  display: "flex",
  flexDirection: "column",
  [media(767)]: {
    flexDirection: "row",
  },
}
const cssVoteBox = {
  width: "151px",
  height: "80px",
  fontSize: "1.4rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [media(767)]: {
    width: "164px",
    height: "145px",
    fontSize: "1.8rem",
  },
}
const cssVoteNo = {
  fontFamily: "var(--ff-title)",
  fontSize: "3.2rem",
  transform: "translateY(-0.5rem)",
  [media(767)]: {
    fontSize: "4.8rem",
    transform: "unset",
  },
}
const cssDesktop = {
  display: "none",
  [media(767)]: {
    display: "block",
  },
}
const cssMobile = {
  display: "flex",
  flexDirection: "column",
  [media(767)]: {
    display: "none",
  },
}

const VoteResultsHeader = ({
  setIsShowAll,
  setPopupState,
  allSenateVotelogYaml,
}) => {
  const [viewPerson, setViewPerson] = useState(true)
  const [viewGroup, setViewGroup] = useState(false)
  const [motionPass, setMotionPass] = useState(0)
  const [motionFail, setMotionFail] = useState(0)

  useEffect(() => {
    let pass = allSenateVotelogYaml.nodes.filter(item => {
      return item.is_active === true
    })
    pass = pass.length
    const fail = allSenateVotelogYaml.nodes.length - pass
    setMotionPass(pass)
    setMotionFail(fail)
  }, [])

  const clickBtnViewPerson = () => {
    setViewPerson(true)
    setViewGroup(false)
    setIsShowAll(true)
    setPopupState(false)
  }
  const clickBtnViewGroup = () => {
    setViewPerson(false)
    setViewGroup(true)
    setIsShowAll(false)
    setPopupState(false)
  }

  return (
    <div>
      <div css={cssContainer}>
        <div>
          <div css={[cssTitle, cssDesktop]}>ผลการลงมติ</div>
          <div css={[cssTitle, cssMobile]}>
            ผลการ
            <br />
            ลงมติ
          </div>
          <div css={cssDesktop}>
            <button
              css={cssBtn({ active: viewPerson })}
              style={{
                marginRight: "5px",
              }}
              onClick={clickBtnViewPerson}
            >
              ดูรายคน
            </button>
            <button
              css={cssBtn({ active: viewGroup })}
              onClick={clickBtnViewGroup}
            >
              ดูแยกประเภท ส.ว.
            </button>
          </div>
        </div>
        <div css={cssVoteBoxWrap}>
          <div css={cssVoteBox} style={{ background: "var(--cl-vote-yes)" }}>
            มติผ่าน
            <div css={cssVoteNo}>{motionPass}</div>
          </div>
          <div css={cssVoteBox} style={{ background: "var(--cl-vote-no)" }}>
            มติไม่ผ่าน
            <div css={cssVoteNo}>{motionFail}</div>
          </div>
        </div>
      </div>
      <div css={cssMobile}>
        <button
          css={cssBtn({ active: viewPerson })}
          onClick={clickBtnViewPerson}
        >
          ดูรายคน
        </button>
        <button
          css={cssBtn({ active: viewGroup })}
          onClick={clickBtnViewGroup}
          style={{ marginBottom: "25px" }}
        >
          ดูแยกประเภท ส.ว.
        </button>
      </div>
    </div>
  )
}

export default VoteResultsHeader
