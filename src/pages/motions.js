import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FloatingCard from "../components/floatingCard"
import HiddenOnMobile from "../components/hiddenOnMobile"
import { media } from "../styles"
import ExternalLink from "../components/externalLink"

const cssH1 = { fontSize: "4.8rem", margin: "0", color: "var(--cl-black)" }
const cssH3 = { fontSize: "2rem", marginBottom: "2rem" }
const cssP = { lineHeight: "1.8" }

const IndexPage = () => {
  return (
    <Layout
      pageStyles={{
        background: "#FDFDFD",
      }}
    >
      <SEO title="Motions" />
      <section>
        <div className="container-motion">
          <FloatingCard cardStyles={{ padding: "4rem" }}>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "4rem",
                [media(767)]: {
                  justifyContent: "space-between",
                },
              }}
            >
              <h1 css={{ ...cssH1 }}>การพิจารณาญัตติตั้งคณะกรรมธิการวิสามัญ</h1>
              <HiddenOnMobile>
                <div>สภาผู้แทนราษฎรไทยชุดที่ 25</div>
              </HiddenOnMobile>
            </div>
            <div
              css={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div css={{ width: "100%", [media(767)]: { width: "32%" } }}>
                <h3 css={cssH3}>Motions</h3>
                <p css={cssP}>
                  การพิจารณาญัตติทั่วไป หมายถึง เรื่อง ปัญหา หรือประเด็นที่ ส.ส.
                  เสนอเข้าสู่การพิจารณาของสภาผู้แทนราษฎร ให้มีการลงมติ
                  เพื่อกำหนดแนวทางการศึกษา แก้ปัญหา เป็นแนวทางในการปฏิบัติต่อไป
                  เช่น การเสนอญัตติเพื่อให้สภาผู้แทนราษฎรตั้งกรรมาธิการวิสามัญ
                  ศึกษาวิธีแก้ปัญหาเฉพาะเรื่อง
                  เพื่อนำผลการศึกษาเสนอแนวการแก้ปัญหาต่อคณะรัฐมนตรี เป็นต้น
                  ซึ่งกระบวนการพิจารณาญัตติทั่วไปจะมีรายละเอียดที่แตกต่างกับกระบวนการพิจารณาร่างกฎหมาย
                </p>
                <p css={cssP}>
                  กรรมาธิการวิสามัญที่ตั้งขึ้น ประกอบด้วย ส.ส.
                  และบุคคลภายนอกตาโควต้าของพรรคการเมือง
                  ซึ่งจะมีหน้าที่แตกต่างกับกรรมาธิการสามัญทั้ง 35
                  คณะของสภาผู้แทนราษฎร
                </p>
                <h3 css={cssH3}>Official Source</h3>
                <ExternalLink
                  css={{ color: "var(--cl-black)" }}
                  href="https://lis.parliament.go.th"
                >
                  lis.parliament.go.th
                </ExternalLink>
              </div>
              <HiddenOnMobile style={{ width: "32%" }}>
                <div>
                  <h3 css={cssH3}>ญัตติทั้งหมด</h3>
                  <h3 css={cssH3}>ยังไม่ลงญัตติ</h3>
                </div>
              </HiddenOnMobile>
              <HiddenOnMobile style={{ width: "32%" }}>
                <div>
                  <h3 css={cssH3}>สัดส่วนประเด็น</h3>
                  <h3 css={cssH3}>ลงมติแล้ว</h3>
                </div>
              </HiddenOnMobile>
            </div>
          </FloatingCard>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
