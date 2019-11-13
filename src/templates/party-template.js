import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/externalLink"
import PeopleCard from "../components/peopleCard"
import { partyLogo } from "../utils"

export const query = graphql`
  query($slug: String!, $party: String!) {
    partyYaml(party_type: { eq: "พรรค" }, fields: { slug: { eq: $slug } }) {
      id
      name
      short_name
      description
      color
      en {
        name
        description
      }
      party_group
      total_member
      party_leader
      established_date(formatString: "D MMM YYYY")
      website
      facebook
      twitter
    }
    allPeopleYaml(filter: { party: { eq: $party } }) {
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
const cssH2 = { fontSize: "2.4rem" }
const cssSection = { paddingBottom: "8rem" }

const PartyPage = ({ data: { partyYaml, allPeopleYaml } }) => {
  const [memberFilter, setMemberFilter] = useState({})
  const [partyMembers] = useState(allPeopleYaml.edges.map(e => e.node))
  const selectMemberFilter = filter => () => setMemberFilter(filter)

  const getSortedMembers = () => {
    // filter party member by mp_type
    let members = partyMembers.filter(
      member => !memberFilter.mp_type || member.mp_type === memberFilter.mp_type
    )
    if (memberFilter.mp_type === "บัญชีรายชื่อ") {
      // sort by party list
      members.sort((a, b) => a.mp_list - b.mp_list)
    } else if (memberFilter.mp_type === "แบ่งเขต") {
      // sort by province and zone
      members.sort((a, b) =>
        a.mp_province === b.mp_province
          ? a.mp_zone - b.mp_zone
          : a.mp_province.localeCompare(b.mp_province, "th")
      )
    } else {
      // sort by name and lastname
      members.sort((a, b) =>
        a.name === b.name
          ? a.lastname.localeCompare(b.name, "th")
          : a.name.localeCompare(b.name, "th")
      )
    }
    return members
  }

  return (
    <Layout
      pageStyles={{
        background: partyYaml.color,
      }}
    >
      <SEO title="พรรค" />
      <section css={{ ...cssSection }}>
        <div className="container">
          <div
            css={{
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "6rem",
            }}
          >
            <div css={{ flex: "1 0 0" }}>
              <h1
                css={{
                  marginTop: 0,
                  marginBottom: "1rem",
                  ...cssH1,
                }}
              >
                พรรค{`${partyYaml.name}`}{" "}
                {partyYaml.short_name ? `(${partyYaml.short_name})` : null}
              </h1>
              <div css={{ marginBottom: "4rem", ...cssH2 }}>
                {partyYaml.en.name} Party
              </div>
            </div>
            <div css={{ width: 100 }}>
              <img
                css={{ width: "100%" }}
                src={partyLogo(partyYaml.name)}
                alt={partyYaml.name}
              ></img>
            </div>
          </div>

          <div
            css={{
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "6rem",
            }}
          >
            <div css={{ width: "50%" }}>
              <hr></hr>
              <h2 css={{ ...cssH2 }}>เกี่ยวกับพรรค{partyYaml.name}</h2>
              <p>{partyYaml.description || "ไม่มีข้อมูล"}</p>

              {partyYaml.website ? (
                <div>
                  <h2>Official Website</h2>
                  <p>
                    <ExternalLink href={partyYaml.website}>
                      {partyYaml.website}
                    </ExternalLink>
                  </p>
                </div>
              ) : null}

              {partyYaml.established_date ? (
                <div>
                  <h2>ก่อตั้งเมื่อ</h2>
                  <p>{partyYaml.established_date}</p>
                </div>
              ) : null}

              {partyYaml.party_leader ? (
                <div>
                  <h2>หัวหน้าพรรค</h2>
                  <p>{partyYaml.party_leader}</p>
                </div>
              ) : null}
            </div>

            <div css={{ width: "50%" }}>
              <h2 css={{ ...cssH2 }}>สมาชิกพรรค</h2>
              <p>จำนวนสมาชิกสภาผู้แทนราษฎร {partyYaml.total_member} คน</p>

              <h2>ส.ส. บัญชีรายชื่อ / แบ่งเขต</h2>
              <h2>เพศ</h2>
              <h2>ช่วงอายุ</h2>
              <h2>การศึกษา</h2>
            </div>
          </div>
        </div>
      </section>

      <section css={{ ...cssSection, background: "var(--cl-white)" }}>
        <div className="container">
          <h2 css={{ ...cssH1 }}>สรุปการลงมติล่าสุด</h2>
          <div>Latest vote logs by {partyYaml.en.name} party</div>
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
                fontSize: "3.2rem",
                padding: "1rem 2rem",
                cursor: "pointer",
                "&.active": {
                  borderBottom: "8px solid var(--cl-black)",
                },
              },
            }}
          >
            <li
              className={[!memberFilter.mp_type ? "active" : ""].join(" ")}
              role="tab"
              onClick={selectMemberFilter({})}
            >
              ทั้งหมด
            </li>
            <li
              className={[
                memberFilter.mp_type === "บัญชีรายชื่อ" ? "active" : "",
              ].join(" ")}
              role="tab"
              onClick={() => {
                setMemberFilter({ mp_type: "บัญชีรายชื่อ" })
              }}
            >
              บัญชีรายชื่อ
            </li>
            <li
              className={[
                memberFilter.mp_type === "แบ่งเขต" ? "active" : "",
              ].join(" ")}
              role="tab"
              onClick={selectMemberFilter({ mp_type: "แบ่งเขต" })}
            >
              แบ่งเขต
            </li>
          </ul>
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {getSortedMembers().map((member, index) => (
              <PeopleCard key={member.id} {...member} type="mp"></PeopleCard>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PartyPage
