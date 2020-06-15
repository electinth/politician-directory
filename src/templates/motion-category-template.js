import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { motionCategorySlug } from "../utils"

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
    const cssContainer = { width: "1080px", maxWidth: "100%" }
    return (
      <Layout
        pageStyles={{
          background: "#FDFDFD",
        }}
      >
        <SEO title="Motions" />
        <section>
          <div className="container-motion">
            <div
              css={{
                color: "var(--cl-gray-2)",
                textAlign: "right",
                margin: "2rem 0 3.2rem 0",
              }}
            >
              ข้อมูลล่าสุดวันที่ 29 กุมภาพันธ์ 2562
            </div>
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
        <section style={{ marginTop: "8rem" }}>
          <div className="container-motion">
            <div css={cssContainer}>
              <div>
                {this.state.motions.map(node => (
                  <h2>
                    {node.name} {node.registration_no}
                  </h2>
                ))}
              </div>
              <select onChange={this.sort} value={this.sortBy}>
                <option value="asc">อัพเดทใหม่ > เก่า</option>
                <option value="desc">อัพเดทเก่า > ใหม่</option>
                <option value="regis_no_desc">เลขรับญัตติมาก > น้อย</option>
                <option value="regis_no_asc">เลขรับญัตติน้อย > มาก</option>
              </select>
              <select onChange={this.filter} value={this.filterBy}>
                <option value="all">ทุกสถานะ</option>
                <option value="agenda_in_line">รอบรรจุวาระ</option>
                <option value="mp_considering">สภาผู้แทนพิจารณา</option>
                <option value="committee_formed">ตั้ง กมธ. วิสามัญ</option>
                <option value="rejected">ไม่ตั้ง กมธ. วิสามัญ</option>
                <option value="to_cabinet">ส่งครม.</option>
              </select>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
export default MotionCategoryPage
