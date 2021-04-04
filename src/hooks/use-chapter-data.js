import { useStaticQuery, graphql } from "gatsby"

export const useChapterData = () => {
  const { balanse: queried } = useStaticQuery(
    graphql`
      query {
        balanse {
          chapters: entries(
            section: ["kurs"]
            type: ["Kurskapittel"]
          ) {
            __typename
            id
            title
            slug
          }
        }
      }
    `
  )

  let { chapters } = queried
  chapters.forEach(chapter => {
    if (chapter.slug === "intro") {
      chapter.path = "/"
    } else {
      chapter.path = `/${chapter.slug}/`
    }
  })

  return { chapters: chapters }
}
