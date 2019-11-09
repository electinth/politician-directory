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

  // console.log(data)
  // let positions = {};
  // data.allPeopleYaml.edges.map(people => {
  //   people.node.cabinet_position.map(position => {
  //     positions[position] = 1
  //   })
  // })

  // console.log(positions);

  const positionList = [
    "นายกรัฐมนตรี",
    "รองนายกรัฐมนตรี",
    "รัฐมนตรีช่วยว่าการกระทรวงกลาโหม",
    "รัฐมนตรีช่วยว่าการกระทรวงการคลัง",
    "รัฐมนตรีช่วยว่าการกระทรวงคมนาคม",
    "รัฐมนตรีช่วยว่าการกระทรวงพาณิชย์",
    "รัฐมนตรีช่วยว่าการกระทรวงมหาดไทย",
    "รัฐมนตรีช่วยว่าการกระทรวงศึกษาธิการ",
    "รัฐมนตรีช่วยว่าการกระทรวงสาธารณสุข",
    "รัฐมนตรีช่วยว่าการกระทรวงเกษตรและสหกรณ์",
    "รัฐมนตรีประจำสำนักนายกรัฐมนตรี",
    "รัฐมนตรีว่าการกระทรวงกลาโหม",
    "รัฐมนตรีว่าการกระทรวงการคลัง",
    "รัฐมนตรีว่าการกระทรวงการต่างประเทศ",
    "รัฐมนตรีว่าการกระทรวงการท่องเที่ยวและกีฬา",
    "รัฐมนตรีว่าการกระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
    "รัฐมนตรีว่าการกระทรวงคมนาคม",
    "รัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
    "รัฐมนตรีว่าการกระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    "รัฐมนตรีว่าการกระทรวงพลังงาน",
    "รัฐมนตรีว่าการกระทรวงพัฒนาสังคมและความมั่นคงของมนุษย์",
    "รัฐมนตรีว่าการกระทรวงพาณิชย์",
    "รัฐมนตรีว่าการกระทรวงมหาดไทย",
    "รัฐมนตรีว่าการกระทรวงยุติธรรม",
    "รัฐมนตรีว่าการกระทรวงวัฒนธรรม",
    "รัฐมนตรีว่าการกระทรวงศึกษาธิการ",
    "รัฐมนตรีว่าการกระทรวงสาธารณสุข",
    "รัฐมนตรีว่าการกระทรวงอุตสาหกรรม",
    "รัฐมนตรีว่าการกระทรวงเกษตรและสหกรณ์",
    "รัฐมนตรีว่าการกระทรวงแรงงาน",
  ]

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
      return (
        <CabinetMemberList
          key={position}
          members={memberListWithImg}
          title={position}
        />
      )
    })

  return <div>{renderCabinetMemberLists()}</div>
}

export default CabinetMemberSection
