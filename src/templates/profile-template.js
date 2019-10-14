import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    profileYaml(fields: { slug: { eq: $slug } }) {
      id
      prefix
      name
      positions
      in_cabinet
      in_senate
      in_representatives
    }
  }
`

const ProfilePage = ({ data: { profileYaml } }) => (
  <Layout>
    <SEO title="Profile" />
    <h1>{`${profileYaml.prefix} ${profileYaml.name}`}</h1>
    <h3>ตำแหน่ง:</h3>
    <p>
      {profileYaml.positions.map(position => (
        <span key={position}>{`${position}`}</span>
      ))}
    </p>
    <h3>คณะรัฐมนตรี: {`${profileYaml.in_cabinet ? "ใช่" : "ไม่ใข่"}`}</h3>
    <h3>ส.ว.: {`${profileYaml.in_senate ? "ใช่" : "ไม่ใข่"}`}</h3>
    <h3>ส.ส.: {`${profileYaml.in_representatives ? "ใช่" : "ไม่ใข่"}`}</h3>
  </Layout>
)

export default ProfilePage
