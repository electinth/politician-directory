import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../../styles/global.css"

import HeroFeature from "./feature"
import { media } from "../../styles"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      biograpyImage: file(
        relativePath: { eq: "images/hero/biography@2x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      partySummaryImage: file(
        relativePath: { eq: "images/hero/partySummary@2x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      voteSummaryImage: file(
        relativePath: { eq: "images/hero/voteSummary@2x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div
      css={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "flex-start",
        alignContent: "center",
        marginTop: "2rem",
        marginBottom: "5rem",
        [media(767)]: {
          flexDirection: "row",
        },
      }}
    >
      <HeroFeature
        title="ค้นประวัติบุคคล"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        image={data.biograpyImage}
      />
      <HeroFeature
        title="ดูภาพรวมพรรคการเมือง"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        image={data.partySummaryImage}
      />
      <HeroFeature
        title="สรุปการลงคะแนนเสียง"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        image={data.voteSummaryImage}
      />
    </div>
  )
}

export default Hero
