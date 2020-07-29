import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
// import Img from "gatsby-image"
// import Meta from "../components/Meta"
import Layout from "../components/layout"
import Slide from "../components/slide"

export const ChapterTemplate = ({ title, slug, index, slides }) => {
  return (
    <>

    <section>
      <h1>{title}</h1>
      <div>Kapittel {index}</div>
      <div>Slug: {slug}</div>
    </section>
      {slides.map(slide => (
          <Slide data={slide} />
      ))}
    </>
  )
}

ChapterTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

const ChapterPage = ({ data, pageContext }) => {
  const { index } = pageContext
  const { entry: chapter } = data.balanse
  const { title, slug, slide } = chapter

  console.log(chapter)

  return (
    <Layout>
      <ChapterTemplate title={title} slug={slug} index={index} slides={slide} />
    </Layout>
  )
}

ChapterPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default ChapterPage

export const chapterQuery = graphql`
  query ChapterById($id: Int!) {
    balanse {
      entry(id: [$id]) {
        title
        slug
        ... on Balanse_KursKurskapittel {
          title
          slug
          slide {
            __typename
            ... on Balanse_SlideKapittelforside {
              chapterTitle
              images {
                id
                url
              }
            }
            ... on Balanse_SlideEnKolonne {
              text {
                content
              }
            }
            ... on Balanse_SlideToKolonner {
              left {
                content
              }
              right {
                content
              }
            }
          }
        }
      }
    }
  }
`
