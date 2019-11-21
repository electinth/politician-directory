import React from "react"
import { graphql } from "gatsby"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { loadCategoryStats, joinPeopleVotelog, peopleSlug } from "../utils"
import StackedBarChart from "../components/stackedBarChart"
import { OfficialWebsite, InOfficeDate } from "../components/profile"
import PeopleCardMini from "../components/peopleCardMini"
import PartyGroupList from "../components/partyGroupList"
import VoteLogCard from "../components/voteLogCard"

import "../styles/profile-book.css"

export const query = graphql`
  query {
    house: partyYaml(party_type: { eq: "สส" }, is_active: { eq: true }) {
      name
      party_ordinal
      description
      established_date
      dissolved_date
      total_member
      speaker
      first_deputy_speaker
      second_deputy_speaker
      opposition_leader
      website
      facebook
      twitter
      email
      phone
      ratchakitcha
      is_active
    }
    allPeopleYaml(filter: { is_mp: { eq: true }, is_active: { eq: true } }) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    mp_type: allPeopleYaml(
      filter: { is_mp: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: mp_type) {
        value: totalCount
        name: fieldValue
      }
    }
    gender: allPeopleYaml(
      filter: { is_mp: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: gender) {
        value: totalCount
        name: fieldValue
      }
    }
    education: allPeopleYaml(
      filter: { is_mp: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: education) {
        value: totalCount
        name: fieldValue
      }
    }
    occupation_group: allPeopleYaml(
      filter: { is_mp: { eq: true }, is_active: { eq: true } }
    ) {
      group(field: occupation_group) {
        value: totalCount
        name: fieldValue
      }
    }
    age: allPeopleYaml(
      filter: { is_mp: { eq: true }, is_active: { eq: true } }
    ) {
      edges {
        node {
          birthdate
        }
      }
    }
    asset: allPeopleYaml(
      filter: { is_mp: { eq: true }, is_active: { eq: true } }
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

const RepresentativesPage = props => {
  const { house, ...data } = props.data

  const {
    mp_type,
    gender,
    age,
    education,
    occupation_group,
    asset,
  } = loadCategoryStats(data)

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
      {
        name: "opposition_leader",
        label: "ผู้นำฝ่ายค้าน",
      },
    ].map((keyPos, id) => {
      if (!house[keyPos.name]) return null
      const nameParts = house[keyPos.name].split(" ")
      const slug = peopleSlug(nameParts.join(" "))
      const name = nameParts[0]
      const lastname = nameParts.slice(1).join(" ")
      const position = keyPos.label
      return { id, name, lastname, position, fields: { slug } }
    })
  )

  const votelogs = joinPeopleVotelog(
    data.allPeopleYaml,
    data.allPeopleVoteYaml,
    data.allVotelogYaml
  ).filter(vote => vote.total_voter > 0)

  return (
    <Layout pageStyles={{ background: "#eeeeee" }}>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>
              {house.name} ชุดที่ {house.party_ordinal}
            </h1>
            <h2 style={{ ...cssEngTitle }}>25th House of Representative</h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{house.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Link</h2>
            <OfficialWebsite {...house}></OfficialWebsite>
            <h2 css={{ ...cssEngTitle }}>In Office</h2>
            <InOfficeDate {...house}></InOfficeDate>
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
              สมาชิกสภาผู้แทนราษฏรจำนวน {data.allPeopleYaml.totalCount} คน
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
            <h2 css={{ ...cssH1 }}>การลงมติล่าสุดของสภาผู้แทนราษฎร</h2>
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
            <PartyGroupList />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default RepresentativesPage
