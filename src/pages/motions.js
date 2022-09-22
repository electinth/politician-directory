import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import FloatingCard from "../components/floatingCard"
import HiddenOnMobile from "../components/hiddenOnMobile"
import { media } from "../styles"
import ExternalLink from "../components/externalLink"
import MotionSubCatCard from "../components/motionSubCatCard"
import BarChart from "../components/motion/barchart"
import { css } from "@emotion/react"
import StatusBarChart from "../components/motion/statusBarChart"
import { statusColors } from "../components/motionStatusChip"

export const query = graphql`
  query {
    categories: allMotionCatYaml {
      edges {
        node {
          main_cat
          sub_cat
        }
      }
    }

    motions: allMotionYaml {
      edges {
        node {
          main_cat
          sub_cat
          status
        }
      }
    }
  }
`

const mobileBP = "(max-width: 765px)"

const cssH1 = { fontSize: "4.8rem", margin: "0", color: "var(--cl-black)" }
const cssH2 = { fontSize: "3.6rem", marginBottom: "2.4rem" }
const cssH3 = { fontSize: "2.4rem", margin: "5.2rem 0 2.8rem 0" }
const cssP = { lineHeight: "1.8" }
const cssH3Viz = { ...cssH3, marginBottom: "10px" }

const IndexPage = ({ data }) => {
  const mainCatGroupCount = _.groupBy(data.motions.edges, d => d.node.main_cat)
  const barchartdata = Object.entries(mainCatGroupCount).map(
    ([category, motions]) => ({
      category,
      count: motions.length,
    })
  )

  const STATUS_COLOR = color => statusColors[color]
  const statusGroupCount = _.groupBy(data.motions.edges, d => d.node.status)
  const statusdata = Object.entries(statusGroupCount)
    .map(([status, motions]) => ({
      status,
      count: motions.length,
      color: STATUS_COLOR(status),
    }))
    .sort((a, b) => +a.status.slice(0, 1) - +b.status.slice(0, 1))
  const VOTED = [
    "3. ตั้ง กมธ. วิสามัญ",
    "4. ไม่ตั้ง กมธ. วิสามัญ",
    "5. ส่งครม.",
  ]
  const voteddata = statusdata.filter(d => VOTED.includes(d.status))
  const notvoteddata = statusdata.filter(d => !VOTED.includes(d.status))

  const getCategoryGroups = () => {
    let subCats = data.categories.edges.map(({ node }) =>
      convertToSubCategory(node)
    )
    let grouped = _.groupBy(subCats, node => node.mainCat)
    let catGroups = []
    for (const key in grouped) {
      catGroups.push({
        title: key,
        subCats: grouped[key],
      })
    }

    return catGroups
  }

  const convertToSubCategory = category => ({
    title: category.sub_cat,
    mainCat: category.main_cat,
    totalCount: getTotalCountOfSubCategory(category.sub_cat),
  })

  const getTotalCountOfSubCategory = subCategory =>
    data.motions.edges.filter(({ node }) => node.sub_cat === subCategory).length

  return (
    <Layout
      pageStyles={{
        background: "#FDFDFD",
      }}
    >
      <Seo title="Motions" />
      <div style={{ backgroundColor: "var(--cl-black)", padding: "1.6rem" }}>
        <div
          className="container-motion"
          style={{ color: "var(--cl-white)", textAlign: "center" }}
        >
          เนื่องจากข้อมูลอยู่ระหว่างการรวบรวมและบันทึก
          ส่วนที่แสดงในเว็บไซต์จึงเป็นแค่ส่วนหนึ่งจากข้อมูลทั้งหมด
          หากต้องการท่านสามารถดูข้อมูลทั้งหมดได้
          <ExternalLink
            href="https://lis.parliament.go.th/index/search_advance_detail.php?S_SYSTEM=8"
            style={{
              marginLeft: "0.5rem",
              color: "var(--cl-white)",
              textDecoration: "underline",
            }}
          >
            ที่นี่
          </ExternalLink>
        </div>
      </div>
      <section>
        <div className="container-motion">
          <div
            css={{
              color: "var(--cl-gray-2)",
              textAlign: "right",
              margin: "2rem 0 3.2rem 0",
            }}
          >
            ข้อมูลล่าสุดวันที่ 25 กันยายน 2563
          </div>
        </div>
      </section>
      <section>
        <FloatingCard
          style={{
            padding: "4rem",
            maxWidth: "calc(var(--container-motion-width) - 64px)",
            margin: "0 auto",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
            <div
              css={css`
                display: flex;
                flex-flow: column nowrap;
                width: 64%;

                @media ${mobileBP} {
                  width: 100%;
                }

                & .toprow,
                & .bottomrow {
                  display: flex;

                  &--col {
                    flex: 0 0 50%;
                    display: flex;

                    flex-flow: column nowrap;

                    @media ${mobileBP} {
                      flex: 1;
                    }

                    &__allmotion {
                      @media ${mobileBP} {
                        display: none;
                      }
                    }
                  }
                }

                & .toprow {
                  flex: 1;
                }

                & .bottomrow {
                  flex: 0 0 250px;

                  @media ${mobileBP} {
                    flex: 1;
                    flex-flow: row wrap;
                  }

                  &--col {
                    padding: 0 20px;
                  }

                  &--col + .bottomrow--col {
                    border-left: 1px solid var(--cl-gray-4);

                    @media ${mobileBP} {
                      border: none;
                    }
                  }
                }
              `}
            >
              <div className="toprow">
                <div className="toprow--col toprow--col__allmotion">
                  <h3 css={cssH3Viz}>ญัตติทั้งหมด</h3>
                  <div
                    css={css`
                      flex: 1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <div
                      className="allmotion-circle"
                      css={css`
                        width: 150px;
                        height: 150px;
                        background-color: rgb(250, 250, 250);
                        border: 1px solid var(--cl-gray-4);
                        border-radius: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                      `}
                    >
                      <div
                        className="allmotion-text"
                        css={css`
                          font-size: 50px;
                          font-family: var(--ff-title);
                        `}
                      >
                        {data.motions.edges.length}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="toprow--col toprow--col__motioncount">
                  <h3 css={cssH3Viz}>สัดส่วนประเด็น</h3>
                  <div
                    className="bar-wrapper"
                    css={css`
                      height: calc(100% - 36px - 5.2rem);
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <BarChart
                      data={barchartdata}
                      xTicks={[0, 10, 20, 30, 40, 50, 60, 70]}
                    />
                  </div>
                </div>
              </div>
              <div className="bottomrow">
                <div className="bottomrow--col bottomrow--col__notvoted">
                  <h3 css={cssH3Viz}>ยังไม่ลงมติ</h3>
                  <StatusBarChart width={`100%`} data={notvoteddata} />
                </div>
                <div className="bottomrow--col bottomrow--col__voted">
                  <h3 css={cssH3Viz}>ลงมติแล้ว</h3>
                  <StatusBarChart width="100%" data={voteddata} />
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>
      </section>
      <section style={{ marginTop: "8rem" }}>
        <div className="container-motion">
          <div>
            <h2 css={cssH2}>ประเด็นญัตติ</h2>
            <p>
              คลิกเพื่อดูญัตติทั้งหมดในประเด็นต่างๆ
              ที่นำเสนอโดยคณะกรรมธิการสามัญ
            </p>
          </div>
          <div css={{ marginBottom: "8rem" }}>
            {getCategoryGroups().map(catGroup => (
              <div>
                <h3 style={cssH3}>{catGroup.title}</h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {catGroup.subCats.map(subCat => (
                    <MotionSubCatCard
                      title={subCat.title}
                      count={subCat.totalCount}
                      css={{
                        margin: "0 0 2rem 0",
                        width: "100%",
                        [media(767, 1022)]: {
                          width: "calc((100% - 4rem) / 2)",
                          margin: "0 2rem 2rem 0",
                          "&:nth-of-type(2n)": {
                            margin: "0 0 2rem 0",
                          },
                        },
                        [media(1023)]: {
                          width: "calc((100% - 4rem) / 3)",
                          margin: "0 2rem 2rem 0",
                          "&:nth-of-type(3n)": {
                            margin: "0 0 2rem 0",
                          },
                        },
                      }}
                    ></MotionSubCatCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
