import React from "react"
import { Global, css } from "@emotion/core"
import { media } from "../styles"

const cssLegend = ({ missing }) => ({
  flexWrap: missing ? "wrap" : "unset",
  justifyContent: missing ? "center" : "unset",
})
const cssGridCell = ({ missing, type }) => ({
  width: missing && type !== "popup" ? (type === "group" ? 3 : 10) : 8,
  height: missing && type !== "popup" ? (type === "group" ? 10 : 10) : 8,
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
  marginRight: missing ? "1.5rem" : "1rem",
  display: missing ? "flex" : "unset",
  alignItems: missing ? "center" : "none",
  fontSize: missing ? (type === "group" ? "1rem" : "1rem") : "unset",
  marginTop: "0.6rem",
  [media(767)]: {
    fontSize: missing ? (type === "group" ? "1rem" : "1.4rem") : "unset",
    marginTop: "0",
  },
})
const cssAvgText = ({ missing, type }) => ({
  fontSize: missing ? "1rem" : "unset",
  marginRight: missing ? "1rem" : "unset",
  display: missing ? "unset" : "none",
  marginTop: "0.6rem",
  [media(767)]: {
    display: "none",
    marginTop: "0",
  },
})
const VoteLogLegend = ({
  approve,
  disprove,
  abstained,
  absent,
  missing,
  type,
}) => {
  return (
    <div css={cssLegend({ missing })} style={{ display: "flex" }}>
      <div css={cssAvgText({ missing, type })}>โดยเฉลี่ย</div>
      <span css={cssLegendWrap({ missing })}>
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
              <b style={{ margin: "0 1rem" }}>เห็นด้วย</b> {approve}%
            </>
          )
        ) : (
          `เห็นด้วย ${approve}%`
        )}
      </span>
      <span css={cssLegendWrap({ missing })}>
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
              <b style={{ margin: "0 0.3rem" }}></b> {disprove}
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>ไม่เห็นด้วย</b> {disprove}
            </>
          ) : (
            <>
              <b style={{ margin: "0 1rem" }}>ไม่เห็นด้วย</b> {disprove}%
            </>
          )
        ) : (
          `ไม่เห็นด้วย ${disprove}`
        )}
      </span>
      <span css={cssLegendWrap({ missing })}>
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
              <b style={{ margin: "0 0.3rem" }}></b> {abstained}
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>งดออกเสียง</b> {abstained}
            </>
          ) : (
            <>
              <b style={{ margin: "0 1rem" }}>งดออกเสียง</b> {abstained}%
            </>
          )
        ) : (
          `งดออกเสียง ${abstained}`
        )}
      </span>
      <span css={cssLegendWrap({ missing })}>
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
              <b style={{ margin: "0 0.3rem" }}></b> {absent}
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>ไม่ลงมติ</b> {absent}
            </>
          ) : (
            <>
              <b style={{ margin: "0 1rem" }}>ไม่ลงมติ</b> {absent}%
            </>
          )
        ) : (
          `ไม่ลงคะแนน ${absent}`
        )}
      </span>
      {missing != undefined && (
        <span css={cssLegendWrap({ missing })}>
          <div
            css={cssGridCell({ missing, type })}
            style={{
              backgroundColor: "var(--cl-senate-vote-missing)",
              border: "1px solid var(--cl-senate-vote-missing)",
            }}
          />{" "}
          {type === "group" ? (
            <>
              <b style={{ margin: "0 0.3rem" }}></b> {missing}
            </>
          ) : type === "popup" ? (
            <>
              <b style={{ margin: "0 1rem" }}>ขาด</b> {missing}
            </>
          ) : (
            <>
              <b style={{ margin: "0 1rem" }}>ขาด</b> {missing}%
            </>
          )}
        </span>
      )}
    </div>
  )
}

export default VoteLogLegend
