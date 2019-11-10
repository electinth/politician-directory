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

  const ministryList = [
    "รองนายกรัฐมนตรี",
    "กระทรวงกลาโหม",
    "กระทรวงการคลัง",
    "กระทรวงคมนาคม",
    "กระทรวงพาณิชย์",
    "กระทรวงมหาดไทย",
    "กระทรวงศึกษาธิการ",
    "กระทรวงสาธารณสุข",
    "กระทรวงเกษตรและสหกรณ์",
    "สำนักนายกรัฐมนตรี",
    "กระทรวงการต่างประเทศ",
    "กระทรวงการท่องเที่ยวและกีฬา",
    "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
    "กระทรวงคมนาคม",
    "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
    "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    "กระทรวงพลังงาน",
    "กระทรวงพัฒนาสังคมและความมั่นคงของมนุษย์",
    "กระทรวงยุติธรรม",
    "กระทรวงวัฒนธรรม",
    "กระทรวงอุตสาหกรรม",
    "กระทรวงแรงงาน",
  ]

  // president need special filter
  const presidentMinistry = "นายกรัฐมนตรี"
  const presidentList = data.allPeopleYaml.edges.filter(people =>
    people.node.cabinet_position.some(
      peoplePostion => peoplePostion === presidentMinistry
    )
  )

  const memberByMinistry = [
    {
      ministry: presidentMinistry,
      members: presidentList,
    },
  ].concat(
    ministryList.map(ministry => ({
      ministry,
      members: data.allPeopleYaml.edges.filter(people =>
        people.node.cabinet_position.some(
          peoplePostion => peoplePostion.indexOf(ministry) > -1
        )
      ),
    }))
  )

  const renderCabinetMemberLists = () =>
    memberByMinistry.map(({ ministry, members: memberList }) => {
      const memberListWithImg = memberList.map(member => ({
        ...member.node,
      }))
      return (
        <CabinetMemberList
          key={ministry}
          members={memberListWithImg}
          title={ministry}
        />
      )
    })

  return <div>{renderCabinetMemberLists()}</div>
}

export default CabinetMemberSection
