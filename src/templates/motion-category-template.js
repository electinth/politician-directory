import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

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
    this.state = {
      motions: this.allMotions,
    }
  }

  sort = event => {
    const sortBy = event.target.value
    if (sortBy === "asc") {
      this.setState({
        motions: [...this.allMotions].sort(
          (a, b) => parseInt(a.id) > parseInt(b.id)
        ),
      })
    } else if (sortBy === "desc") {
      this.setState({
        motions: [...this.allMotions].sort(
          (a, b) => parseInt(a.id) < parseInt(b.id)
        ),
      })
    } else if (sortBy === "regis_no_desc") {
      this.setState({ motions: [...this.allMotions].sort(this.regisNoDesc) })
    } else if (sortBy === "regis_no_asc") {
      this.setState({ motions: [...this.allMotions].sort(this.regisNoAsc) })
    }
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
        <section style={{ marginTop: "8rem" }}>
          <div className="container-motion">
            <div>
              {this.state.motions.map(node => (
                <h2>
                  {node.name} {node.registration_no}
                </h2>
              ))}
            </div>
            <select onChange={this.sort}>
              <option value="asc">อัพเดทใหม่ > เก่า</option>
              <option value="desc">อัพเดทเก่า > ใหม่</option>
              <option value="regis_no_desc">เลขรับญัตติมาก > น้อย</option>
              <option value="regis_no_asc">เลขรับญัตติน้อย > มาก</option>
            </select>
          </div>
        </section>
      </Layout>
    )
  }
}
export default MotionCategoryPage
