import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { motionCategorySlug } from "../utils"
import MotionStatusChip from "../components/motionStatusChip"
import Breadcrumb from "../components/motion/breadcrumb"
import { Link } from "gatsby"
import HiddenOnMobile from "../components/hiddenOnMobile"
import { media } from "../styles"

export const query = graphql`
  query($sub_cat: String!) {
    allMotionYaml(filter: { sub_cat: { eq: $sub_cat } }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          registration_no
          name
          status
        }
      }
    }
  }
`

class MotionCategoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.allMotions = props.data.allMotionYaml.edges.map(e => e.node)
    this.sortBy = "asc"
    this.filterBy = "all"
    this.state = {
      motions: this.allMotions,
    }
  }

  sort = event => {
    this.sortBy = event.target.value
    this.updateMotions()
  }

  filter = event => {
    this.filterBy = event.target.value
    this.updateMotions()
  }

  updateMotions = () => {
    const motions = [...this.allMotions]
    if (this.sortBy === "asc") {
      motions.sort((a, b) => parseInt(a.id) > parseInt(b.id))
    } else if (this.sortBy === "desc") {
      motions.sort((a, b) => parseInt(a.id) < parseInt(b.id))
    } else if (this.sortBy === "regis_no_desc") {
      motions.sort(this.regisNoDesc)
    } else if (this.sortBy === "regis_no_asc") {
      motions.sort(this.regisNoAsc)
    }

    if (this.filterBy === "all") {
      return this.setState({ motions })
    }

    const selectToStatus = {
      agenda_in_line: "1. รอบรรจุวาระ",
      mp_considering: "2. สภาผู้แทนพิจารณา",
      committee_formed: "3. ตั้ง กมธ. วิสามัญ",
      rejected: "4. ไม่ตั้ง กมธ. วิสามัญ",
      to_cabinet: "5. ส่งครม.",
    }

    this.setState({
      motions: motions.filter(e => e.status === selectToStatus[this.filterBy]),
    })
  }

  regisNoAsc = (a, b) => {
    const dateA = this.convertDate(a.registration_no)
    const dateB = this.convertDate(b.registration_no)
    if (dateA.year === dateB.year) {
      return dateA.running > dateB.running
    }
    return dateA.year > dateB.year
  }

  regisNoDesc = (a, b) => {
    const dateA = this.convertDate(a.registration_no)
    const dateB = this.convertDate(b.registration_no)
    if (dateA.year === dateB.year) {
      return dateA.running < dateB.running
    }
    return dateA.year < dateB.year
  }

  convertDate = registration_no => {
    const [running, year] = registration_no.split("/")
    return { running: parseInt(running), year: parseInt(year) }
  }

  render() {
    const pageTitle = this.props.pageContext.sub_cat
    const cssTitle = { fontSize: "4.8rem" }
    const cssH2 = { fontSize: "2.4rem", margin: "0" }
    const cssContainer = { width: "1080px", maxWidth: "100%" }
    const cssDropdown = {
      height: "4rem",
      backgroundColor: "transparent",
      border: "var(--cl-gray-4) 1px solid",
      padding: "4px 32px 4px 4px",
      borderRadius: "4px",
      appearance: "none",
      color: "var(--cl-gray-1)",
    }

    return (
      <Layout
        pageStyles={{
          background: "#FDFDFD",
        }}
      >
        <SEO title="Motions" />
        <section>
          <div
            css={{
              display: "flex",
              padding: "2rem 0 2rem 0",
              maxWidth: "100%",
              margin: "0 auto",
              backgroundColor: "var(--cl-gray-4)",
              justifyContent: "center",
              [media(767)]: {
                backgroundColor: "transparent",
                justifyContent: "space-between",
                maxWidth: "calc(100% - 64px)",
              },
              [media(1440)]: {
                backgroundColor: "transparent",
                justifyContent: "space-between",
                maxWidth: "calc(var(--container-motion-width) - 64px)",
                // container-motion-width
              },
            }}
          >
            <div className="path">
              <span>
                <Link style={{ color: "var(--cl-black)" }} to={"/motions"}>
                  การพิจารณาญัตติ
                </Link>
              </span>{" "}
              / <span css={{ fontWeight: "bold" }}>{pageTitle}</span>
            </div>
            <HiddenOnMobile>
              <div
                css={{
                  color: "var(--cl-gray-2)",
                  textAlign: "right",
                }}
              >
                ข้อมูลล่าสุดวันที่ 29 กุมภาพันธ์ 2562
              </div>
            </HiddenOnMobile>
          </div>
        </section>
        <section>
          <div className="container-motion">
            <div
              css={{ display: "flex", alignItems: "center", ...cssContainer }}
            >
              <img
                src={`/motion/icons/${motionCategorySlug(pageTitle)}.png`}
                css={{
                  marginBottom: "0",
                  flexShrink: "0",
                  width: "60px",
                  marginRight: "2rem",
                }}
              />
              <h1 css={cssTitle}>{pageTitle}</h1>
            </div>
          </div>
        </section>
        <section style={{ margin: "8rem 0" }}>
          <div className="container-motion">
            <div css={cssContainer}>
              <div
                css={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "2.4rem",
                }}
              >
                <h2 css={{ flexGrow: "1", ...cssH2 }}>รายการญัตติ</h2>
                <select
                  onChange={this.sort}
                  value={this.sortBy}
                  css={{ marginRight: "1rem", ...cssDropdown }}
                >
                  <option value="asc">อัพเดทใหม่ > เก่า</option>
                  <option value="desc">อัพเดทเก่า > ใหม่</option>
                  <option value="regis_no_desc">เลขรับญัตติมาก > น้อย</option>
                  <option value="regis_no_asc">เลขรับญัตติน้อย > มาก</option>
                </select>
                <select
                  onChange={this.filter}
                  value={this.filterBy}
                  css={cssDropdown}
                >
                  <option value="all">ทุกสถานะ</option>
                  <option value="agenda_in_line">รอบรรจุวาระ</option>
                  <option value="mp_considering">สภาผู้แทนพิจารณา</option>
                  <option value="committee_formed">ตั้ง กมธ. วิสามัญ</option>
                  <option value="rejected">ไม่ตั้ง กมธ. วิสามัญ</option>
                  <option value="to_cabinet">ส่งครม.</option>
                </select>
              </div>
              {this.state.motions.map(node => (
                <Link
                  to={`/motion/${node.id}`}
                  css={{ ":hover": { textDecoration: "none" } }}
                >
                  <div
                    css={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                      padding: "2.4rem 0",
                      borderBottom: "var(--cl-gray-3) 1px solid",
                      [media(767)]: {
                        flexWrap: "nowrap",
                      },
                    }}
                  >
                    <div
                      css={{
                        margin: "0 1rem",
                        color: "var(--cl-gray-1)",
                        fontSize: "1.6rem",
                        lineHeight: "3rem",
                        minWidth: "100px",
                      }}
                    >
                      {node.registration_no}
                    </div>
                    <div
                      css={{
                        margin: "0 1rem",
                        fontSize: "2rem",
                        lineHeight: "3rem",
                        flexGrow: "1",
                        color: "var(--cl-black)",
                      }}
                    >
                      {node.name}
                    </div>
                    <div
                      css={{
                        width: "200px",
                        flexShrink: "0",
                        marginLeft: "0",
                        marginTop: "2rem",
                        [media(767)]: {
                          marginLeft: "2rem",
                          marginTop: "0rem",
                        },
                      }}
                    >
                      <MotionStatusChip status={node.status}></MotionStatusChip>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
export default MotionCategoryPage
