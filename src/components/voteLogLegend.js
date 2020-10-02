import React from "react"
import { Global, css } from "@emotion/core"
import { media } from "../styles"

const cssLegend = ({ missing, type }) => ({
  display: missing ? "flex" : "unset",
  flexWrap: missing ? "wrap" : "unset",
  justifyContent: missing
    ? type === "group" || type !== "popup"
      ? "center"
      : "center"
    : "unset",
  marginRight: "0",
  [media(767)]: {
    justifyContent: missing
      ? type === "group" || type !== "popup"
        ? "flex-start"
        : "center"
      : "unset",
    marginRight: missing ? "2rem" : "0",
  },
})
const cssGridCell = ({ missing, type }) => ({
  width: missing && type !== "popup" ? (type === "group" ? 3 : 10) : 10,
  height: missing && type !== "popup" ? (type === "group" ? 10 : 10) : 10,
  backgroundColor: "var(--cl-white)",
  border: "1px solid var(--cl-black)",
  boxSizing: "border-box",
  display: "inline-block",
  [media(767)]: {
    width: missing && type !== "popup" ? (type === "group" ? 3 : 15) : 8,
    height: missing && type !== "popup" ? (type === "group" ? 10 : 15) : 8,
  },
})
const cssLegendWrap = ({ missing, type }) => ({
  // marginRight: missing ? "1.5rem" : "0.5rem",
  marginRight: "0.5rem",
  display: missing ? "flex" : "unset",
  alignItems: missing ? "center" : "none",
  fontSize: missing ? (type === "group" ? "1rem" : "1rem") : "unset",
  marginTop: "0.6rem",
  [media(767)]: {
    fontSize: missing ? (type === "group" ? "1rem" : "1.4rem") : "unset",
    // type ไม่เข้า
    marginTop: "0",
  },
})
const cssAvgText = ({ missing, type }) => ({
  fontSize: missing ? "1rem" : "unset",
  marginRight: missing ? "1rem" : "unset",
  display: missing ? (type === "popup" ? "none" : "unset") : "none",
  marginTop: "0.6rem",
  [media(767)]: {
    fontSize: missing ? "1rem" : "unset",
    display: "none",
    flex: "none",
    marginTop: "0",
  },
})
const cssLegendSpace = {
  margin: "0 0.5rem",
  [media(767)]: {
    margin: "0 1rem",
  },
}
const VoteLogLegend = ({
  approve,
  disprove,
  abstained,
  absent,
  missing,
  type,
}) => {
  console.log("type", type)
  return (
    <div css={cssLegend({ missing, type })}>
      <div css={cssAvgText({ missing, type })}>โดยเฉลี่ย</div>
      <span css={cssLegendWrap({ missing, type })}>
        <div
          css={cssGridCell({ missing, type })}
          style={{
            backgroundColor: "var(--cl-vote-yes)",
            border: "1px solid var(--cl-vote-yes)",
          }}
        />{" "}
        {missing != undefined ? (
          type === "group" ? (
            <>
              <b style={{ margin: "0 0.3rem" }}></b> {approve}%
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>เห็นด้วย</b> {approve}
            </>
          ) : (
            <>
              <b css={cssLegendSpace}>เห็นด้วย</b> {approve}%
            </>
          )
        ) : (
          `เห็นด้วย ${approve}`
        )}
      </span>
      <span css={cssLegendWrap({ missing, type })}>
        <div
          css={cssGridCell({ missing, type })}
          style={{
            backgroundColor: "var(--cl-vote-no)",
            border: "1px solid var(--cl-vote-no)",
          }}
        />{" "}
        {missing != undefined ? (
          type === "group" ? (
            <>
              <b style={{ margin: "0 0.3rem" }}></b> {disprove}%
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>ไม่เห็นด้วย</b> {disprove}
            </>
          ) : (
            <>
              <b css={cssLegendSpace}>ไม่เห็นด้วย</b> {disprove}%
            </>
          )
        ) : (
          `ไม่เห็นด้วย ${disprove}`
        )}
      </span>
      <span css={cssLegendWrap({ missing, type })}>
        <div
          css={cssGridCell({ missing, type })}
          style={{
            backgroundColor: missing
              ? "var(--cl-senate-vote-abstained)"
              : "var(--cl-vote-abstained)",
            border: missing
              ? "1px solid var(--cl-senate-vote-abstained)"
              : "1px solid var(--cl-vote-abstained)",
          }}
        />{" "}
        {missing != undefined ? (
          type === "group" ? (
            <>
              <b style={{ margin: "0 0.3rem" }}></b> {abstained}%
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>งดออกเสียง</b> {abstained}
            </>
          ) : (
            <>
              <b css={cssLegendSpace}>งดออกเสียง</b> {abstained}%
            </>
          )
        ) : (
          `งดออกเสียง ${abstained}`
        )}
      </span>
      <span css={cssLegendWrap({ missing, type })}>
        <div
          css={cssGridCell({ missing, type })}
          style={{
            backgroundColor: missing
              ? "var(--cl-senate-vote-absent)"
              : "var(--cl-missing)",
            border: missing
              ? "1px solid var(--cl-senate-vote-absent)"
              : "1px solid var(--cl-black)",
          }}
        />{" "}
        {missing != undefined ? (
          type === "group" ? (
            <>
              <b style={{ margin: "0 0.3rem" }}></b> {absent}%
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>ไม่ลงมติ</b> {absent}
            </>
          ) : (
            <>
              <b css={cssLegendSpace}>ไม่ลงมติ</b> {absent}%
            </>
          )
        ) : (
          `ไม่ลงคะแนน ${absent}`
        )}
      </span>
      {missing != undefined && (
        <span css={cssLegendWrap({ missing, type })}>
          <div
            css={cssGridCell({ missing, type })}
            style={{
              backgroundColor: "var(--cl-senate-vote-missing)",
              border: "1px solid var(--cl-senate-vote-missing)",
            }}
          />{" "}
          {type === "group" ? (
            <>
              <b style={{ margin: "0 0.3rem" }}></b> {missing}%
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>ขาด</b> {missing}
            </>
          ) : (
            <>
              <b css={cssLegendSpace}>ขาด</b> {missing}%
            </>
          )}
        </span>
      )}
    </div>
  )
}

export default VoteLogLegend
