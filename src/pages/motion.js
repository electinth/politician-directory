import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { media } from "../styles"
import BarChart from "../components/motion/barchart"
import StatusBarChart from "../components/motion/statusBarChart"

const cssMainSection = {
  display: "block",
  padding: "2rem 2rem",
  [media(767)]: {
    display: "block",
  },
}

const MotionPage = ({ data }) => {
  return (
    <Layout
      pageStyles={{
        background: "var(--cl-motion-section)",
      }}
    >
      <SEO title="Home" />
      <section css={{ ...cssMainSection }}>
        <h1>Motion</h1>
        <BarChart
          data={[
            { category: "การเกษตร", count: 24 },
            { category: "การศึกษา", count: 21 },
            { category: "กฎหมาย", count: 17 },
            { category: "เศรษฐกิจ", count: 16 },
            { category: "สิทธิมนุษยชน", count: 13 },
            { category: "สังคม", count: 10 },
            { category: "อื่นๆ", count: 6 },
          ]}
          xTicks={[0, 5, 10, 15, 20, 25]}
        />
        <StatusBarChart
          width={`${25}%`}
          data={[
            { status: "วาระพิจารณาในกมธ.", count: 30 },
            { status: "รอบรรจุ", count: 20 },
            { status: "ระหว่างการพิจารณา", count: 23 },
          ]}
        />

        <StatusBarChart
          width={`${(25 * 4) / 3}%`}
          data={[
            { status: "ส่งรมต", count: 30 },
            { status: "ตั้งกมธ.วิสามัญ", count: 17 },
            { status: "ไม่ผ่าน", count: 12 },
            { status: "อื่นๆ", count: 23 },
          ]}
        />
      </section>
    </Layout>
  )
}

export default MotionPage
