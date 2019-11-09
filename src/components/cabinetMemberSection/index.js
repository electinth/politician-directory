import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { CabinetMemberList } from "./CabinetMemberList"

const CabinetMemberSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allPeopleYaml(filter: { is_cabinet: { eq: true } }) {
        edges {
          node {
            id
            cabinet_position
            lastname
            name
            party
            party_group
            mp_type
          }
        }
      }
      mockImage: file(relativePath: { eq: "images/hero/biography.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  console.log(data)

  const positionList = ["นายกรัฐมนตรี", "รองนายกรัฐมนตรี"]

  const memberByPosition = positionList.map(position => ({
    position,
    members: data.allPeopleYaml.edges.filter(people =>
      people.node.cabinet_position.some(
        peoplePostion => peoplePostion === position
      )
    ),
  }))

  const renderCabinetMemberLists = () =>
    memberByPosition.map(({ position, members: memberList }) => {
      const memberListWithImg = memberList.map(member => ({
        ...member.node,
        image: data.mockImage,
      }))
      return <CabinetMemberList members={memberListWithImg} title={position} />
    })

  return <div>{renderCabinetMemberLists()}</div>
}

export default CabinetMemberSection
