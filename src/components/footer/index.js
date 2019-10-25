import React from "react"

import "./index.css"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

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
            <a
              className="link-text"
              href="https://elect.in.th/about/"
              style={{ color: "#ffffff" }}
            >
              เราคือใคร.. ทำไมต้อง ELECT?
            </a>
          </span>
        </div>
        <div className="footer-contact">
          <h2>CONTACT US</h2>
          <ul>
            <li>
              <a className="link-text" href="mailto: contact@elect.in.th">
                contact@elect.in.th
              </a>
            </li>
            <li>
              <a
                className="link-text"
                href="https://www.facebook.com/electinth/"
              >
                Facebook
              </a>
            </li>
            <li>
              <a className="link-text" href="https://twitter.com/electinth/">
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-logo" style={{ gridArea: "partner" }}>
          Partnership
        </div>
        <div className="footer-logo" style={{ gridArea: "bml" }}>
          <a href="https://www.boonmeelab.com" target="_blank">
            <Img fixed={data.bml.childImageSharp.fixed}></Img>
          </a>
        </div>
        <div className="footer-logo" style={{ gridArea: "punchup" }}>
          <a href="http://punchup.world" target="_blank">
            <Img fixed={data.punchup.childImageSharp.fixed}></Img>
          </a>
        </div>
        <div className="footer-logo" style={{ gridArea: "ilaw" }}>
          <a href="https://ilaw.or.th" target="_blank">
            <Img fixed={data.ilaw.childImageSharp.fixed}></Img>
          </a>
        </div>
        <div className="footer-logo" style={{ gridArea: "skooldio" }}>
          <a href="https://www.skooldio.com" target="_blank">
            <Img fixed={data.skooldio.childImageSharp.fixed}></Img>
          </a>
        </div>
        <div className="footer-logo" style={{ gridArea: "matter" }}>
          <a href="https://thematter.co" target="_blank">
            <Img fixed={data.matter.childImageSharp.fixed}></Img>
          </a>
        </div>

        <div className="footer-copyright" style={{ gridArea: "copyright" }}>
          © ELECT.IN.TH
        </div>
      </div>
    </footer>
  )
}

export default Footer
