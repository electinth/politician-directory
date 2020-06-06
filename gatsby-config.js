const config = {
  siteMetadata: {
    title: `They Work For Us`,
    description: `ใครเป็นใคร เคยทำอะไรมาบ้าง ตอนนี้อยู่ตำแหน่งไหน และยกมือสนับสนุนอะไรในสภา`,
    author: `@electinth`,
    baseUrl: process.env.BASE_URL || "",
  },
  pathPrefix: process.env.BASE_PATH || "/",
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
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `They Work For Us`,
        short_name: `They Work For Us`,
        start_url: `/`,
        background_color: `#fcbbdd`,
        theme_color: `#fcbbdd`,
        display: `minimal-ui`,
        icon: `src/images/hero/biography.png`,
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
