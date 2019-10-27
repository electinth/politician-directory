import React from "react"

import "../../styles/global.css"

import HeroFeature from "./feature"

const Hero = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      marginTop: "2rem",
      marginBottom: "1rem",
    }}
  >
    <HeroFeature
      title="Feature #1"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    />
    <HeroFeature
      title="Feature #2"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    />
    <HeroFeature
      title="Feature #3"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    />
  </div>
)

export default Hero
