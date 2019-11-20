import React, { useState } from "react"
import { graphql } from "gatsby"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { loadCategoryStats } from "../utils"
import StackedBarChart from "../components/stackedBarChart"
import { OfficialWebsite, InOfficeDate } from "../components/profile"
import PeopleCardMini from "../components/peopleCardMini"
import PeopleCard from "../components/peopleCard"

import "../styles/profile-book.css"

export const query = graphql`
  query($slug: String!, $party: String!) {
    party: partyYaml(
      party_type: { eq: "พรรค" }
      fields: { slug: { eq: $slug } }
    ) {
      id
      name
      short_name
      description
      established_date
      dissolved_date
      color
      en {
        name
        description
      }
      party_group
      total_member
      party_leader
      party_secretary
      website
      facebook
      twitter
      email
      phone
      ratchakitcha
      is_active
    }
    allPeopleYaml(
      filter: {
        is_mp: { eq: true }
        party: { eq: $party }
        is_active: { eq: true }
      }
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
          party
          party_group
          mp_type
          mp_province
          mp_zone
          mp_list
        }
      }
    }
    mp_type: allPeopleYaml(
      filter: {
        is_mp: { eq: true }
        party: { eq: $party }
        is_active: { eq: true }
      }
    ) {
      group(field: mp_type) {
        value: totalCount
        name: fieldValue
      }
    }
    gender: allPeopleYaml(
      filter: {
        is_mp: { eq: true }
        party: { eq: $party }
        is_active: { eq: true }
      }
    ) {
      group(field: gender) {
        value: totalCount
        name: fieldValue
      }
    }
    education: allPeopleYaml(
      filter: {
        is_mp: { eq: true }
        party: { eq: $party }
        is_active: { eq: true }
      }
    ) {
      group(field: education) {
        value: totalCount
        name: fieldValue
      }
    }
    occupation_group: allPeopleYaml(
      filter: {
        is_mp: { eq: true }
        party: { eq: $party }
        is_active: { eq: true }
      }
    ) {
      group(field: occupation_group) {
        value: totalCount
        name: fieldValue
      }
    }
    age: allPeopleYaml(
      filter: {
        is_mp: { eq: true }
        party: { eq: $party }
        is_active: { eq: true }
      }
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

const PartyPage = props => {
  const { party, ...data } = props.data

  const [memberFilter, setMemberFilter] = useState({})
  const [members] = useState(data.allPeopleYaml.edges.map(e => e.node))
  const selectMemberFilter = filter => () => setMemberFilter(filter)

  const countMembers = filter => {
    // filter member by mp_type
    let selectedMembers = members.filter(
      member => !filter.mp_type || member.mp_type === filter.mp_type
    )
    return selectedMembers.length
  }
  const getSortedMembers = () => {
    // filter party member by mp_type
    let selectedMembers = members.filter(
      member => !memberFilter.mp_type || member.mp_type === memberFilter.mp_type
    )
    if (memberFilter.mp_type === "บัญชีรายชื่อ") {
      // sort by party list
      selectedMembers.sort((a, b) => a.mp_list - b.mp_list)
    } else if (memberFilter.mp_type === "แบ่งเขต") {
      // sort by province and zone
      selectedMembers.sort((a, b) =>
        a.mp_province === b.mp_province
          ? a.mp_zone - b.mp_zone
          : a.mp_province.localeCompare(b.mp_province, "th")
      )
    } else {
      // sort by name and lastname
      selectedMembers.sort((a, b) =>
        a.name === b.name
          ? a.lastname.localeCompare(b.lastname, "th")
          : a.name.localeCompare(b.name, "th")
      )
    }
    return selectedMembers
  }

  const tabList = [
    {
      id: "ทั้งหมด",
      label: "ทั้งหมด",
      count: countMembers({}),
      filter: {},
      getClass: memberFilter => (!memberFilter.mp_type ? "active" : ""),
    },
    {
      id: "บัญชีรายชื่อ",
      label: "บัญชีรายชื่อ",
      count: countMembers({ mp_type: "บัญชีรายชื่อ" }),
      filter: { mp_type: "บัญชีรายชื่อ" },
      getClass: memberFilter =>
        memberFilter.mp_type === "บัญชีรายชื่อ" ? "active" : "",
    },
    {
      id: "แบ่งเขต",
      label: "แบ่งเขต",
      count: countMembers({ mp_type: "แบ่งเขต" }),
      filter: { mp_type: "แบ่งเขต" },
      getClass: memberFilter =>
        memberFilter.mp_type === "แบ่งเขต" ? "active" : "",
    },
  ]

  const {
    mp_type,
    gender,
    age,
    education,
    occupation_group,
  } = loadCategoryStats(data)

  const keyMembers = _.compact(
    [
      {
        name: "party_leader",
        label: "หัวหน้าพรรค",
      },
      {
        name: "party_secretary",
        label: "เลขาธิการพรรค",
      },
    ].map((keyPos, id) => {
      if (!party[keyPos.name]) return null
      const [name, lastname] = party[keyPos.name].split(" ").slice(-2)
      const position = keyPos.label
      return { id, name, lastname, position }
    })
  )

  const showingMembers = getSortedMembers()

  return (
    <Layout pageStyles={{ background: party.color }}>
      <SEO title={`พรรค${party.name}`} imageUrl="/seo/party.png" />
      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>พรรค{party.name}</h1>
            <h2 style={{ ...cssEngTitle }}>{party.en.name} Party</h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{party.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Link</h2>
            <OfficialWebsite {...party}></OfficialWebsite>
            <h2 css={{ ...cssEngTitle }}>In Office</h2>
            <InOfficeDate {...party}></InOfficeDate>
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
              สมาชิกสภาผู้แทนราษฎรจำนวน {data.allPeopleYaml.totalCount} คน
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
            สมาชิกพรรคในสภา
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
          {showingMembers.length > 0 ? (
            <div
              css={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              {showingMembers.map((member, index) => (
                <PeopleCard key={member.id} {...member} type="mp"></PeopleCard>
              ))}
            </div>
          ) : (
            <div
              css={{
                fontFamily: "var(--ff-title)",
                fontSize: "3.2rem",
                textAlign: "center",
                margin: "6rem 0",
              }}
            >
              ไม่มีสมาชิก
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default PartyPage
