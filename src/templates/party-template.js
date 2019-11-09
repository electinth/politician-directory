import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/externalLink"
import { partyLogo, politicianPicture } from "../utils"

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
    let members = partyMembers.filter(
      member => !memberFilter.mp_type || member.mp_type === memberFilter.mp_type
    )
    if (memberFilter.mp_type === "บัญชีรายชื่อ") {
      members.sort((a, b) => a.mp_list - b.mp_list)
    } else if (memberFilter.mp_type === "แบ่งเขต") {
      members.sort((a, b) =>
        a.mp_province === b.mp_province
          ? a.mp_zone - b.mp_zone
          : a.mp_province > b.mp_province
          ? 1
          : -1
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
              {" "}
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
              <div
                key={member.id}
                css={{
                  display: "block",
                  flex: "1 1 360px",
                  padding: "4rem",
                  paddingRight: "2rem",
                  border: "1px solid var(--cl-gray-2)",
                  borderRadius: "1rem",
                  background: "var(--cl-white)",
                  marginBottom: "1rem",
                  fontSize: "1.8rem",
                  "&:nth-child(2n+1)": {
                    marginRight: "1rem",
                  },
                }}
              >
                <div>
                  <Link to={`/people/${member.name}-${member.lastname}`}>
                    <div
                      css={{
                        borderRadius: 84,
                        width: 84,
                        height: 84,
                        float: "left",
                        marginBottom: 0,
                        marginRight: "2rem",
                        border: "2px solid var(--cl-black)",
                        background: "var(--cl-gray-2) no-repeat",
                        backgroundSize: "cover",
                      }}
                      style={{
                        backgroundImage: `url(${politicianPicture(member)})`,
                      }}
                    ></div>
                  </Link>
                </div>
                <div
                  css={{
                    fontFamily: "var(--ff-title)",
                    fontSize: "2.4rem",
                    a: { color: "inherit" },
                  }}
                >
                  <Link to={`/people/${member.name}-${member.lastname}`}>
                    {`${member.title} ${member.name} ${member.lastname}`}
                  </Link>
                </div>
                <div>
                  {member.mp_type === "บัญชีรายชื่อ"
                    ? `ส.ส. ${member.mp_type} ลำดับที่ ${member.mp_list}`
                    : `ส.ส. ${member.mp_type} จังหวัด${member.mp_province} เขต ${member.mp_zone}`}
                </div>
                <div>พรรค{`${member.party}`}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PartyPage
