import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PeopleCard from "../components/peopleCard"

export const query = graphql`
  query {
    allPeopleYaml(filter: { is_senator: { eq: true } }) {
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

const SenatePage = ({ data }) => {
  const [memberFilter, setMemberFilter] = useState({})
  const [members] = useState(data.allPeopleYaml.edges.map(e => e.node))
  const selectMemberFilter = filter => () => setMemberFilter(filter)

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
        ? a.lastname.localeCompare(b.name, "th")
        : a.name.localeCompare(b.name, "th")
    )
    return selectedMembers
  }

  return (
    <Layout>
      <SEO title="สมาชิกวุฒิสภา" />
      <section css={{ ...cssSection, background: "#eeeeee" }}>
        <h1 css={{ textAlign: "center" }}>สมาชิกวุฒิสภา</h1>
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
              className={[!memberFilter.senator_method ? "active" : ""].join(
                " "
              )}
              role="tab"
              onClick={selectMemberFilter({})}
            >
              ทั้งหมด
            </li>
            <li
              className={[
                memberFilter.senator_method === "โดยตำแหน่ง" ? "active" : "",
              ].join(" ")}
              role="tab"
              onClick={() => {
                setMemberFilter({ senator_method: "โดยตำแหน่ง" })
              }}
            >
              โดยตำแหน่ง
            </li>
            <li
              className={[
                memberFilter.senator_method === "เลือกกันเอง" ? "active" : "",
              ].join(" ")}
              role="tab"
              onClick={selectMemberFilter({ senator_method: "เลือกกันเอง" })}
            >
              สรรหา
            </li>
            <li
              className={[
                memberFilter.senator_method === "เลือกโดย คสช." ? "active" : "",
              ].join(" ")}
              role="tab"
              onClick={selectMemberFilter({ senator_method: "เลือกโดย คสช." })}
            >
              เลือกโดย คสช.
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
