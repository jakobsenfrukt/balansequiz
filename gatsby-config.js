module.exports = {
  siteMetadata: {
    title: `Balansemerket: Kurs & quiz`,
    description: `Balansemerket er en merkeordning mot seksuell trakassering i kulturlivet. Vi tilbyr kursing, veiledning og verktøy for å bistå kunst- og kulturvirksomheter i deres arbeid for et trygt og inkluderende arbeidsmiljø.`,
    balanseDataApiUrl: "https://kurs.balansemerket.no/api",
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Balanse",
        fieldName: "balanse",
        url: "https://balansemerket.no/craft/api",
        headers: {
          Authorization: `Bearer DLxomPNNuYLVfh8RXClON9NJwTo0VJpP2kYRzq24qVEmBZwaXsWGxmTJw_gRWST9`,
        },
        fetchOptions: {},
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Balansemerket: Kurs & quiz`,
        short_name: `balansemerket`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
