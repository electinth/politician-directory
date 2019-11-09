import React from "react"

import { CabinetMember } from "./CabinetMember"

export const CabinetMemberList = ({ members, title }) => {
  const list = members.map(member => <CabinetMember {...member} />)
  return (
    <div>
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
          width: "65rem",
          [`@media (max-width: 40rem)`]: {
            width: "35rem",
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
