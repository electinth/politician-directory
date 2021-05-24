import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const archivePages = [
  {
    name: "การพิจารณาญัตติตั้งคณะกรรมธิการวิสามัญ",
    description: "ข้อมูลในช่วง 1 มิถุนายน 2562 - 25 กันยายน 2563",
    page: "/motions",
  },
  {
    name: "คะแนนจิตพิสัย ส.ว.",
    description: "ข้อมูลในช่วง 5 สิงหาคม 2562 - 24 กุมภาพันธ์ 2563",
    page: "/senate/score",
  },
]

const Archive = () => (
  <Layout>
    <SEO title="Archive" />
    <section
      css={{
        fontSize: "1.8rem",
        padding: "4rem 2rem 0",
        backgroundColor: "var(--cl-pink)",
        padding: "4rem 0 6rem 0",
      }}
    >
      <h1
        css={{
          fontSize: "6rem",
          textAlign: "center",
        }}
      >
        Archives
      </h1>
    </section>
    <section style={{ maxWidth: 720, margin: "0 auto" }}>
      {archivePages.map(({ name, description, page }) => (
        <Link
          to={page}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            margin: "3rem 1rem",
            border: "2px solid var(--cl-black)",
            borderRadius: "10px",
            backgroundColor: "var(--cl-white)",
          }}
        >
          <h2 style={{ fontSize: "2.4rem" }}>{name}</h2>
          <p style={{ margin: 0 }}>{description}</p>
        </Link>
      ))}
    </section>
  </Layout>
)

export default Archive
