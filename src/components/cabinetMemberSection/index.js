import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { CabinetMemberList } from "./CabinetMemberList"

const CabinetMemberSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allPeopleYaml(
        filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
      ) {
        edges {
          node {
            id
            title
            name
            lastname
            cabinet_position
            party
            party_group
            mp_type
          }
        }
      }
    }
  `)

  const ministryList = [
    "รองนายกรัฐมนตรี",
    "สำนักนายกรัฐมนตรี",
    "กระทรวงกลาโหม",
    "กระทรวงการคลัง",
    "กระทรวงการต่างประเทศ",
    "กระทรวงการท่องเที่ยวและกีฬา",
    "กระทรวงพัฒนาสังคมและความมั่นคงของมนุษย์",
    "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
    "กระทรวงเกษตรและสหกรณ์",
    "กระทรวงคมนาคม",
    "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
    "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    "กระทรวงพลังงาน",
    "กระทรวงพาณิชย์",
    "กระทรวงมหาดไทย",
    "กระทรวงยุติธรรม",
    "กระทรวงแรงงาน",
    "กระทรวงวัฒนธรรม",
    "กระทรวงศึกษาธิการ",
    "กระทรวงสาธารณสุข",
    "กระทรวงอุตสาหกรรม",
  ]

  // president need special filter
  const presidentMinistry = "นายกรัฐมนตรี"
  const presidentList = data.allPeopleYaml.edges.filter(people =>
    people.node.cabinet_position.some(
      peoplePosition => peoplePosition === presidentMinistry
    )
  )

  const positionComparer = ministry => (a, b) => {
    const aPosition = a.node.cabinet_position.find(
      position => position.indexOf(ministry) > -1
    )
    const bPosition = b.node.cabinet_position.find(
      position => position.indexOf(ministry) > -1
    )

    if (aPosition === bPosition) return -1

    return aPosition.indexOf("ช่วย") > -1 ? 1 : -1
  }

  const memberByMinistry = [
    {
      ministry: presidentMinistry,
      members: presidentList,
    },
  ].concat(
    ministryList.map(ministry => ({
      ministry,
      members: data.allPeopleYaml.edges
        .filter(people =>
          people.node.cabinet_position.some(
            peoplePostion => peoplePostion.indexOf(ministry) > -1
          )
        )
        .sort(positionComparer(ministry)),
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
