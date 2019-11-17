import React from "react"

import "./index.css"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import ExternalLink from "../externalLink"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      bml: file(
        relativePath: { eq: "images/partner-logo/logo-white-bml.png" }
      ) {
        childImageSharp {
          fixed(height: 28) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      punchup: file(
        relativePath: { eq: "images/partner-logo/logo-punchup.png" }
      ) {
        childImageSharp {
          fixed(height: 28) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      ilaw: file(relativePath: { eq: "images/partner-logo/logo-ilaw.png" }) {
        childImageSharp {
          fixed(height: 28) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      fnf: file(relativePath: { eq: "images/partner-logo/logo-fnf.png" }) {
        childImageSharp {
          fixed(height: 28) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-elect">
          <div css={{ marginBottom: "4rem" }}>
            <h2
              css={{
                color: "var(--cl-white)",
                fontSize: "3.2rem",
                fontFamily: "var(--ff-footer)",
                lineHeight: "5rem",
                textAlign: "left",
                margin: "0 0 0 1rem",
              }}
            >
              ELECT
            </h2>
            <h3
              css={{
                color: "var(--cl-white)",
                fontSize: "2.4rem",
                fontFamily: "var(--ff-title)",
                lineHeight: "3rem",
                margin: "0 0 0 1rem",
              }}
            >
              In VOTE We TRUST
            </h3>
          </div>
          <div>
            <ExternalLink
              className="link-text"
              href="https://elect.in.th/about/"
              style={{ color: "#ffffff" }}
            >
              เราคือใคร.. ทำไมต้อง ELECT?
            </ExternalLink>
          </div>
        </div>
        <div className="footer-contact">
          <h2
            css={{
              color: "var(--cl-white)",
              fontSize: "2.4rem",
              fontFamily: "var(--ff-title)",
              lineHeight: "5rem",
              textAlign: "left",
            }}
          >
            CONTACT US
          </h2>
          <ul css={{ listStyle: "none", margin: 0 }}>
            <li>
              <ExternalLink
                className="link-text"
                href="mailto: contact@elect.in.th"
              >
                Email: contact [at] elect.in.th
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                className="link-text"
                href="https://www.facebook.com/electinth/"
              >
                Facebook
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                className="link-text"
                href="https://twitter.com/electinth/"
              >
                Twitter
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className="footer-logo" style={{ gridArea: "partner" }}>
          Partnership
        </div>
        <div className="footer-logo" style={{ gridArea: "bml" }}>
          <ExternalLink href="https://www.boonmeelab.com">
            <Img fixed={data.bml.childImageSharp.fixed}></Img>
          </ExternalLink>
        </div>
        <div className="footer-logo" style={{ gridArea: "punchup" }}>
          <ExternalLink href="http://punchup.world">
            <Img fixed={data.punchup.childImageSharp.fixed}></Img>
          </ExternalLink>
        </div>
        <div className="footer-logo" style={{ gridArea: "ilaw" }}>
          <ExternalLink href="https://ilaw.or.th">
            <Img fixed={data.ilaw.childImageSharp.fixed}></Img>
          </ExternalLink>
        </div>
        <div className="footer-logo" style={{ gridArea: "fnf" }}>
          <ExternalLink href="https://thailand.fnst.org/">
            <Img fixed={data.fnf.childImageSharp.fixed}></Img>
          </ExternalLink>
        </div>

        <div className="footer-copyright" style={{ gridArea: "copyright" }}>
          ©{new Date().getFullYear()} ELECT.IN.TH. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
