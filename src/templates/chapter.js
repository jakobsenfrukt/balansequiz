import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
// import Img from "gatsby-image"
// import Meta from "../components/Meta"
import { buttonize, convertToRoman } from "../utils"
import Layout from "../components/layout"
import Slide from "../components/slide"
import Timeline from "../components/timeline"
import Quiz from "../components/quiz"
import Risks from "../components/risk"
import PaLinje from "../components/palinje"

const nextSlide = () => window.scrollBy(0, window.innerHeight)

export const ChapterTemplate = ({
  title,
  slug,
  index,
  slides,
  timeline,
  quiz,
  risks,
  paLinje,
}) => {
  return (
    <>
      {index !== 0 && (
        <header className="chapter-header">
          <Link to="/chapters">
            Del {convertToRoman(index)}: {title}
          </Link>
        </header>
      )}
      {slides.map((slide, index) => (
        <Slide key={"slide" + index} data={slide} index={index} />
      ))}
      {timeline && <Timeline data={timeline} />}
      {quiz && <Quiz data={quiz} />}
      {risks && <Risks data={risks} />}
      {paLinje && <PaLinje data={paLinje} />}
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
  const {
    title,
    slug,
    slides,
    timelines,
    quizzes,
    riskFactors,
    paLinjes,
  } = chapter

  // Limit to one timeline, quiz and risk factor section per chapter for now
  const timeline = timelines.length !== 0 ? timelines[0] : null
  const quiz = quizzes.length !== 0 ? quizzes[0] : null
  const risks = riskFactors.length !== 0 ? riskFactors[0] : null
  const paLinje = paLinjes.length !== 0 ? paLinjes[0] : null

  return (
    <Layout>
      <ChapterTemplate
        title={title}
        slug={slug}
        index={index}
        slides={slides}
        timeline={timeline}
        quiz={quiz}
        risks={risks}
        paLinje={paLinje}
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
              backgroundColor {
                hex
              }
              chapterTitle
              images {
                id
                url
              }
            }
            ... on Balanse_SlideEnKolonne {
              backgroundColor {
                hex
              }
              text {
                content
              }
            }
            ... on Balanse_SlideToKolonner {
              backgroundColor {
                hex
              }
              left {
                content
              }
              right {
                content
              }
            }
            ... on Balanse_SlideSitat {
              backgroundColor {
                hex
              }
              quote
              quoteDescription {
                content
              }
            }
            ... on Balanse_SlideTekstOgBilde {
              backgroundColor {
                hex
              }
              text {
                content
              }
              image {
                id
                url
              }
              imagePlacement
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
        riskFactors: children(type: [KursRisikofaktorer]) {
          __typename
          id
          ... on Balanse_KursRisikofaktorer {
            title
            risks: riskFactors {
              __typename
              ... on Balanse_RiskFactorsRiskFactor {
                riskTitle
                description
                measures {
                  content
                }
              }
            }
          }
        }
        paLinjes: children(type: [KursPaLinje]) {
          __typename
          id
          ... on Balanse_KursPaLinje {
            title
            assertions: paLinje {
              __typename
              ... on Balanse_PaLinjeAssertion {
                text
              }
            }
          }
        }
      }
    }
  }
`
