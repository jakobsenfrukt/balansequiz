import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const TableOfContents = ({ data }) => {
  const chapters = data.balanse.chapters

  return (
    <Layout>
      {/* <SEO title="Page two" /> */}
      <section className="slide">
        <div className="slide__content">
          <h1>Kapitler</h1>
          <p>:)</p>
          <ul>
            {chapters.map(chapter => (
              <li key={chapter.id}>
                <Link to={`/${chapter.slug}`}>{chapter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default TableOfContents

export const query = graphql`
  query {
    balanse {
      chapters: entries(section: [kurs], type: [KursKurskapittel]) {
        __typename
        id
        title
        slug
        status
      }
    }
  }
`
