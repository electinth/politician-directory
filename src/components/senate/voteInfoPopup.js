import React, { useEffect } from "react"
import Waffle from "../waffle"
import VoteLogLegend from "../voteLogLegend"
import VoterList from "../voterList"
import download from "../../images/icons/download/download.png"
import _ from "lodash"
import { media } from "../../styles"

const cssPopupContainer = {
  position: "fixed",
  width: "100vw",
  height: "100%",
  background: "white",
  borderLeft: "2px solid #B9B9B9",
  padding: "46px 20px 30px",
  zIndex: "700",
  overflowY: "auto",
  [media(767)]: {
    minWidth: "640px",
    width: "50vw",
    right: "0",
  },
}
const cssCloseBtn = {
  position: "absolute",
  top: "6px",
  right: "6px",
  width: "21px",
  height: "21px",
  cursor: "pointer",
  opacity: "0.3",
  "&:hover": {
    opacity: "1",
  },
  "&:before, &:after": {
    position: "absolute",
    top: "4px",
    right: "12px",
    content: '""',
    height: "21px",
    width: "2px",
    backgroundColor: "#333",
  },
  "&:before": {
    transform: "rotate(45deg)",
  },
  "&:after": {
    transform: "rotate(-45deg)",
  },
}
const cssHeader = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "3px solid #222222",
  paddingBottom: "12px",
}
const cssSectionWaffle = {
  paddingTop: "3rem",
  paddingBottom: "3rem",
}
const cssDot = {
  margin: "0 1rem",
  height: "1.5rem",
  width: "1.5rem",
  display: "inline-block",
  borderRadius: "50%",
}
const cssVoteTitle = {
  fontFamily: "var(--ff-title)",
  fontSize: "3.2rem",
  lineHeight: "1.2",
  paddingTop: "23px",
}
const cssVoteStatus = {
  paddingTop: "37px",
  borderBottom: "3px solid #222222",
  paddingBottom: "10px",
  display: "flex",
}
const cssSubTitle = {
  fontSize: "1.8rem",
  lineHeight: "1.2",
  padding: "1.4rem 0",
  borderTop: "3px solid #222222",
}
const cssSubstance = {
  fontSize: "1.8rem",
  lineHeight: "1.4",
}
const cssVotingDocs = {
  fontSize: "1.2rem",
  paddingTop: "2.2rem",
  paddingBottom: "2rem",
}
const cssVotingSheetBtnWrap = {
  flexDirection: "column",
  [media(767)]: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "3.6rem",
  },
}
const cssVotingSheetBtn = {
  fontSize: "1.2rem",
  color: "black",
  background: "#EEF090",
  borderRadius: "5px",
  width: "90%",
  padding: "1rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1.2rem",
  [media(767)]: {
    fontSize: "1.8rem",
    width: "fit-content",
  },
}

const VoteInfoPopup = ({
  popupState,
  setPopupState,
  votelogInfo,
  allSenateVoteYaml,
  allPeopleYaml,
}) => {
  useEffect(() => {
    setPopupState(popupState)
  }, [setPopupState])

  const filterVote = (combined, key, value) =>
    _.filter(combined, o => {
      return (
        _.get(
          _.find(o.votelog || [], p => p.key === key),
          "value"
        ) === value
      )
    })

  const handleClose = () => {
    setPopupState(false)
  }

  let combined = []
  allSenateVoteYaml.nodes.forEach(votelog => {
    const matched = _.find(allPeopleYaml.nodes, ["id", votelog.id])
    combined.push({ ...votelog, ...matched })
  })

  const approve = filterVote(combined, votelogInfo.id, "1")
  const disprove = filterVote(combined, votelogInfo.id, "2")
  const abstained = filterVote(combined, votelogInfo.id, "3")
  const absent = filterVote(combined, votelogInfo.id, "4")
  const missing = filterVote(combined, votelogInfo.id, "5")

  const countVotelog = {
    approve: approve.length,
    disprove: disprove.length,
    abstained: abstained.length,
    absent: absent.length,
    missing: missing.length,
  }

  return (
    <div>
      {popupState && (
        <div css={cssPopupContainer} className="cssPopupScrollbar">
          <div onClick={handleClose} css={cssCloseBtn} />

          <section css={cssHeader}>
            <div>ประชุม ส.ว.</div>
            <div>{votelogInfo.vote_date}</div>
          </section>

          <section>
            <div css={cssVoteTitle}>{votelogInfo.title}</div>
            <div css={cssVoteStatus}>
              สถานะ{" "}
              {votelogInfo.is_active ? (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span
                    css={cssDot}
                    style={{
                      backgroundColor: "var(--cl-vote-yes)",
                    }}
                  />
                  <b>ผ่าน</b>
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <div
                    css={cssDot}
                    style={{
                      backgroundColor: "var(--cl-vote-no)",
                    }}
                  />
                  <b>ไม่ผ่าน</b>
                </span>
              )}
            </div>
          </section>

          <section
            css={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              ...cssSectionWaffle,
            }}
          >
            {/* <Waffle
              style={{ width: "100%" }}
              data={[
                approve.map(p => ({ node: p })),
                disprove.map(p => ({ node: p })),
                abstained.map(p => ({ node: p })),
                absent.map(p => ({ node: p })),
                missing.map(p => ({ node: p })),
              ]}
              colors={[
                `var(--cl-vote-yes)`,
                `var(--cl-vote-no)`,
                `var(--cl-senate-vote-abstained)`,
                `var(--cl-senate-vote-absent)`,
                `var(--cl-senate-vote-missing)`,
              ]}
              borderColors={[
                `var(--cl-vote-yes)`,
                `var(--cl-vote-no)`,
                `var(--cl-senate-vote-abstained)`,
                `var(--cl-senate-vote-absent)`,
                `var(--cl-senate-vote-missing)`,
              ]}
            /> */}
            <div css={{ marginTop: "4rem" }}>
              <VoteLogLegend type="popup" {...countVotelog} />
            </div>
          </section>

          <section>
            <div css={cssSubTitle}>
              <b>เนื้อหา</b>
            </div>
            <div css={cssSubstance}>{votelogInfo.description_th}</div>
            <div css={cssVotingDocs}>
              <b>เอกสารการลงมติ</b>
            </div>
            <div css={cssVotingSheetBtnWrap}>
              {votelogInfo.document instanceof Array &&
                votelogInfo.document.map(
                  item =>
                    item.link && (
                      <a
                        href={item.link}
                        key={item.link}
                        target="_blank"
                        download
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          css={cssVotingSheetBtn}
                          style={{ marginRight: "20px" }}
                        >
                          <img
                            src={download}
                            style={{
                              marginBottom: "0",
                              marginRight: "14px",
                              width: "20px",
                            }}
                          />
                          <b>{item.title}</b>
                        </div>
                      </a>
                    )
                )}
            </div>
          </section>

          <section>
            <div css={cssSubTitle}>
              <b>บันทึกคะแนนเสียง</b>
              <VoterList
                data={[approve, disprove, abstained, absent, missing]}
                page={"senateVoteResult"}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default VoteInfoPopup
