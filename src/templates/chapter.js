import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { convertToRoman, buttonize } from "../utils"
import { useChapterData } from "../hooks/use-chapter-data"
import Seo from "../components/seo"
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
                currentIndex === index ? "chapter-header-nav-current" : ""
              }`}
              key={index}
            >
              <Link to={chapter.path}>
                {index !== 0 && index !== chapters.length - 1 && (
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
            {currentIndex !== 0 && currentIndex !== chapters.length - 1 && (
              <>Del {convertToRoman(currentIndex)}: </>
            )}
            {currentTitle}
          </span>
        </div>
      )}
    </header>
  )
}

const ChapterTemplate = ({
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
    socialTitle,
    socialDescription,
    slug,
    slides,
    specials,
  } = chapter

  const registerFormOnSend = () => {
    navigate(`/${pageContext.nextChapterPath}`)
  }

  // Limit to one fancy section per chapter for now
  const timeline = specials.find(
    x => x.__typename === "Balanse_kurs_tidslinjeoppgave_Entry"
  )
  const quiz = specials.find(x => x.__typename === "Balanse_kurs_quiz_Entry")
  const risks = specials.find(
    x => x.__typename === "Balanse_kurs_risikofaktorer_Entry"
  )
  const paLinje = specials.find(
    x => x.__typename === "Balanse_kurs_paLinje_Entry"
  )
  const registerForm = specials.find(
    x => x.__typename === "Balanse_kurs_register_Entry"
  )

  return (
    <Layout>
      <Seo title={socialTitle || title} description={socialDescription} />
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
  query ChapterById($id: Balanse_QueryArgument!) {
    balanse {
      chapter: entry(id: [$id]) {
        id
        title
        slug
        ... on Balanse_kurs_kurskapittel_Entry {
          title
          slug
          socialTitle
          socialDescription
          slides: slide {
            __typename

            ... on Balanse_slide_kapittelforside_BlockType {
              chapterTitle
              lead
              images {
                id
                url
                title
              }
            }

            ... on Balanse_slide_enKolonne_BlockType {
              backgroundColor
              text
              citations
            }

            ... on Balanse_slide_toKolonner_BlockType {
              backgroundColor
              left
              right
              citations
            }

            ... on Balanse_slide_sitat_BlockType {
              backgroundColor
              quote
              quoteDescription
              citations
            }

            ... on Balanse_slide_tekstOgBilde_BlockType {
              backgroundColor
              text
              image {
                id
                url
                title
              }
              imagePlacement
              citations
            }
          }
        }
        specials: children(
          type: [
            "tidslinjeoppgave"
            "quiz"
            "risikofaktorer"
            "paLinje"
            "register"
          ]
        ) {
          __typename
          id
          ... on Balanse_kurs_tidslinjeoppgave_Entry {
            title
            tasks: timelineTask {
              __typename
              ... on Balanse_timelineTask_event_BlockType {
                id
                toBePlaced
                year
                furtherInformation
              }
            }
          }

          ... on Balanse_kurs_quiz_Entry {
            title
            fields: quiz {
              __typename
              ... on Balanse_quiz_quizTask_BlockType {
                question
                answerA
                answerB
                answerC
                rightAnswer
              }
              ... on Balanse_quiz_quizFeedback_BlockType {
                correctGte
                feedback
              }
            }
          }

          ... on Balanse_kurs_risikofaktorer_Entry {
            title
            risks: riskFactors {
              __typename
              ... on Balanse_riskFactors_riskFactor_BlockType {
                id
                riskTitle
                description
                measures
              }
            }
          }

          ... on Balanse_kurs_paLinje_Entry {
            title
            assertions: paLinje {
              __typename
              ... on Balanse_paLinje_assertion_BlockType {
                id
                text
              }
            }
          }

          ... on Balanse_kurs_register_Entry {
            title
            inputs: registerForm {
              __typename
              ... on Balanse_registerForm_textInput_BlockType {
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
