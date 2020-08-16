import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
// import Img from "gatsby-image"
// import Meta from "../components/Meta"
import { buttonize, convertToRoman } from "../utils"
import Layout from "../components/layout"
import Slide from "../components/slide"
import Timeline from "../components/timeline"
import Quiz from "../components/quiz"

const nextSlide = () => window.scrollBy(0, window.innerHeight)

export const ChapterTemplate = ({
  title,
  slug,
  index,
  slides,
  timeline,
  quiz,
}) => {
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
      {timeline && <Timeline data={timeline} />}
      {quiz && <Quiz data={quiz} />}
      <nav className="slide-nav">
        <span className="arrow-text left">Klikk for å</span>
        <div className="arrow-next-slide" {...buttonize(nextSlide)}>
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
  const { chapter } = data.balanse
  const { title, slug, slides, timelines, quizzes } = chapter

  // Limit to one timeline per chapter for now
  const timeline = timelines.length !== 0 ? timelines[0] : null

  // Limit to one quiz per chapter for now
  const quiz = quizzes.length !== 0 ? quizzes[0] : null

  return (
    <Layout>
      <ChapterTemplate
        title={title}
        slug={slug}
        index={index}
        slides={slides}
        timeline={timeline}
        quiz={quiz}
      />
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
      chapter: entry(id: [$id]) {
        id
        title
        slug
        ... on Balanse_KursKurskapittel {
          title
          slug
          slides: slide {
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
        timelines: children(type: [KursTidslinjeoppgave]) {
          __typename
          id
          ... on Balanse_KursTidslinjeoppgave {
            title
            tasks: timelineTask {
              __typename
              ... on Balanse_TimelineTaskEvent {
                id
                toBePlaced
                year
                furtherInformation {
                  content
                }
              }
            }
          }
        }
        quizzes: children(type: [KursQuiz]) {
          __typename
          id
          ... on Balanse_KursQuiz {
            title
            tasks: quiz {
              __typename
              ... on Balanse_QuizQuizTask {
                question
                answerA
                answerB
                answerC
                rightAnswer
              }
            }
          }
        }
      }
    }
  }
`
