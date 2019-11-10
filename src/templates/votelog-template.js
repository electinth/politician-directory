import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VoterList from "../components/voterList"

export const query = graphql`
  query($slug: String!) {
    votelogYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      vote_date(formatString: "D MMM YY")
      description_th
      reference
    }
  }
`
const cssSection = {
  paddingTop: "3rem",
  paddingBottom: "8rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
}
const VotelogPage = ({ data: { votelogYaml } }) => (
  <Layout
    pageStyles={{
      background: "#fff",
    }}
  >
    <SEO title="มติ" />
    <section css={{ ...cssSection }}>
      <div className="container">
        {" "}
        <h1
          css={{
            marginTop: 0,
            paddingTop: "6rem",
          }}
        >{`${votelogYaml.title}`}</h1>
        <h3>{`${votelogYaml.vote_date}`}</h3>
        <p
          css={css`
            font-size: 2rem;
          `}
        >
          {votelogYaml.description_th}
        </p>
      </div>
    </section>
    <VoterList votelogKey={votelogYaml.id} />
  </Layout>
)

export default VotelogPage
