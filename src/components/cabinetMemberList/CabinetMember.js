import React from "react"
import Img from "gatsby-image"

export const CabinetMember = props => {
  const { image, lastname, name, party, party_group } = props

  return (
    <div
      css={{
        backgroundColor: "white",
        border: "solid",
        borderRadius: "0.6rem",
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
            backgroundColor: "#222121",
            borderRadius: "50%",
            padding: "0.2rem",
            margin: "1rem",
          }}
        >
          <Img fluid={image.childImageSharp.fluid} />
        </div>
        <div
          css={{
            width: "70%",
            display: "inline-block",
          }}
        >
          <div>{[name, lastname].join(" ")}</div>
          <div>{[party, party_group].join(" ")}</div>
        </div>
      </div>
    </div>
  )
}
