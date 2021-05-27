import path from "path"
import { stripSectionPrefixFromUri } from "./src/utils"

// Craft entries may be 'live', 'pending', 'expired' or 'disabled'
const getOnlyPublished = edges => edges.filter(node => node.status === "live")

const addPathsToChapters = (chapters, course) => {
  chapters.forEach((chapter, index) => {
    let pagePath = stripSectionPrefixFromUri(chapter.uri)
    if (index === 0) {
      pagePath = stripSectionPrefixFromUri(course.uri)
    }
    pagePath += '/'
    chapter.path = pagePath
  })
  return chapters
}

export const createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    query {
      balanse {
        courses: entries(section: ["kurs"], type: ["Kurs"]) {
          __typename
          id
          title
          slug
          uri
          status

          chapters: children(section: ["kurs"], type: ["Kurskapittel"]) {
            __typename
            id
            title
            slug
            uri
            status
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const chapterTemplate = path.resolve(`./src/templates/chapter.js`)
    const allCourses = result.data.balanse.courses
    const courses =
      process.env.NODE_ENV === "production"
        ? getOnlyPublished(allCourses)
        : allCourses

    courses.forEach((course, index) => {
      const chaptersInCourse = course.chapters
      const chapters =
        process.env.NODE_ENV === "production"
          ? getOnlyPublished(chaptersInCourse)
          : chaptersInCourse

      const chaptersWithPaths = addPathsToChapters(chapters, course)

      chaptersWithPaths.forEach((chapter, index) => {
        const nextChapterPath =
          index < chaptersWithPaths.length - 1
            ? chaptersWithPaths[index + 1].path
            : null
        console.log("creating page", chapter.path, "from uri", chapter.uri)

        createPage({
          path: chapter.path,
          component: chapterTemplate,
          context: {
            id: chapter.id,
            courseId: course.id,
            chaptersInCourse: chaptersWithPaths,
            index: index,
            showNavigation: true,
            showNextChapterButton: true,
            nextChapterPath: nextChapterPath,
          },
        })
      })
    })
  })
}
