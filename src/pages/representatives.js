import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { partyLogo } from "../utils"
import PeopleCardMini from "../components/peopleCardMini";
import './cabinet.css'
import { calculateBackground, combineCategory, padCategory, birthdayToAgeHistogram } from "../utils"
import StackedBarChart from "../components/stackedBarChart"

export const query = graphql`
  query {
    partyCoalition: allPartyYaml(
      filter: { party_group: { eq: "ร่วมรัฐบาล" } }
    ) {
      totalCount
    }
    partyOpposition: allPartyYaml(filter: { party_group: { eq: "ฝ่ายค้าน" } }) {
      totalCount
    }
    allPartyYaml(filter: { party_type: { eq: "พรรค" } }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          name
          party_group
          total_member
        }
      }
    }
    mp_type: allPeopleYaml(filter: { is_mp: { eq: true } }) {
      group(field: mp_type) {
        value: totalCount
        name: fieldValue
      }
    }
    gender: allPeopleYaml(filter: { is_mp: { eq: true } }) {
      group(field: gender) {
        value: totalCount
        name: fieldValue
      }
    }
    education: allPeopleYaml(filter: { is_mp: { eq: true } }) {
      group(field: education) {
        value: totalCount
        name: fieldValue
      }
    }
    occupation_group: allPeopleYaml(filter: { is_mp: { eq: true } }) {
      group(field: occupation_group) {
        value: totalCount
        name: fieldValue
      }
    }
    age: allPeopleYaml(filter: { is_mp: { eq: true } }) {
      edges {
        node {
          birthdate
        }
      }
    }
    keyMembers: allPeopleYaml(filter: {id: {in: ["105","707","442","408"]}}) {
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

const cssH1 = { fontSize: "4.8rem" }

const cssSection = {
  paddingTop: "3rem",
  paddingBottom: "8rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
}

const cssMPColumn = {
  display: "block",
  padding: "2rem",

  width: `calc(${100 / 2}% - 2rem)`,
  marginBottom: "2rem",
  "&:nth-of-type(2n+1)": {
    marginRight: "2rem",
  },
  h3: {
    textAlign: "left",
    fontSize: "4rem",
    padding: "2rem",
  },
  img: {
    height: "4.5rem",
    width: "4.5rem",
    borderRadius: "50%",
    display: "inline-block",
    verticalAlign: "middle",
  },
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

const RepresentativesPage = ({ data }) => {
  const getSortedParties = partyGroup => {
    let members = data.allPartyYaml.edges.filter(
      ({ node }) => node.party_group === partyGroup
    )
    members.sort(({ node: a }, { node: b }) => b.total_member - a.total_member)
    return members
  }

  let mp_type = data.mp_type.group
  mp_type = calculateBackground(mp_type)

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
  const newOrder = [0,2,3,1]
  keyMembers = newOrder.map(i => keyMembers[i])
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
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <section className="section" css={{ background: "#eeeeee" }}>
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0", fontSize: "3.6rem" }}>สมาชิกสภาผู้แทนราษฎรไทย ชุดที่ 25</h1>
            <h2 style={{ ...cssEngTitle }}>25th House of Representative</h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p style={{ ...cssPageP }}>
            เป็นส่วนหนึ่งของฝ่ายนิติบัญญัติ ที่ได้มาจากการเลือกตั้งทั่วไป พ.ศ. 2562 ประกอบด้วยสมาชิก (ส.ส.) 500 คนตามระบบจัดสรรปันส่วนผสม โดย 350 คนเป็นผู้แทนเขต และอีก 150 คนมาจากระบบบัญชีรายชื่อ ฝ่ายรัฐบาลเป็นรัฐบาลผสมพรรคพลังประชารัฐ ส่วนฝ่ายค้านคือพรรคเพื่อไทยและพรรคร่วมฝ่ายค้านอีก 6 พรรค
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
            <p>01.04.2563</p>
            <h2 style={{ ...cssEngTitle }}>Key Members</h2>
            {keyMembers.map(x => {
              return (
                <div className="peopleCard" key={x.id} style={{marginBottom: "1rem"}}>
                  <PeopleCardMini key={x.id} {...x}/>
                </div>
              )
            })}
          </div>
          <div className="page">
            <h2
              style={{
                ...cssEngTitle,
                marginTop: "2.2rem",
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
              จำนวนสมาชิกผู้แทนราษฏร 500 คน
            </h2>
            <div css={{ width: "100%" }}>
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={mp_type}></StackedBarChart>
              </div>
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
      <section css={{ ...cssSection, background: "var(--cl-white)" }}>
        <div className="container">
          <h2 css={{ ...cssH1 }}>สรุปการลงมติล่าสุด</h2>
        </div>
      </section>
      <section css={{ ...cssSection, background: "#eeeeee" }}>
        <div className="container">
          <div>
            <h3
              css={{
                fontSize: "4.5rem",
                textAlign: "center",
                marginTop: "4rem",
              }}
            >
              สำรวจตามพรรคการเมือง
            </h3>
            <div
              css={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <div css={cssMPColumn}>
                <h3>พรรคร่วมรัฐบาล ({data.partyCoalition.totalCount})</h3>
                <ul>
                  {getSortedParties("ร่วมรัฐบาล").map(({ node }) => (
                    <div key={node.name} css={{ fontSize: "2.2rem" }}>
                      <Link to={node.fields.slug}>
                        <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                        {node.name}
                      </Link>
                      ({node.total_member})
                    </div>
                  ))}
                </ul>
              </div>
              <div css={cssMPColumn}>
                <h3>พรรคฝ่ายค้าน ({data.partyOpposition.totalCount})</h3>
                <ul>
                  {getSortedParties("ฝ่ายค้าน").map(({ node }) => (
                    <div key={node.name} css={{ fontSize: "2.2rem" }}>
                      <Link to={node.fields.slug}>
                        <img src={partyLogo(node.name)} alt={node.name}></img>{" "}
                        {node.name}
                      </Link>
                      ({node.total_member})
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default RepresentativesPage
