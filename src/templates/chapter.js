import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
// import Img from "gatsby-image"
// import Meta from "../components/Meta"
import { convertToRoman } from "../utils"
import Layout from "../components/layout"
import Slide from "../components/slide"

const nextSlide = () => window.scrollBy(0, window.innerHeight)

export const ChapterTemplate = ({ title, slug, index, slides }) => {
  return (
    <>
      {index !== 0 && (
        <header className="chapter-header">
          Del {convertToRoman(index)}: {title}
        </header>
      )}
      {slides.map(slide => (
        <Slide data={slide} index={index} />
      ))}
      <nav className="slide-nav">
        <span className="arrow-text left">Klikk for å</span>
        <div className="arrow-next-slide" onClick={nextSlide}>
          &darr;
        </div>
        <span className="arrow-text right">gå til neste</span>
      </nav>
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
            ... on Balanse_SlideSitat {
              quote
              quoteDescription {
                content
              }
            }
          }
        }
      }
    }
  }
`
