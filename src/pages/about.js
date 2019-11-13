import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/externalLink"

const h2 = {
  fontSize: "2.4rem",
  textAlign: "center",
}

const h1 = {
  fontSize: "6rem",
  textAlign: "center",
}

const cssSectionHead = {
  fontSize: "4.8rem",
  textAlign: "center",
}

const cssSection = {
  padding: "4rem 0 0 0",
}

const cssSubSection = {
  fontFamily: "var(--ff-text)",
  margin: "3rem 0 4.5rem 0",
  paddingBottom: "3rem",
  borderBottom: "3px solid var(--cl-black)",
  maxWidth: "832px",
  fontSize: "1.8rem",
}

const cssSubSectionHead = {
  fontWeight: "bold",
  fontSize: "2.4rem",
  marginBottom: "1.5rem",
}

const cssExtLink = {
  color: "black !important",
}

const cssExtLinkButton = {
  display: "inline-block",
  background: "var(--cl-black)",
  padding: "1.5rem 7rem",
  textDecoration: "none",
  borderRadius: "1rem",
  fontSize: "2.4rem",
  fontWeight: "normal",
  fontFamily: "var(--ff-title)",
  color: "var(--cl-white)",
  "&:hover": {
    color: "gray",
  },
  marginBottom: "2rem",
}

export const query = graphql`
  query {
    allContributor {
      edges {
        node {
          login
          html_url
        }
      }
    }
  }
`

const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="About Us" />
    <section
      css={{
        ...cssSection,
        backgroundColor: "var(--cl-pink)",
        padding: "4rem 0 6rem 0",
      }}
    >
      <div className="container">
        <h1 css={h1}>About Us</h1>
        <h2 css={h2}>เกี่ยวกับสมุดพกการเมือง</h2>
      </div>
    </section>
    <section css={{ ...cssSection }}>
      <div className="container">
        <h1 css={cssSectionHead}>เกี่ยวกับโปรเจ็คนี้</h1>
        <div css={cssSubSection}>
          <div css={cssSubSectionHead}>ที่มาของข้อมูล</div>
          <p>
            ข้อมูลที่ใช้ 'มาจาก กกต.' โดยจะทยอยส่งเข้ามาจากทุกหน่วยเลือกตั้ง
            กว่า 90,000 หน่วยเลือกตั้งทั่วประเทศ
            เมื่อนับคะแนนแต่ละหน่วยเสร็จสิ้น
            (โดยคะแนนจะเริ่มทยอยเข้ามาตั้งแต่เวลา 18.00 น.
            และคาดว่าจะสิ้นสุดในเวลา 21.30 น. โดยประมาณ)
          </p>
        </div>
        <div css={cssSubSection}>
          <div css={cssSubSectionHead}>ความคลาดเคลื่อนของข้อมูล</div>
          <p>
            ข้อมูลทั้งหมดเป็นการนับคะแนน 'อย่างไม่เป็นทางการ' ซึ่ง
            กกต.จะต้องตรวจสอบอีกครั้ง ก่อนประกาศรับรองผลภายหลังทีละเขต จนครบ 350
            เขต ซึ่งเป็นไปได้ว่าบางเขตอาจต้องเลือกตั้งใหม่ ทำให้จำนวน ส.ส.
            ของแต่ละพรรคสามารถเปลี่ยนแปลงได้
          </p>
        </div>
        <div css={cssSubSection}>
          <div css={cssSubSectionHead}>นโยบายการนำไปใช้ต่อ</div>
          <p>
            ข้อมูลทั้งหมดเป็นการนับคะแนน 'อย่างไม่เป็นทางการ' ซึ่ง
            กกต.จะต้องตรวจสอบอีกครั้ง ก่อนประกาศรับรองผลภายหลังทีละเขต จนครบ 350
            เขต ซึ่งเป็นไปได้ว่าบางเขตอาจต้องเลือกตั้งใหม่ ทำให้จำนวน ส.ส.
            ของแต่ละพรรคสามารถเปลี่ยนแปลงได้
          </p>
        </div>
      </div>
    </section>

    <section css={{ ...cssSection }}>
      <div className="container">
        <h1 css={cssSectionHead}>อาสาสมัครร่วมพัฒนา</h1>
        <div css={cssSubSection}>
          <div css={cssSubSectionHead}>เขียนโปรแกรม</div>
          <p>
            {data.allContributor.edges.map(({ node }, i) => (
              <span>
                {i === 0 ? "" : ", "}
                <ExternalLink href={node.html_url} css={cssExtLink}>
                  {node.login}
                </ExternalLink>
              </span>
            ))}
          </p>
        </div>
        <div css={cssSubSection}>
          <div css={cssSubSectionHead}>ออกแบบ</div>
          <ExternalLink
            href="https://www.instagram.com/messymachine/"
            css={cssExtLink}
          >
            Pitshaya Chonato
          </ExternalLink>
          {", "}
          <ExternalLink
            href="https://www.instagram.com/namsaisupavong/"
            css={cssExtLink}
          >
            Namsai Supavong
          </ExternalLink>
        </div>
        <div css={cssSubSection}>
          <div css={cssSubSectionHead}>ตืดต่อประสานงานและด้านอื่นๆ</div>
          <p>Boonmee Lab, Minimore, The Matter, iLaw</p>
        </div>
      </div>
    </section>
    <section css={{ ...cssSection, marginBottom: "8rem" }}>
      <center>
        <a
          href="https://github.com/codeforthailand/politician-directory"
          css={cssExtLinkButton}
        >
          View This Project On Github
        </a>
      </center>
      <center>© 2019 ELECT - All Rights Reserved</center>
    </section>
  </Layout>
)

export default AboutPage
