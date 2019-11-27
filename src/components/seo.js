/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, imageUrl }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            baseUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaImageUrl = imageUrl || "/seo/share/default.png"
  const sharableTitle =
    title === "Home"
      ? `${site.siteMetadata.title} รู้จักและติดตาม 'ผู้แทน' ในสภาของเรา`
      : title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={
        (title === "Home" ? `` : `%s | `) +
        `${site.siteMetadata.title} รู้จักและติดตาม 'ผู้แทน' ในสภาของเรา`
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: sharableTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: metaImageUrl,
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:height`,
          content: `630`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: metaImageUrl.includes("http")
            ? metaImageUrl
            : `${site.siteMetadata.baseUrl}${metaImageUrl}`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: sharableTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
