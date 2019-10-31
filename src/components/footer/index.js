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
      skooldio: file(
        relativePath: { eq: "images/partner-logo/logo-skooldio.png" }
      ) {
        childImageSharp {
          fixed(height: 28) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      matter: file(
        relativePath: { eq: "images/partner-logo/logo-white-matter.png" }
      ) {
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
          <h2>ELECT</h2>
          <h3>In VOTE We TRUST</h3>
          <span>
            <ExternalLink
              className="link-text"
              href="https://elect.in.th/about/"
              style={{ color: "#ffffff" }}
            >
              เราคือใคร.. ทำไมต้อง ELECT?
            </ExternalLink>
          </span>
        </div>
        <div className="footer-contact">
          <h2>CONTACT US</h2>
          <ul>
            <li>
              <ExternalLink
                className="link-text"
                href="mailto: contact@elect.in.th"
              >
                contact@elect.in.th
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
        <div className="footer-logo" style={{ gridArea: "skooldio" }}>
          <ExternalLink href="https://www.skooldio.com">
            <Img fixed={data.skooldio.childImageSharp.fixed}></Img>
          </ExternalLink>
        </div>
        <div className="footer-logo" style={{ gridArea: "matter" }}>
          <ExternalLink href="https://thematter.co">
            <Img fixed={data.matter.childImageSharp.fixed}></Img>
          </ExternalLink>
        </div>

        <div className="footer-copyright" style={{ gridArea: "copyright" }}>
          ©{new Date().getFullYear()} ELECT.IN.TH
        </div>
      </div>
    </footer>
  )
}

export default Footer
