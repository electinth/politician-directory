import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import SegmentBar, { SegmentProp } from "../components/segmentBar"

// Mock for SegmentBar
const mpTypes = [
  new SegmentProp("ส.ส.บัญชีรายชื่อ", "#000000", "#ffffff", 33),
  new SegmentProp("ส.ส.เขต", "#ffffff", "#000000", 20),
]

const genders = [
  new SegmentProp("หญิง", "#000000", "#ffffff", 15),
  new SegmentProp("ชาย", "#ffffff", "#000000", 38),
]

const ages = [
  new SegmentProp("20-29", "#000000", "#eeeeee", 11),
  new SegmentProp("30-39", "#000000", "#d5d1d1", 12),
  new SegmentProp("40-49", "#000000", "#c1bbbb", 11),
  new SegmentProp("50-59", "#000000", "#9a9292", 11),
  new SegmentProp("60+", "#ffffff", "#222222", 8),
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
      <SegmentBar segmentProps={mpTypes}></SegmentBar>
      <SegmentBar segmentProps={genders}></SegmentBar>
      <SegmentBar segmentProps={ages}></SegmentBar>
    </div>
  </Layout>
)

export default CabinetPage
