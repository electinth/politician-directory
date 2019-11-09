import React from "react"
import FeatureIcon from "../hero/featureIcon"

export const CabinetMember = props => {
  const { image, lastname, mp_type, name, party, party_group } = props

  return (
    <div
      css={{
        backgroundColor: "white",
        border: "solid",
        borderRadius: "0.3rem",
        width: "30rem",
        height: "10rem",
        display: "inline-block",
        margin: "0.5rem",
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
            width: "30%",
            display: "inline-block",
          }}
        >
          <FeatureIcon image={image} />
        </div>
        <div
          css={{
            width: "70%",
            display: "inline-block",
          }}
        >
          <div>{[name, lastname].join(" ")}</div>
          <div>{mp_type}</div>
          <div>{[party, party_group].join(" ")}</div>
        </div>
      </div>
    </div>
  )
}
