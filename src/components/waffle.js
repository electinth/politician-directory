import React, { useState } from "react"
import { chunk, groupBy } from "lodash"
import { useFloating, shift } from "@floating-ui/react-dom"
import PeopleCard from "./peopleCard"
import PartyLogo from "./partyLogo"

import cross from "../images/icons/votelog/cross.png"

import "../styles/global.css"
import "./waffle.css"

const COUNT_OF_WAFFLE = 25

let cellStyle = (color, borderColor, isCross = false) => ({
  position: "relative",
  width: 8,
  height: 8,
  boxSizing: "border-box",
  margin: "0 3px 3px 0",
  border: "1px solid var(--cl-black)",
  borderColor,
  backgroundColor: color,
  "&:hover": {
    border: "2px solid var(--cl-black)",
  },
  ...(isCross && {
    border: "none",
    backgroundImage: `url(${cross})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
  }),
})

const tooltipTextStyle = {
  position: "absolute",
  width: 350,
  lineHeight: "1.8rem",
  zIndex: 10,
}

const WaffleCell = ({ node, cellStyleProps }) => {
  const [isWaffleCellHover, setIsWaffleCellHover] = useState(false)
  const { x, y, reference, floating } = useFloating({
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [shift()],
  })

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        css={cellStyle(
          cellStyleProps.color,
          cellStyleProps.borderColor,
          cellStyleProps.isCross
        )}
        ref={reference}
        onMouseEnter={() => {
          setIsWaffleCellHover(true)
        }}
        onMouseLeave={() => {
          setIsWaffleCellHover(false)
        }}
      >
        {isWaffleCellHover && (
          <div
            css={tooltipTextStyle}
            ref={floating}
            style={{
              top: y ?? 0,
              left: x ?? 0,
            }}
          >
            <PeopleCard
              {...node}
              css={{
                padding: "1rem 1rem",
                margin: 0,
                alignItems: "center",
                border: "2px solid var(--cl-black)",
                ".card-info": {
                  ".card-name": {
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    fontFamily: "var(--ff-text)",
                  },
                  ".card-description": {
                    fontSize: "1.6rem",
                    fontFamily: "var(--ff-text)",
                  },
                },
                ".profile-picture": {
                  height: "5rem",
                  flexBasis: "5rem",
                },
              }}
            ></PeopleCard>
          </div>
        )}
      </div>
    </>
  )
}

export const WaffleAligner = ({ data, cellStyleProps, style, className }) => {
  const chunks = chunk(data, COUNT_OF_WAFFLE)

  return (
    <div className={`waffle-chunk-container ${className ?? ""}`} style={style}>
      {chunks.map((chunk, chunkIdx) => (
        <div className="waffle-chunk" key={`wch${chunkIdx}`}>
          {chunk.map(({ node }, nodeIdx) => (
            <WaffleCell {...{ node, cellStyleProps }} key={`wc${nodeIdx}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

const WaffleGroup = ({ party, cellStyleProps }) => {
  return (
    <div className="waffle-group">
      <a href={`/party/${party.name}`}>
        <PartyLogo name={party.name} />
      </a>
      <WaffleAligner data={party.data} cellStyleProps={cellStyleProps} />
    </div>
  )
}

const Waffle = ({
  data,
  colors,
  borderColors,
  style,
  css,
  crossLast = false,
}) => {
  const peopleGrouppedByParty = data.map(type => {
    const groupByParty = groupBy(type, ({ node }) => node.party)
    return Object.entries(groupByParty)
      .map(([partyName, data]) => ({
        name: partyName,
        data,
      }))
      .sort((a, z) => z.data.length - a.data.length)
  })

  return (
    <div
      className="waffle"
      css={{
        justifyContent: "center",
        ...css,
      }}
      style={style}
    >
      {peopleGrouppedByParty.map((group, groupIdx) => (
        <React.Fragment key={groupIdx}>
          <div className="waffle-column">
            {group.map((party, partyIdx) => (
              <WaffleGroup
                key={`${groupIdx}-${partyIdx}`}
                party={party}
                cellStyleProps={{
                  color: colors[groupIdx],
                  borderColor: borderColors[groupIdx],
                  isCross:
                    crossLast && groupIdx === peopleGrouppedByParty.length - 1,
                }}
              />
            ))}
          </div>
          {groupIdx !== peopleGrouppedByParty.length - 1 && (
            <div className="line" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Waffle
