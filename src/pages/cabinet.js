import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { loadCategoryStats, formatOrdinalNumber } from "../utils"
import StackedBarChart from "../components/stackedBarChart"
import { OfficialWebsite, InOfficeDate } from "../components/profile"
import CabinetMemberSection from "../components/cabinetMemberSection"
import { media } from "../styles"

import "../styles/profile-book.css"

export const query = graphql`
  query {
    cabinet: partyYaml(party_type: { eq: "ครม" }) {
      name
      party_ordinal
      description
      established_date
      dissolved_date
      website
      facebook
      twitter
      is_active
    }
    allPeopleYaml(
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
    asset: allPeopleYaml(
      filter: { is_cabinet: { eq: true }, is_active: { eq: true } }
    ) {
      edges {
        node {
          asset
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

const CabinetPage = props => {
  const { cabinet, ...data } = props.data
  const { gender, age, education, occupation_group, asset } = loadCategoryStats(
    data
  )

  return (
    <Layout pageStyles={{ background: "#c0e4ff" }}>
      <Seo title="คณะรัฐมนตรี" />

      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>
              {cabinet.name} ชุดที่ {cabinet.party_ordinal}
            </h1>
            <h2 style={{ ...cssEngTitle }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatOrdinalNumber(cabinet.party_ordinal),
                }}
              />{" "}
              Cabinet
            </h2>
            <h2 css={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{cabinet.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Link</h2>
            <OfficialWebsite {...cabinet}></OfficialWebsite>
            <h2 css={{ ...cssEngTitle }}>In Office</h2>
            <InOfficeDate {...cabinet}></InOfficeDate>
          </div>
          <div className="page">
            <h2
              css={{
                ...cssEngTitle,
                [media(767)]: {
                  marginTop: "11rem",
                  marginBottom: "0rem",
                },
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
              คณะรัฐมนตรีจำนวน {data.allPeopleYaml.totalCount} คน
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
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={asset}></StackedBarChart>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" css={{ background: "var(--cl-white)" }}>
        <h1 css={{ fontSize: "4.8rem", textAlign: "center" }}>สมาชิกทั้งหมด</h1>
        <div className="container">
          <CabinetMemberSection />
        </div>
      </section>
    </Layout>
  )
}

export default CabinetPage
