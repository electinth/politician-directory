import React from "react"
import { Global, css } from "@emotion/core";

const cssGridCell = ({ missing }) => ({
  width: missing ? 15 : 8 ,
  height: missing ? 15 : 8 ,
  backgroundColor: "var(--cl-white)",
  border: "1px solid var(--cl-black)",
  boxSizing: "border-box",
  display: "inline-block"
})
const cssLegendWrap = ({ missing }) => ({
  marginRight: missing ? "1.5rem" : "1rem",
  display: missing ? "flex" : "unset",
  alignItems: missing ? "center" : "none",
})
const VoteLogLegend = ({ approve, disprove, abstained, absent, missing }) => {
  return (
  <div style={{display: "flex"}}>
    <span css={cssLegendWrap({missing})}>
      <div
        css={cssGridCell({missing})}
        style={{
          backgroundColor: "var(--cl-vote-yes)",
          border: "1px solid var(--cl-vote-yes)",
        }}
      />{" "}
      { missing ? <><b style={{margin: "0 1rem"}}>เห็นด้วย</b> {approve}</> : `เห็นด้วย ${approve}`}
    </span>
    <span css={cssLegendWrap({missing})}>
      <div
        css={cssGridCell({missing})}
        style={{
          backgroundColor: "var(--cl-vote-no)",
          border: "1px solid var(--cl-vote-no)",
        }}
      />{" "}
      { missing ? <><b style={{margin: "0 1rem"}}>ไม่เห็นด้วย</b> {disprove}</> : `ไม่เห็นด้วย ${disprove}`}
    </span>
    <span css={cssLegendWrap({missing})}>
      <div
        css={cssGridCell({missing})}
        style={{ 
          backgroundColor: missing 
          ? "var(--cl-senate-vote-abstained)" : "var(--cl-vote-abstained)",
          border: missing 
          ? "1px solid var(--cl-senate-vote-abstained)" : "1px solid var(--cl-vote-abstained)"
        }}
      />{" "}
      { missing ? <><b style={{margin: "0 1rem"}}>งดออกเสียง</b> {abstained}</> : `งดออกเสียง ${abstained}`}
    </span>
    <span css={cssLegendWrap({missing})}>
      <div
        css={cssGridCell({missing})}
        style={{ 
          backgroundColor: missing 
          ? "var(--cl-senate-vote-absent)" : "var(--cl-missing)",
          border: missing 
          ? "1px solid var(--cl-senate-vote-absent)" : "1px solid var(--cl-black)"
        }}
      />{" "}
      { missing ? <><b style={{margin: "0 1rem"}}>ไม่ลงมติ</b> {absent}</> : `ไม่ลงคะแนน ${absent}`}
    </span>
    { missing && (
      <span 
        css={cssLegendWrap({missing})}>
      <div
        css={cssGridCell({missing})}
        style={{
          backgroundColor: "var(--cl-senate-vote-missing)",
          border: "1px solid var(--cl-senate-vote-missing)",
        }}
      />{" "}
        <><b style={{margin: "0 1rem"}}>ขาด</b> {missing}</>
      </span>
    )}
  </div>
  )
}

export default VoteLogLegend
