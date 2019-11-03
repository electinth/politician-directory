import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import StackedBarChart from "../components/stackedBarChart"

// Mock for StackedBarChart
const mpTypes = [
  { name: "ส.ส.บัญชีรายชื่อ", background: "#000000", value: 33 },
  { name: "ส.ส.เขต", background: "#000000", value: 20 },
]

const genders = [
  { name: "หญิง", background: "#ffffff", value: 15 },
  { name: "ชาย", background: "#000000", value: 38 },
]

const ages = [
  { name: "20-29", background: "#eeeeee", value: 11 },
  { name: "30-39", background: "#d5d1d1", value: 12 },
  { name: "40-49", background: "#c1bbbb", value: 11 },
  { name: "50-59", background: "#9a9292", value: 11 },
  { name: "60+", background: "#222222", value: 8 },
]

const CabinetPage = () => (
  <Layout
    pageStyles={{
      background: "#ccffff",
    }}
  >
    <SEO title="คณะรัฐมนตรี" />
    <h1
      css={{
        marginTop: 0,
        paddingTop: "6rem",
      }}
    >
      คณะรัฐมนตรี
    </h1>
    <h2>Cabinet</h2>

    <div css={{ width: "500px" }}>
      <StackedBarChart data={mpTypes}></StackedBarChart>
      <StackedBarChart data={genders}></StackedBarChart>
      <StackedBarChart data={ages}></StackedBarChart>
    </div>
  </Layout>
)

export default CabinetPage
