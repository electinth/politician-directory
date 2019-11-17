import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./cabinet.css"
import { loadCategoryStats } from "../utils"
import StackedBarChart from "../components/stackedBarChart"
import { OfficialWebsite, InOfficeDate } from "../components/profile"
import PeopleCardMini from "../components/peopleCardMini"
import PeopleCard from "../components/peopleCard"

export const query = graphql`
  query {
    senate: partyYaml(party_type: { eq: "สว" }, is_active: { eq: true }) {
      name
      party_ordinal
      description
      established_date
      dissolved_date
      total_member
      speaker
      first_deputy_speaker
      second_deputy_speaker
      website
      facebook
      twitter
      email
      phone
      ratchakitcha
      is_active
    }
    allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          name
          lastname
          senator_method
        }
      }
    }
    gender: allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: gender) {
        value: totalCount
        name: fieldValue
      }
    }
    education: allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: education) {
        value: totalCount
        name: fieldValue
      }
    }
    occupation_group: allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: occupation_group) {
        value: totalCount
        name: fieldValue
      }
    }
    age: allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
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

const cssSection = {
  paddingTop: "3rem",
  paddingBottom: "8rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
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

const SenatePage = props => {
  const { senate, ...data } = props.data

  const [memberFilter, setMemberFilter] = useState({})
  const [members] = useState(data.allPeopleYaml.edges.map(e => e.node))
  const selectMemberFilter = filter => () => setMemberFilter(filter)

  const countMembers = filter => {
    // filter member by senator_method
    let selectedMembers = members.filter(
      member =>
        !filter.senator_method ||
        member.senator_method === filter.senator_method
    )
    return selectedMembers.length
  }

  const getSortedMembers = filter => {
    filter = filter || memberFilter
    // filter member by senator_method
    let selectedMembers = members.filter(
      member =>
        !memberFilter.senator_method ||
        member.senator_method === memberFilter.senator_method
    )
    // sort by name and lastname
    selectedMembers.sort((a, b) =>
      a.name === b.name
        ? a.lastname.localeCompare(b.lastname, "th")
        : a.name.localeCompare(b.name, "th")
    )
    return selectedMembers
  }

  const tabList = [
    {
      id: "ทั้งหมด",
      label: "ทั้งหมด",
      count: countMembers({}),
      filter: {},
      getClass: memberFilter => (!memberFilter.senator_method ? "active" : ""),
    },
    {
      id: "โดยตำแหน่ง",
      label: "โดยตำแหน่ง",
      count: countMembers({ senator_method: "โดยตำแหน่ง" }),
      filter: { senator_method: "โดยตำแหน่ง" },
      getClass: memberFilter =>
        memberFilter.senator_method === "โดยตำแหน่ง" ? "active" : "",
    },
    {
      id: "เลือกกันเอง",
      label: "สรรหา",
      count: countMembers({ senator_method: "เลือกกันเอง" }),
      filter: { senator_method: "เลือกกันเอง" },
      getClass: memberFilter =>
        memberFilter.senator_method === "เลือกกันเอง" ? "active" : "",
    },
    {
      id: "เลือกโดย คสช.",
      label: "เลือกโดย คสช.",
      count: countMembers({ senator_method: "เลือกโดย คสช." }),
      filter: { senator_method: "เลือกโดย คสช." },
      getClass: memberFilter =>
        memberFilter.senator_method === "เลือกโดย คสช." ? "active" : "",
    },
  ]

  const { gender, age, education, occupation_group } = loadCategoryStats(data)

  const keyMembers = [
    {
      name: "speaker",
      label: "ประธานสภา",
    },
    {
      name: "first_deputy_speaker",
      label: "รองประธานสภา คนที่ 1",
    },
    {
      name: "second_deputy_speaker",
      label: "รองประธานสภา คนที่ 2",
    },
  ].map((keyPos, id) => {
    const [name, lastname] = senate[keyPos.name].split(" ")
    const position = keyPos.label
    return { id, name, lastname, position }
  })

  return (
    <Layout pageStyles={{ background: "#edf087" }}>
      <SEO title="สมาชิกวุฒิสภา" />
      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>
              {senate.name} ชุดที่ {senate.party_ordinal}
            </h1>
            <h2 style={{ ...cssEngTitle }}>Senate</h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{senate.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Website</h2>
            <OfficialWebsite {...senate}></OfficialWebsite>
            <h2 css={{ ...cssEngTitle }}>In Office</h2>
            <InOfficeDate {...senate}></InOfficeDate>
            <h2 style={{ ...cssEngTitle }}>Key Members</h2>
            {keyMembers.map(x => {
              return (
                <div className="peopleCard" key={x.id}>
                  <PeopleCardMini key={x.id} {...x} />
                </div>
              )
            })}
          </div>
          <div className="page">
            <h2
              style={{
                ...cssEngTitle,
                marginTop: "11.1rem",
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
              สมาชิกวุฒิสภาจำนวน {data.allPeopleYaml.totalCount} คน
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
      </section>
      <section css={{ ...cssSection, background: "var(--cl-white)" }}>
        <div className="container">
          <h2 css={{ ...cssH1 }}>สรุปการลงมติล่าสุด</h2>
        </div>
      </section>
      <section css={{ ...cssSection, background: "#eeeeee" }}>
        <div className="container">
          <h2
            css={{
              fontSize: "4.8rem",
              textAlign: "center",
              paddingTop: "6rem",
            }}
          >
            สมาชิกทั้งหมด
          </h2>
          <ul
            css={{
              display: "block",
              listStyle: "none",
              textAlign: "center",
              "> li": {
                display: "inline-block",
                fontSize: "2.4rem",
                padding: "1rem 0 0",
                margin: "0 1rem",
                cursor: "pointer",
                "&.active": {
                  borderBottom: "8px solid var(--cl-black)",
                },
              },
            }}
          >
            {tabList.map(tab => (
              <li
                key={tab.id}
                className={[tab.getClass(memberFilter)].join(" ")}
                role="tab"
                onClick={selectMemberFilter(tab.filter)}
              >
                {tab.label} ({tab.count})
              </li>
            ))}
          </ul>
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {getSortedMembers().map((member, index) => (
              <PeopleCard
                key={member.id}
                {...member}
                type="senator"
              ></PeopleCard>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SenatePage
