import React from "react"

import PeopleCard from "../peopleCard"
import { sortThaiLocale } from "../../utils"

export const CabinetMemberList = ({ members, title }) => {
  let list = [...members]
  list.sort(sortThaiLocale)
  list = list.map(member => {
    // keep only 'cabinet_position' of the current section title
    const position = member.cabinet_position
      .filter(pos => pos.indexOf(title) >= 0)
      .join(", ")
    return (
      <PeopleCard
        key={member.id}
        {...member}
        cabinet_position={position}
        type="cabinet"
      ></PeopleCard>
    )
  })

  return (
    <div
      css={{
        marginBottom: "6rem",
      }}
    >
      <h2
        css={{
          textAlign: "center",
          fontSize: "3.6rem",
          margin: "3rem",
        }}
      >
        {title}
      </h2>
      <div
        css={{
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
