import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { media } from "../styles"

const cssMainSection = {
  display: "flex",
  flexDirection: "column",
  padding: "0 0",
  [media(767)]: {
    flexDirection: "row",
  },
}

const cssContentSection = {
  display: "grid",
  gridTemplateColumns: "1fr 12rem",
  gridTemplateRows: "1fr 12rem",
  gap: "0 2rem",
  gridTemplateAreas: `"content link" "content image"`,
  justifyItems: "stretch",
  padding: "0 0",

  ".content": {
    gridArea: "content",
    padding: "2rem 0 2rem 2rem",
    h2: {
      fontSize: "2.8rem",
      textAlign: "left",
    },
    "p:last-child": { marginBottom: 0 },
  },

  ".link": {
    gridArea: "link",
    justifySelf: "end",
    alignSelf: "start",
    padding: "2rem 2rem 2rem 0",
  },

  ".image": {
    gridArea: "image",
    justifySelf: "end",
    alignSelf: "end",
  },

  [media(767)]: {
    width: "50vw",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: "1rem 0",
    gridTemplateAreas: `"image" "content" "link"`,

    ".content": {
      h2: {
        fontSize: "6.2rem",
        textAlign: "center",
        margin: "0 auto 3rem",
      },
      p: {
        width: "40rem",
        maxWidth: "80%",
        margin: "0 auto",
      },
    },

    ".image": {
      justifySelf: "center",
      alignSelf: "end",
    },

    ".link": {
      justifySelf: "center",
      alignSelf: "start",
      padding: "0 0",
    },
  },
}

const cssPeopleSection = {
  backgroundColor: "var(--cl-people-section)",
}

const cssMotionSection = {
  backgroundColor: "var(--cl-motion-section)",
}

const cssNextButton = {
  width: "10rem",
  height: "10rem",
  borderRadius: "10rem",
  color: "var(--cl-white)",
  backgroundColor: "var(--cl-black)",
  display: "block",
  textAlign: "center",
  lineHeight: "10rem",
}

const IndexPage = () => {
  return (
    <Layout
      pageStyles={{
        background: "var(--cl-pink)",
      }}
    >
      <SEO title="Home" />
      <section css={{ ...cssMainSection }}>
        <div
          className="container"
          css={{ ...cssContentSection, ...cssPeopleSection }}
        >
          <div className="content">
            <h2>ใครคือผู้แทนของเรา?</h2>
            <p>
              รู้จักและติดตามนักการเมืองในสภา พวกเขาคือใคร เคยทำอะไรมาบ้าง
              หนุนหรือค้านการโหวตอะไรในสภา
            </p>
          </div>
          <div className="link">
            <Link to={"/people"} css={cssNextButton}>
              Link
            </Link>
          </div>
          <div className="image">Image</div>
        </div>
        <div
          className="container"
          css={{ ...cssContentSection, ...cssMotionSection }}
        >
          <div className="content">
            <h2>ในสภาทำอะไรกันอยู่?</h2>
            <p>
              ประเด็นอะไรที่ถูกหยิบมาเสนอบ้าง เรื่องไหนได้รับการพิจารณาเร็ว-ช้า
              ติดตามการทำงานผ่านญัตติของ กมธ.
            </p>
          </div>
          <div className="link">
            <Link to={"/motion"} css={cssNextButton}>
              Link
            </Link>{" "}
          </div>
          <div className="image">Image</div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
