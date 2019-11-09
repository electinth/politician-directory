import React from "react"
import { CabinetMember } from "./CabinetMember"
import { useStaticQuery, graphql } from "gatsby"

const CabinetMemberList = () => {
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
  const list = data.allPeopleYaml.edges.map(people => (
    <CabinetMember {...people.node} image={data.mockImage} />
  ))
  return (
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
  )
}

export default CabinetMemberList
