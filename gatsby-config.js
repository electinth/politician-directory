const config = {
  siteMetadata: {
    title: `They Work For Us?`,
    description: `Site description`,
    author: `@electinth`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-preset-env")({
            stage: 0,
            features: {
              "nesting-rules": true,
            },
          }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Politician Directory`,
        short_name: `Politician`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}

// Track analytics on production
if (process.env.GATSBY_ENV === "production") {
  const googleGtagConfig = {
    resolve: "gatsby-plugin-gtag",
    options: {
      trackingId: "UA-43653558-21",
    },
  }
  config.plugins.push(googleGtagConfig)
}

module.exports = config
