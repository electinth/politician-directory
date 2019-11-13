import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import StackedBarChart from "../components/stackedBarChart"
import { graphql } from "gatsby"
import moment from "moment"

export const query = graphql`
  query {
    gender: allPeopleYaml(filter: { is_cabinet: { eq: true } }) {
      group(field: gender) {
        value: totalCount
        name: fieldValue
      }
    }
    education: allPeopleYaml(filter: { is_cabinet: { eq: true } }) {
      group(field: education) {
        value: totalCount
        name: fieldValue
      }
    }
    occupation_group: allPeopleYaml(filter: { is_cabinet: { eq: true } }) {
      group(field: occupation_group) {
        value: totalCount
        name: fieldValue
      }
    }
    age: allPeopleYaml(filter: { is_cabinet: { eq: true } }) {
      edges {
        node {
          birthdate
        }
      }
    }
  }
`

// Mock for StackedBarChart
const mpTypes = [
  { name: "ส.ส. บัญชีรายชื่อ", background: "#ffffff", value: 315 },
  { name: "ส.ส. เขต", background: "#000000", value: 185 },
]

const genders = [
  { name: "เพศหญิง", background: "#ffffff", value: 125 },
  { name: "เพศชาย", background: "#000000", value: 375 },
]

const ages = [
  { name: "5 - 24 ปี", background: "#eeeeee", value: 71 },
  { name: "25 - 38 ปี", background: "#d5d1d1", value: 181 },
  { name: "39 - 73 ปี", background: "#9a9292", value: 228 },
  { name: "73 - 91 ปี", background: "#222222", value: 10 },
]

const cssSection = {
  paddingTop: "8rem",
  paddingBottom: "5rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
  width: "100%",
}

const cssSectionWhite = {
  ...cssSection,
  background: "var(--cl-white)",
}

const cssPage = {
  width: "50%",
  height: "100%",
  display: "inline-block",
  padding: "0 2rem 0 2rem",
  verticalAlign: "top",
}

const cssH1 = {
  fontSize: "4.8rem",
}

const cssEngTitle = {
  fontSize: "2.4rem",
  textAlign: "left",
  margin: "3rem 0 2rem 0",
}

const cssPageP = {
  fontSize: "1.7rem",
}

const cssBarChart = {
  margin: "1rem 0",
}

const cssLinkBox = {
  fontSize: "1.7rem",
  fontFamily: "var(--ff-title)",
  fontWeight: "bold",
  border: "1px solid var(--cl-black)",
  marginRight: "1rem",
  padding: "0 1rem",
  textDecoration: "none",
  color: "var(--cl-black)",
  "&:hover": {
    textDecoration: "none",
  },
}

function float2Grey(x) {
  x = 1 - x
  x = parseInt(x * 15)
  x = x.toString(16)
  return "#" + x + x + x
}

function calculateBackground(input) {
  let count = input.length - 1
  input.map((x, idx) => {
    x.background = float2Grey(idx / count)
  })
  return input
}

function combineCategory(input) {
  input.sort((a, b) => parseInt(b.value) - parseInt(a.value))
  let temp = []
  let count_others = 0
  input.map((x, idx) => {
    if (idx > 2) {
      count_others += x.value
    } else {
      temp.push(x)
    }
    return x
  })
  temp[temp.length] = { value: count_others, name: "อื่นๆ" }
  input = temp
  return input
}

function padCategory(input) {
  input.map(x => {
    if (x.name.length === 0) {
      x.name = "ไม่พบข้อมูล"
    }
    return x
  })
  return input
}

const CabinetPage = data => {
  console.log(data)
  data = data.data
  let education = data.education.group
  education = calculateBackground(education)

  let occupation_group = data.occupation_group.group
  occupation_group = padCategory(occupation_group)
  occupation_group = combineCategory(occupation_group)
  occupation_group = calculateBackground(occupation_group)

  let gender = data.gender.group
  gender = calculateBackground(gender)

  let _age = data.age.edges
  const ageBin = [39, 52, 65]
  let age = []
  age.push({ name: String("25-" + String(ageBin[0] - 1)) + " ปี", value: 0 })
  age.push({
    name: String(ageBin[0]) + "-" + String(ageBin[1] - 1) + " ปี",
    value: 0,
  })
  age.push({
    name: String(ageBin[1]) + "-" + String(ageBin[2] - 1) + " ปี",
    value: 0,
  })
  age.push({ name: String(">" + ageBin[2]) + " ปี", value: 0 })
  const today = parseInt(moment().format("YYYY"))
  _age.map(x => {
    const y = parseInt(moment(x.node.birthdate).format("YYYY"))
    // let temp = (today - d) / 1000 / 3600 / 24
    // x.value = parseInt(temp)
    const a = today - y
    if (a < ageBin[0]) {
      age[0].value++
    } else if (a < ageBin[1]) {
      age[1].value++
    } else if (a < ageBin[2]) {
      age[2].value++
    } else {
      age[3].value++
    }
    return x
  })

  age = calculateBackground(age)

  return (
    <Layout pageStyles={{ background: "#C0E4FF" }}>
      <SEO title="คณะรัฐมนตรี" />

      <section css={{ ...cssSection }}>
        <div
          style={{
            width: "962px",
            height: "665px",
            margin: "auto",
            backgroundColor: "var(--cl-white)",
            borderRadius: "1rem",
            boxShadow: "5px 5px var(--cl-black)",
          }}
        >
          <div
            style={{
              ...cssPage,
              borderRadius: "1rem 0 0 1rem",
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 72%, rgba(246,246,246,1) 100%)",
            }}
          >
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>คณะรัฐมนตรีไทย</h1>
            <h2 style={{ ...cssEngTitle }}>Cabinet</h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p style={{ ...cssPageP }}>
              เป็นส่วนหนึ่งของฝ่ายนิติบัญญัติ มีสมาชิก (ส.ว.) 250
              คนที่ไม่ได้มาจากการเลือกตั้ง โดย 244 คนมาจากการสรรหา และอีก 6
              คนเป็นสมาชิกโดยตำแหน่ง
              วุฒิสภาชุดดังกล่าวมีอำนาจเพิ่มเติมตามบทเฉพาะกาลของรัฐธรรมนูญให้ร่วมเลือกนายกรัฐมนตรีและเร่งรัดการปฏิรูปประเทศของคณะรัฐมนตรีตลอดจนพิจารณากฎหมายที่เห็นว่าเกี่ยวข้อง
            </p>
            <h2 style={{ ...cssEngTitle }}>Official Website</h2>
            <div style={{ display: "block" }}>
              <a css={{ ...cssLinkBox }} href="https://www.thaigov.go.th/">
                Website
              </a>
              <a
                css={{ ...cssLinkBox }}
                href="https://www.facebook.com/%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%A5%E0%B8%82%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A3%E0%B8%B1%E0%B8%90%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B5-136289490069836/"
              >
                Facebook
              </a>
            </div>
            <h2 style={{ ...cssEngTitle }}>Since</h2>
            <p>01.04.2554</p>
            <h2 style={{ ...cssEngTitle }}>Key Members</h2>
          </div>
          <div style={{ ...cssPage }}>
            <h2
              style={{
                ...cssEngTitle,
                marginTop: "3.5rem",
                marginBottom: "0rem",
              }}
            >
              Members
            </h2>
            <h2
              style={{
                ...cssEngTitle,
                fontFamily: "var(--ff-text)",
                fontWeight: "normal",
              }}
            >
              จำนวนสมาชิกคณะรัฐมนตรี 50 คน
            </h2>
            <div css={{ width: "100%" }}>
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={gender}></StackedBarChart>
              </div>
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={age}></StackedBarChart>
              </div>
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={education}></StackedBarChart>
              </div>
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={occupation_group}></StackedBarChart>
              </div>
            </div>
          </div>
        </div>
        <h2
          style={{ fontSize: "2.4rem", textAlign: "center", marginTop: "6rem" }}
        >
          Last Update: 30.10.2019
        </h2>
      </section>

      <section css={{ ...cssSectionWhite }}></section>
    </Layout>
  )
}

export default CabinetPage
