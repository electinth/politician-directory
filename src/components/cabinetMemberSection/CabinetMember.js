import React from "react"
import { politicianPicture } from "../../utils"

export const CabinetMember = props => {
  const { lastname, name, party, party_group, cabinet_position } = props

  return (
    <div
      css={{
        backgroundColor: "white",
        border: "solid",
        borderRadius: "0.6rem",
        width: "47rem",
        height: "15.5rem",
        display: "inline-block",
        margin: "1.5rem",
        borderWidth: "0.2rem",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          css={{
            width: "8.5rem",
            height: "8.5rem",
            display: "inline-block",
            backgroundColor: "#222121",
            borderRadius: "50%",
            margin: "4rem",
            overflow: "hidden",
          }}
        >
          <img
            css={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: "solid",
              borderWidth: "0.2rem",
            }}
            alt={`${name} ${lastname}`}
            src={politicianPicture(props)}
          />
        </div>
        <div
          css={{
            width: "70%",
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
          }}
        >
          <MemberName name={name} lastname={lastname} />
          <MemberAffiliate party={party} partyGroup={party_group} />
          <MemberPosition position={cabinet_position} />
        </div>
      </div>
    </div>
  )
}

const MemberName = ({ name, lastname }) => (
  <a
    css={{
      fontSize: "25px",
      fontWeight: "700",
      color: "black",
    }}
    href={`/people/${name}-${lastname}`}
  >
    {[name, lastname].join(" ")}
  </a>
)

const memberDetailsCss = {
  fontSize: "20px",
  fontWeight: "700",
}

const MemberAffiliate = props => {
  const party = props.party && props.party !== "-" ? props.party : ""
  const partyGroup =
    props.partyGroup && props.partyGroup !== "-" ? props.partyGroup : ""

  return party || partyGroup ? (
    <div css={memberDetailsCss}>{[party, partyGroup].join(" ")}</div>
  ) : null
}

const MemberPosition = ({ position }) => (
  <div css={memberDetailsCss}>{position}</div>
)
