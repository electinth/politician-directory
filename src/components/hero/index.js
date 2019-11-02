import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../../styles/global.css"

import HeroFeature from "./feature"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      biograpyImage: file(relativePath: { eq: "images/illus/01.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      partyImage: file(relativePath: { eq: "images/illus/02.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      summaryImage: file(relativePath: { eq: "images/illus/03.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  console.log(data)
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "2rem",
        marginBottom: "5rem",
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
        image={data.partyImage}
      />
      <HeroFeature
        title="สรุปการลงคะแนนเสียง"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        image={data.summaryImage}
      />
    </div>
  )
}

export default Hero
