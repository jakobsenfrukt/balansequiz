import { useStaticQuery, graphql } from "gatsby"
import { stripSectionPrefixFromUri } from "../utils"

export const useCourseData = () => {
  const { balanse: queried } = useStaticQuery(
    graphql`
      query {
        balanse {
          courses: entries(section: ["kurs"], type: ["Kurs"]) {
            __typename
            id
            title
            uri

            ... on Balanse_kurs_kurs_Entry {
              ingress
            }
          }
        }
      }
    `
  )

  let { courses } = queried
  courses.forEach(course => {
    course.path = stripSectionPrefixFromUri(course.uri)
  })

  return { courses: courses }
}
