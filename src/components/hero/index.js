import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../../styles/global.css"

import HeroFeature from "./feature"
import { media } from "../../styles"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      biograpyImage: file(
        relativePath: { eq: "images/hero/biography@2x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      partySummaryImage: file(
        relativePath: { eq: "images/hero/partySummary@2x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      voteSummaryImage: file(
        relativePath: { eq: "images/hero/voteSummary@2x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div
      css={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "flex-start",
        alignContent: "center",
        marginTop: "2rem",
        marginBottom: "5rem",
        [media(767)]: {
          flexDirection: "row",
        },
      }}
    >
      <HeroFeature
        title="ค้นประวัติบุคคล"
        subtitle="รู้หน้า รู้ชื่อ แต่ไม่รู้จัก ลองค้นหาประวัติผู้แทนในสภาของเรากันดู อายุเท่าไหร่ เรียนจบอะไรมา ก่อนหน้าเคยทำงานอะไร ตอนนี้นั่งตำแหน่งไหน รวมถึงว่าเคยโหวตอะไรในสภาบ้าง"
        image={data.biograpyImage}
      />
      <HeroFeature
        title="ดูภาพรวมพรรคการเมือง"
        subtitle="หนึ่งคณะ สองสภา ยี่สิบกว่าพรรค ใครอยู่ทีมไหน กับใคร เห็นเหมือนหรือเห็นต่างกันอย่างไร ลองดูภาพรวม รายชื่อ และการโหวต ของแต่ละสภาและพรรคการเมือง"
        image={data.partySummaryImage}
      />
      <HeroFeature
        title="สรุปการลงคะแนนเสียง"
        subtitle="ประชุมสภามาหลายครั้ง มีการโหวตครั้งสำคัญอะไรเกิดขึ้นในสภาบ้าง? ใครยกมือสนับสนุนหรือคัดค้านมติไหน? สรุปแบบเข้าใจง่ายๆ พร้อมรายละเอียดให้ตรวจสอบได้ที่นี่"
        image={data.voteSummaryImage}
      />
    </div>
  )
}

export default Hero
