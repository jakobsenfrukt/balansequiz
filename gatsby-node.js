const path = require("path")

// Craft entries may be 'live', 'pending', 'expired' or 'disabled'
const getOnlyPublished = edges => edges.filter(node => node.status === "live")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    query {
      balanse {
        chapters: entries(section: [kurs], type: [KursKurskapittel]) {
          __typename
          id
          slug
          status
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const chapterTemplate = path.resolve(`./src/templates/chapter.js`)
    const allChapters = result.data.balanse.chapters
    const chapters =
      process.env.NODE_ENV === "production"
        ? getOnlyPublished(allChapters)
        : allChapters

    chapters.forEach((chapter, index) => {
      console.log("creating page", chapter.slug)
      createPage({
        path: chapter.slug,
        component: chapterTemplate,
        context: {
          showNavigation: true,
          id: chapter.id,
          index: index,
        },
      })
    })
  })
}
