import { useStaticQuery, graphql } from "gatsby"
import { stripSectionPrefixFromUri } from "../utils"

export const useCourseData = () => {
  const { balanse: queried } = useStaticQuery(
    graphql`
      query {
        balanse {
          index: entry(section: ["courseIndex"], limit: 1) {
            ... on Balanse_courseIndex_courseIndex_Entry {
              overskrift
              ingress
              body
            }
          }

          courses: entries(section: ["kurs"], type: ["Kurs"]) {
            __typename
            id
            title
            uri

            ... on Balanse_kurs_kurs_Entry {
              ingress
              metainfo
              toppbilde {
                id
                url
                title
              }
            }
          }
        }
      }
    `
  )

  let { courses, index } = queried
  courses.forEach(course => {
    course.path = stripSectionPrefixFromUri(course.uri)
  })

  return { courses: courses, index: index }
}
