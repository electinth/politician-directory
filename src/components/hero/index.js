import React from "react"

import "../../styles/global.css"

import HeroFeature from "./feature"

const Hero = () => (
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
    />
    <HeroFeature
      title="ค้นประวัติบุคคล"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    />
    <HeroFeature
      title="ค้นประวัติบุคคล"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    />
  </div>
)

export default Hero
