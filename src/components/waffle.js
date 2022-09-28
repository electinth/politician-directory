import React from "react"
import _ from "lodash"
import PeopleCard from "./peopleCard"
import PartyLogo from "./partyLogo"

import cross from "../images/icons/votelog/vote.png"

import "../styles/global.css"
import "./waffle.css"

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
  "&:hover .tooltip-text": {
    display: "block",
    zIndex: 10,
  },
  ...(isCross && {
    border: "none",
    backgroundImage: `url(${cross})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
  }),
})

const tooltipTextStyle = {
  display: "none",
  position: "absolute",
  top: "5px",
  left: "-2px",
  width: 350,
  padding: 0,
  lineHeight: "1.8rem",
  border: "none",
  borderRadius: "0 5px 5px 5px",
  backgroundColor: "transparent",
}

const WaffleCell = ({ node, cellStyleProps }) => {
  return (
    <div
      css={cellStyle(
        cellStyleProps.color,
        cellStyleProps.borderColor,
        cellStyleProps.isCross
      )}
    >
      <div className="tooltip-text" css={tooltipTextStyle}>
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
    </div>
  )
}

export const WaffleAligner = ({ data, cellStyleProps, style }) => {
  const chunks = _.chunk(data, 25)

  return (
    <div className="waffle-chunk-container" style={style}>
      {chunks.map((c, ci) => (
        <div className="waffle-chunk" key={`wch${ci}`}>
          {c.map(({ node }, ni) => (
            <WaffleCell {...{ node, cellStyleProps }} key={`wc${ni}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

const WaffleGroup = ({ party, cellStyleProps }) => {
  return (
    <div className="waffle-group">
      <PartyLogo name={party.name} />
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
  const transformed_data = data.map(type => {
    const groupped_obj = _.groupBy(type, ({ node }) => node.party)
    const groupped_arr = Object.keys(groupped_obj).map(key => ({
      name: key,
      length: groupped_obj[key].length,
      data: groupped_obj[key],
    }))
    const sorted_by_len_arr = groupped_arr.sort((a, z) => z.length - a.length)
    return sorted_by_len_arr
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
      {transformed_data.map((group, group_idx) => (
        <React.Fragment key={group_idx}>
          <div>
            {group.map((party, party_index) => (
              <WaffleGroup
                key={`${group_idx}-${party_index}`}
                party={party}
                cellStyleProps={{
                  color: colors[group_idx],
                  borderColor: borderColors[group_idx],
                  isCross:
                    crossLast && group_idx === transformed_data.length - 1,
                }}
              />
            ))}
          </div>
          {group_idx !== transformed_data.length - 1 && (
            <div key="line" className="line"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Waffle
