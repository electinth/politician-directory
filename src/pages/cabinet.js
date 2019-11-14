import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackedBarChart from "../components/stackedBarChart"
import { graphql } from "gatsby"
import moment from "moment"
import PeopleCardMini from "../components/peopleCardMini";
import './cabinet.css'
import { calculateBackground, combineCategory, padCategory, birthdayToAgeHistogram } from "../utils"
import CabinetMemberSection from "../components/CabinetMemberSection"

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
    keyMembers: allPeopleYaml(filter: {id: {in: ["13","15","35","235"]}}) {
      edges {
        node {
          id
          title
          name
          lastname
          party
          party_group
          mp_type
          mp_province
          mp_zone
          mp_list
        }
      }
    }
  }
`

const cssH1 = {
  fontSize: "4.8rem",
}

const cssEngTitle = {
  fontSize: "2.4rem",
  textAlign: "left",
  margin: "1.5rem 0 1.2rem 0",
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

const CabinetPage = data => {

  data = data.data
  let education = data.education.group
  education = calculateBackground(education)

  let occupation_group = data.occupation_group.group
  occupation_group = padCategory(occupation_group)
  occupation_group = combineCategory(occupation_group)
  occupation_group = calculateBackground(occupation_group)

  let gender = data.gender.group
  gender = calculateBackground(gender)

  let birthdate = data.age.edges
  const ageBin = [39, 52, 65]
  let age = birthdayToAgeHistogram(birthdate, ageBin)
  age = calculateBackground(age)

  let keyMembers = data.keyMembers.edges
  let keyPosition = ['ประธาน', 'รองประธานคนที่ 1', 'รองประธานคนที่ 2', 'ผู้นำฝ่ายค้าน']
  let k = []
  keyMembers.map( (x, idx) => {
    let aPerson = x.node
    aPerson.pos = keyPosition[idx]
    k.push(aPerson)
    return x
  })
  keyMembers = k

  return (
    <Layout pageStyles={{ background: "#C0E4FF" }}>
      <SEO title="คณะรัฐมนตรี" />

      <section className="section">
        <div className="book">
          <div className="page leftPage">
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
            {keyMembers.map(x => {
              return (
                <div className="peopleCard" key={x.id}>
                  <PeopleCardMini key={x.id} {...x}/>
                </div>
              )
            })}
            
          </div>
          <div className="page">
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
        <h2 className="lastUpdate">
          Last Update: 30.10.2019
        </h2>
      </section>

      <section className="section" css={{ background: "var(--cl-white)" }}>
        <CabinetMemberSection />
      </section>
    </Layout>
  )
}

export default CabinetPage
