import React, { useState } from "react"
import { graphql } from "gatsby"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  loadCategoryStats,
  joinPeopleVotelog,
  peopleSlug,
  formatOrdinalNumber,
} from "../utils"
import StackedBarChart from "../components/stackedBarChart"
import { OfficialWebsite, InOfficeDate } from "../components/profile"
import PeopleCardMini from "../components/peopleCardMini"
import PeopleCard from "../components/peopleCard"
import VoteLogCard from "../components/voteLogCard"
import { media } from "../styles"

import "../styles/profile-book.css"

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
    asset: allPeopleYaml(
      filter: { is_senator: { eq: true }, is_active: { eq: true } }
    ) {
      edges {
        node {
          asset
        }
      }
    }
    allVotelogYaml(
      filter: { is_active: { eq: true } }
      limit: 6
      sort: { fields: vote_date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          description_th
          passed
          vote_date
        }
      }
    }
    allPeopleVoteYaml {
      edges {
        node {
          id
          votelog {
            key
            value
          }
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

  const getSortedMembers = () => {
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

  const { gender, age, education, occupation_group, asset } = loadCategoryStats(
    data
  )

  const keyMembers = _.compact(
    [
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
      if (!senate[keyPos.name]) return null
      const nameParts = senate[keyPos.name].split(" ")
      const slug = peopleSlug(nameParts.join(" "))
      const name = nameParts[0]
      const lastname = nameParts.slice(1).join(" ")
      const position = keyPos.label
      return { id, name, lastname, position, fields: { slug } }
    })
  )

  const showingMembers = getSortedMembers()

  const votelogs = joinPeopleVotelog(
    data.allPeopleYaml,
    data.allPeopleVoteYaml,
    data.allVotelogYaml
  ).filter(vote => vote.total_voter > 0)

  return (
    <Layout pageStyles={{ background: "#edf087" }}>
      <SEO title="สมาชิกวุฒิสภา" />
      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>
              {senate.name} ชุดที่ {senate.party_ordinal}
            </h1>
            <h2 style={{ ...cssEngTitle }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatOrdinalNumber(senate.party_ordinal),
                }}
              />{" "}
              Senate
            </h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{senate.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Link</h2>
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
                [media(767)]: {
                  marginTop: "11rem",
                  marginBottom: "0rem",
                },
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
              <div style={{ ...cssBarChart }}>
                <StackedBarChart data={asset}></StackedBarChart>
              </div>
            </div>
          </div>
        </div>
      </section>

      {votelogs.length > 0 ? (
        <section css={{ ...cssSection, background: "var(--cl-white)" }}>
          <div className="container">
            <h2 css={{ ...cssH1 }}>การลงมติล่าสุดของวุฒิสภา</h2>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexWrap: "wrap",
                marginTop: "6rem",
              }}
            >
              {votelogs.map(node => (
                <VoteLogCard
                  key={node.id}
                  view={"compact"}
                  css={{
                    width: `calc((var(--container-width) - 4rem) / 2)`,
                    margin: "0 1rem 2rem 1rem",
                  }}
                  title={node.title}
                  description_th={node.description_th}
                  passed={node.passed}
                  approve={node.approve}
                  disprove={node.disprove}
                  abstained={node.abstained}
                  absent={node.absent}
                  total_voter={node.total_voter}
                  vote_date={node.vote_date}
                  slug={node.fields.slug}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
          {showingMembers.length > 0 ? (
            <div
              css={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              {showingMembers.map((member, index) => (
                <PeopleCard
                  key={member.id}
                  {...member}
                  type="senator"
                ></PeopleCard>
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

export default SenatePage
