import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { useChapterData } from "../hooks/use-chapter-data"

const TableOfContents = ({ data }) => {
  const { chapters } = useChapterData()

  return (
    <Layout>
      <SEO title="Kapitler" />
      <section className="slide">
        <div className="slide__content">
          <h1>Kapitler</h1>
          <ul>
            {chapters.map(chapter => (
              <li key={chapter.id}>
                <Link to={chapter.path}>{chapter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default TableOfContents
