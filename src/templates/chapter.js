import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { convertToRoman, buttonize } from "../utils"
import { useChapterData } from "../hooks/use-chapter-data"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Slide from "../components/slide"
import Timeline from "../components/timeline"
import Quiz from "../components/quiz"
import Risks from "../components/risk"
import PaLinje from "../components/palinje"
import Register from "../components/register"

const ChapterHeader = ({ currentIndex, currentTitle }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { chapters } = useChapterData()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <header
      className={`chapter-header chapter-header-nav-${
        menuOpen ? "open" : "closed"
      }`}
    >
      {menuOpen && (
        <div className="chapter-nav-close" {...buttonize(() => toggleMenu())}>
          &times;&nbsp; Skjul kapitteloversikt
        </div>
      )}
      {menuOpen &&
        chapters.map((chapter, index) => {
          return (
            <div
              className={`chapter-header-nav ${
                currentIndex === index
                  ? "chapter-header-nav-current"
                  : ""
              }`}
              key={index}
            >
              <Link to={chapter.path}>
                {index !== 0 && (
                  <>Del {convertToRoman(index)}: </>
                )}
                {chapter.title}
              </Link>
            </div>
          )
        })}
      {!menuOpen && (
        <div
          className="chapter-header-current"
          {...buttonize(() => toggleMenu())}
        >
          &#9776;
          <span className="chapter-header-title">
            {currentIndex !== 0 && (
              <>Del {convertToRoman(currentIndex)}: </>
            )}
            {currentTitle}
          </span>
        </div>
      )}
    </header>
  )
}

export const ChapterTemplate = ({
  title,
  slug,
  index,
  slides,
  timeline,
  quiz,
  risks,
  paLinje,
  registerForm,
  registerFormOnSend,
}) => {
  return (
    <>
      <ChapterHeader currentIndex={index} currentTitle={title} />
      {slides.map((slide, index) => (
        <Slide key={"slide" + index} data={slide} index={index} />
      ))}
      {timeline && <Timeline data={timeline} />}
      {quiz && <Quiz data={quiz} />}
      {risks && <Risks data={risks} />}
      {paLinje && <PaLinje data={paLinje} />}
      {registerForm && (
        <Register data={registerForm} onSend={registerFormOnSend} />
      )}
    </>
  )
}

ChapterTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

const ChapterPage = ({ data, pageContext, navigate }) => {
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
    registerForms,
  } = chapter

  const registerFormOnSend = () => {
    navigate(`/${pageContext.nextChapterPath}`)
  }

  // Limit to one fancy section per chapter for now
  const timeline = timelines.length !== 0 ? timelines[0] : null
  const quiz = quizzes.length !== 0 ? quizzes[0] : null
  const risks = riskFactors.length !== 0 ? riskFactors[0] : null
  const paLinje = paLinjes.length !== 0 ? paLinjes[0] : null
  const registerForm = registerForms.length !== 0 ? registerForms[0] : null

  return (
    <Layout>
      <SEO title={title} />
      <ChapterTemplate
        title={title}
        slug={slug}
        index={index}
        slides={slides}
        timeline={timeline}
        quiz={quiz}
        risks={risks}
        paLinje={paLinje}
        registerForm={registerForm}
        registerFormOnSend={registerFormOnSend}
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
              lead
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
              citations {
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
              citations {
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
              citations {
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
              citations {
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
                id
                text
              }
            }
          }
        }
        registerForms: children(type: [KursRegister]) {
          __typename
          id
          ... on Balanse_KursRegister {
            title
            inputs: registerForm {
              __typename
              ... on Balanse_RegisterFormTextInput {
                question
                placeholder
                description
              }
            }
          }
        }
      }
    }
  }
`
