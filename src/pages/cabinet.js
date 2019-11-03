import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import StackedBarChart from "../components/stackedBarChart"

// Mock for StackedBarChart
const mpTypes = [
  { name: "ส.ส. บัญชีรายชื่อ", background: "#ffffff", value: 315 },
  { name: "ส.ส. เขต", background: "#000000", value: 185 },
]

const genders = [
  { name: "เพศหญิง", background: "#ffffff", value: 125 },
  { name: "เพศชาย", background: "#000000", value: 375 },
]

const ages = [
  { name: "25 - 38 ปี", background: "#eeeeee", value: 71 },
  { name: "25 - 38 ปี", background: "#d5d1d1", value: 181 },
  { name: "39 - 73 ปี", background: "#9a9292", value: 228 },
  { name: "73 - 91 ปี", background: "#222222", value: 10 },
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
