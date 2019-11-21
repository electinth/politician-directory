import React from "react"

const cssGridCell = {
  width: 8,
  height: 8,
  backgroundColor: "var(--cl-white)",
  border: "1px solid var(--cl-black)",
  boxSizing: "border-box",
  display: "inline-block",
}

const VoteLogLegend = ({ approve, disprove, abstained, absent }) => (
  <div>
    <span css={{ marginRight: "1rem" }}>
      <div
        css={cssGridCell}
        style={{
          backgroundColor: "var(--cl-vote-yes)",
          border: "1px solid var(--cl-vote-yes)",
        }}
      />{" "}
      เห็นด้วย {approve}
    </span>
    <span css={{ marginRight: "1rem" }}>
      <div
        css={cssGridCell}
        style={{
          backgroundColor: "var(--cl-vote-no)",
          border: "1px solid var(--cl-vote-no)",
        }}
      />{" "}
      ไม่เห็นด้วย {disprove}
    </span>
    <span css={{ marginRight: "1rem" }}>
      <div
        css={cssGridCell}
        style={{
          backgroundColor: "var(--cl-vote-abstained)",
          border: "1px solid var(--cl-vote-abstained)",
        }}
      />{" "}
      งดออกเสียง {abstained}
    </span>
    <span css={{ marginRight: "1rem" }}>
      <div
        css={cssGridCell}
        style={{
          backgroundColor: "var(--cl-absent)",
          border: "1px solid var(--cl-black)",
        }}
      />{" "}
      ไม่ลงคะแนน {absent}
    </span>
  </div>
)

export default VoteLogLegend
