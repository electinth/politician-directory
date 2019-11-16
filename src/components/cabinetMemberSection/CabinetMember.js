import React from "react"
import { politicianPicture } from "../../utils"
import { Link } from "gatsby"

export const CabinetMember = props => {
  const { lastname, name, party, party_group, cabinet_position } = props

  return (
    <Link
      to={`/people/${name}-${lastname}`}
      css={{
        backgroundColor: "white",
        border: "solid",
        borderRadius: "0.6rem",
        width: "47rem",
        height: "15.5rem",
        display: "inline-block",
        margin: "1.5rem",
        borderWidth: "0.2rem",
        color: "inherit",
        "&:hover": {
          textDecoration: "none",
        },
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          css={{
            width: "8.5rem",
            height: "8.5rem",
            borderRadius: "50%",
            objectFit: "cover",
            border: "solid",
            borderWidth: "0.2rem",
            backgroundColor: "#222121",
            margin: "4rem",
            flexShrink: "0",
          }}
          alt={`${name} ${lastname}`}
          src={politicianPicture(props)}
        />
        <div
          css={{
            width: "70%",
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <MemberName name={name} lastname={lastname} />
          <MemberPosition position={cabinet_position} />
          <MemberAffiliate party={party} partyGroup={party_group} />
        </div>
      </div>
    </Link>
  )
}

const MemberName = ({ name, lastname }) => (
  <div
    css={{
      fontSize: "2.4rem",
      fontWeight: "bold",
      fontFamily: "var(--ff-title)",
    }}
  >
    {[name, lastname].join(" ")}
  </div>
)

const memberDetailsCss = {
  fontSize: "1.8rem",
  fontFamily: "var(--ff-text)",
}

const MemberAffiliate = ({ party }) => {
  return party ? <div css={memberDetailsCss}>พรรค{party}</div> : null
}

const MemberPosition = ({ position }) => (
  <div css={memberDetailsCss}>{position}</div>
)
