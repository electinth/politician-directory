import React from "react"

import { CabinetMember } from "./CabinetMember"

export const CabinetMemberList = ({ members, title }) => {
  const list = members.map(member => (
    <CabinetMember {...member} key={member.id} />
  ))
  return (
    <div
      css={{
        marginBottom: "6rem",
      }}
    >
      <h2
        css={{
          textAlign: "center",
          fontSize: "30px",
          margin: "3rem",
        }}
      >
        {title}
      </h2>
      <div
        css={{
          width: "100rem",
          [`@media only screen and (max-width: 65rem)`]: {
            width: "50rem",
          },
          display: "flex",
          flexWrap: "wrap",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {list}
      </div>
    </div>
  )
}
