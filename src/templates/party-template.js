import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
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
      party_faction
      total_member
      party_leader
      established_date(formatString: "D MMM YYYY")
      website
      facebook
      twitter
    }
  }
`

const cssH1 = { fontSize: "4.8rem" }
const cssH2 = { fontSize: "2.4rem" }
const cssSection = { paddingBottom: "8rem" }

const PartyPage = ({ data: { partyYaml } }) => (
  <Layout
    pageStyles={{
      background:
        partyYaml.party_faction === "ร่วมรัฐบาล" ? "#ffeeee" : "#eeeeff",
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
              src={`https://elect.in.th/candidates/statics/party-logos/${partyYaml.name}.png`}
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
            <h2 css={{ ...cssH2 }}>เกี่ยวกับพรรค{partyYaml.name}</h2>
            <p>{partyYaml.description || "ไม่มีข้อมูล"}</p>

            {partyYaml.website ? (
              <div>
                <h2>Official Website</h2>
                <p>
                  <a
                    href={partyYaml.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {partyYaml.website}
                  </a>
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

    <section css={{ ...cssSection }}>
      <div className="container">
        <h2 css={{ ...cssH1 }}>สรุปการลงมติล่าสุด</h2>
        <div>Latest vote logs by {partyYaml.en.name} party</div>
      </div>
    </section>

    <section css={{ ...cssSection }}>
      <div className="container">
        <h2 css={{ fontSize: "4.8rem" }}>สมาชิกพรรคในสภา</h2>
        <ul>
          <li>ทั้งหมด</li>
          <li>บัญชีรายชื่อ</li>
          <li>แบ่งเขต</li>
        </ul>
      </div>
    </section>
  </Layout>
)

export default PartyPage
