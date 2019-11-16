import React from "react"
import { graphql, Link } from "gatsby"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StackedBarChart from "../components/stackedBarChart"
import {
  formatDate,
  combineCategory,
  padCategory,
  birthdayToAgeHistogram,
} from "../utils"
import CabinetMemberSection from "../components/cabinetMemberSection"

import "./cabinet.css"

export const query = graphql`
  query {
    cabinet: partyYaml(party_type: { eq: "ครม" }) {
      name
      party_ordinal
      description
      established_date
      dissolved_date
      total_member
      prime_minister
      deputy_prime_minister
      website
      facebook
      twitter
      email
      phone
      ratchakitcha
      is_active
    }
    allMember: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      totalCount
    }
    gender: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: gender) {
        value: totalCount
        name: fieldValue
      }
    }
    education: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: education) {
        value: totalCount
        name: fieldValue
      }
    }
    occupation_group: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: occupation_group) {
        value: totalCount
        name: fieldValue
      }
    }
    age: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      edges {
        node {
          birthdate
        }
      }
    }
  }
`

const cssH1 = {
  fontSize: "4rem",
}

const cssEngTitle = {
  fontSize: "2.4rem",
  textAlign: "left",
  margin: "1.5rem 0 1.2rem 0",
}

const cssPageP = {}

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

/**
 * Template is an ordered list of columns to sort and set color
 * template = [
 *   { name: 'Male', label: 'เพศชาย', background: 'blue' },
 *   { name: 'Female', label: 'เพศหญฺิง', background: 'red' },
 * ]
 *
 * Where
 * - `name` is a group value to match
 * - `label`, if specified, use this value as a label name instead of value of `name`
 * - `background` set color for this stack
 * @param {*} data
 * @param {Array} template
 */
function arrangeData(data, template, options = {}) {
  options = {
    valueKey: "name",
    ...options,
  }
  return _.compact(
    template.map((col, i) => {
      const item = _.find(data, [options.valueKey, col.name])
      if (!item) return null
      return {
        ...item,
        name: col.label || col.name,
        background: col.background,
      }
    })
  )
}

const CabinetPage = props => {
  const { cabinet, ...data } = props.data

  let education = [...data.education.group]
  education = arrangeData(education, [
    { name: "ต่ำกว่าปริญญาตรี", background: "var(--cl-theme-1)" },
    { name: "สถาบันทหาร", background: "var(--cl-theme-2)" },
    { name: "ปริญญาตรี", background: "var(--cl-theme-3)" },
    { name: "ปริญญาโท", background: "var(--cl-theme-4)" },
    { name: "ปริญญาเอก", background: "var(--cl-theme-5)" },
    { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
  ])

  let occupation_group = [...data.occupation_group.group]
  occupation_group = padCategory(occupation_group)
  occupation_group = combineCategory(occupation_group)
  occupation_group = arrangeData(occupation_group, [
    ...occupation_group.slice(0, 3).map((group, i) => ({
      name: group.name,
      background: `var(--cl-theme-${2 + i})`,
    })),
    { name: "อื่นๆ", background: "var(--cl-theme-5)" },
    { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
  ])

  let gender = [...data.gender.group]
  gender = arrangeData(gender, [
    { name: "ชาย", background: "var(--cl-theme-2)" },
    { name: "หญิง", background: "var(--cl-theme-5)" },
    { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
  ])

  let birthdate = [...data.age.edges]
  let age = birthdayToAgeHistogram(birthdate)
  age = arrangeData(age, [
    { name: "25-38 ปี", background: "var(--cl-theme-2)" },
    { name: "39-54 ปี", background: "var(--cl-theme-3)" },
    { name: "55-73 ปี", background: "var(--cl-theme-4)" },
    { name: "74 ปีขึ้นไป", background: "var(--cl-theme-5)" },
    { name: "ไม่พบข้อมูล", background: "var(--cl-theme-unknown)" },
  ])

  // component to show official websites
  const OfficialWebsite = () => {
    const items = _.compact(
      ["website", "facebook", "twitter"].map(key => {
        const official = cabinet[key]
        if (!official) return null
        return (
          <Link to={official} css={{ ...cssLinkBox }}>
            {_.startCase(key)}
          </Link>
        )
      })
    )
    return <div>{items.length > 0 ? items : "ไม่มีข้อมูล"}</div>
  }

  // component to show active date range
  const ActiveDateRange = () => {
    const range = [cabinet.established_date, cabinet.dissolved_date]
    if (range[0]) range[0] = formatDate(range[0])
    if (range[1]) range[1] = formatDate(range[1])
    else range[1] = "Now"

    return (
      <p>
        {range[0]} - {range[1]}
      </p>
    )
  }

  return (
    <Layout pageStyles={{ background: "#C0E4FF" }}>
      <SEO title="คณะรัฐมนตรี" />

      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>
              {cabinet.name} ชุดที่ {cabinet.party_ordinal}
            </h1>
            <h2 css={{ ...cssEngTitle }}>Cabinet</h2>
            <h2 css={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{cabinet.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Website</h2>
            <OfficialWebsite></OfficialWebsite>
            <h2 css={{ ...cssEngTitle }}>In Office</h2>
            <ActiveDateRange></ActiveDateRange>
          </div>
          <div className="page">
            <h2
              css={{
                ...cssEngTitle,
                marginTop: "11.1rem",
                marginBottom: "0rem",
              }}
            >
              Members
            </h2>
            <h2
              css={{
                ...cssEngTitle,
                fontFamily: "var(--ff-text)",
                fontWeight: "normal",
              }}
            >
              คณะรัฐมนตรีจำนวน {data.allMember.totalCount} คน
            </h2>
            <div css={{ width: "100%" }}>
              <div css={{ ...cssBarChart }}>
                <StackedBarChart data={gender}></StackedBarChart>
              </div>
              <div css={{ ...cssBarChart }}>
                <StackedBarChart data={age}></StackedBarChart>
              </div>
              <div css={{ ...cssBarChart }}>
                <StackedBarChart data={education}></StackedBarChart>
              </div>
              <div css={{ ...cssBarChart }}>
                <StackedBarChart data={occupation_group}></StackedBarChart>
              </div>
            </div>
          </div>
        </div>
        <h2 className="lastUpdate">Last Update: 30.10.2019</h2>
      </section>

      <section className="section" css={{ background: "var(--cl-white)" }}>
        <CabinetMemberSection />
      </section>
    </Layout>
  )
}

export default CabinetPage
