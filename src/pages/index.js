import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { media } from "../styles"
import ArrowRightIcon from "../images/svg/arrow-right.svg"

export const query = graphql`
  query {
    peopleImage: file(relativePath: { eq: "images/hero/partySummary.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    motionImage: file(relativePath: { eq: "images/hero/voteSummary.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const cssMainSection = {
  display: "flex",
  flexDirection: "column",
  padding: "0 0",
  [media(767)]: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  margin: "0 0",
  overflow: "hidden",

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
    gridTemplateRows: "40vh 1fr 20vh",
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "4.8rem",
  height: "4.8rem",
  borderRadius: "10rem",
  color: "var(--cl-black)",
  border: "2px solid var(--cl-black)",
  textDecoration: "none",
  transition: "all .2s ease-out",
  span: {
    display: "none",
    fontFamily: "var(--ff-title)",
  },
  i: {
    svg: {
      display: "block",
    },
  },
  ":hover": {
    color: "var(--cl-white)",
    backgroundColor: "var(--cl-black)",
    textDecoration: "none",
    i: {
      svg: {
        path: {
          fill: "var(--cl-white)",
        },
      },
    },
  },
  [media(767)]: {
    width: "auto",
    height: "6.4rem",
    padding: "0 2rem",
    borderWidth: "3px",
    span: {
      display: "inline-block",
      fontSize: "1.8rem",
      letterSpacing: "2px",
    },
    i: {
      marginLeft: "1.5rem",
    },
  },
}

const cssPeopleImage = {
  display: "block",
  width: "12rem",
  height: "12rem",
  borderRadius: "12rem",
  backgroundColor: "var(--cl-black)",
  transform: "translate(2rem, 2rem)",
  [media(767)]: {
    transform: "none",
    width: "20rem",
    height: "20rem",
    borderRadius: "20rem",
  },
}

const cssMotionImage = {
  display: "block",
  width: "12rem",
  height: "12rem",
  borderRadius: "12rem",
  backgroundColor: "var(--cl-black)",
  transform: "translate(2rem, 2rem)",
  [media(767)]: {
    transform: "none",
    width: "20rem",
    height: "20rem",
    borderRadius: "20rem",
  },
}

const IndexPage = ({ data }) => {
  const handleTopicClick = topic => {
    if (
      process.env.GATSBY_ENV !== "production" ||
      process.env.GATSBY_ENV === "development"
    ) {
      navigate(`/${topic}`)
      return
    }
    if (!localStorage.ladingPageVisited) {
      try {
        window.gtag("set", {
          custom_map: { dimension1: "focused_topic" },
        })
        window.gtag("event", "Topic", {
          focused_topic: topic, // custom dimension1
          event_label: topic,
          event_callback: function() {
            localStorage.setItem("ladingPageVisited", true)
            navigate(`/${topic}`)
          },
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      navigate(`/${topic}`)
    }
  }

  function setClientId(callback) {
    window.gtag("config", process.env.GTAG_CODE, {
      custom_map: {
        dimension2: "clientId",
      },
    })
    callback()
  }

  function setLocalStorageClientId() {
    localStorage.setItem("setClientId", true)
  }

  useEffect(() => {
    if (process.env.GATSBY_ENV === "production") {
      if (!localStorage.setClientId) {
        setClientId(setLocalStorageClientId)
      }
    }
  }, [])

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
            <a
              css={{ ...cssNextButton, cursor: "pointer" }}
              onClick={() => handleTopicClick("people")}
            >
              <span>ดูข้อมูลผู้แทน</span>
              <i>
                <ArrowRightIcon></ArrowRightIcon>
              </i>
            </a>
          </div>
          <div className="image" css={{ ...cssPeopleImage }}>
            <Img fluid={data.peopleImage.childImageSharp.fluid} />
          </div>
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
            <a
              css={{ ...cssNextButton, cursor: "pointer" }}
              onClick={() => handleTopicClick("motions")}
            >
              <span>ดูข้อมูลญัตติ</span>
              <i>
                <ArrowRightIcon></ArrowRightIcon>
              </i>
            </a>{" "}
          </div>
          <div className="image" css={{ ...cssMotionImage }}>
            <Img fluid={data.motionImage.childImageSharp.fluid} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
