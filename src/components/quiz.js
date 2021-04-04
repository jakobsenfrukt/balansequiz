// import PropTypes from "prop-types"
import React, { useState } from "react"
import { buttonize } from "../utils"

const Quiz = ({ data }) => {
  const [currentTask, setCurrentTask] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [completedTasks, setCompletedTasks] = useState([])
  const [complete, setComplete] = useState(false)
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)

  const { fields } = data
  const tasks = fields.filter(x => x.__typename === "Balanse_quiz_quizTask_BlockType")
  const feedbacks = fields
    .filter(x => x.__typename === "Balanse_quiz_quizFeedback_BlockType")
    .sort((a, b) => (a.correctGte < b.correctGte ? 1 : -1))

  const task = tasks[currentTask]

  const isCorrect = choice => choice === tasks[currentTask].rightAnswer

  const makeChoice = choice => {
    if (completedTasks.includes(currentTask)) {
      return
    }
    setCompletedTasks([currentTask, ...completedTasks])
    if (isCorrect(choice)) {
      setCorrectAnswers(correctAnswers + 1)
    }
    setSelectedAnswer(choice)
    setShowCorrectAnswers(true)
  }

  const buttonClasses = choice => {
    if (!showCorrectAnswers) {
      return ""
    }
    return `quiz-option-${isCorrect(choice) ? "correct" : "incorrect"} ${
      selectedAnswer === choice ? "quiz-option-selected" : ""
    }`
  }

  const nextTask = () => {
    setShowCorrectAnswers(false)
    setSelectedAnswer(null)
    if (currentTask === tasks.length - 1) {
      setComplete(true)
    } else {
      setCurrentTask(currentTask + 1)
    }
  }

  const reset = () => {
    setSelectedAnswer(null)
    setCurrentTask(0)
    setCorrectAnswers(0)
    setCompletedTasks([])
    setComplete(false)
  }

  if (complete) {
    let feedback = ""
    for (const f of feedbacks) {
      if (correctAnswers >= f.correctGte) {
        feedback = f.feedback
        break
      }
    }

    return (
      <section className="slide">
        <h2 className="quiz-heading">
          Du fikk {correctAnswers} av {tasks.length} poeng
        </h2>
        <p>{feedback}</p>
        <a href="/" className="button">
          Gå til starten av kurset
        </a>
        <a className="button" {...buttonize(() => reset())}>
          Start quizen på nytt
        </a>
      </section>
    )
  }

  return (
    <section className="slide">
      <h2 className="quiz-heading">
        Spørsmål {currentTask + 1}/{tasks.length}
      </h2>
      <p className="quiz-question">{task.question}</p>
      <ol className="quiz-options">
        <li
          className={`quiz-option-button ${buttonClasses("A")}`}
          {...buttonize(() => makeChoice("A"))}
        >
          {task.answerA}
        </li>
        <li
          className={`quiz-option-button ${buttonClasses("B")}`}
          {...buttonize(() => makeChoice("B"))}
        >
          {task.answerB}
        </li>
        <li
          className={`quiz-option-button ${buttonClasses("C")}`}
          {...buttonize(() => makeChoice("C"))}
        >
          {task.answerC}
        </li>
      </ol>
      {selectedAnswer !== null && (
        <div
          className="quiz-next-button button"
          {...buttonize(() => nextTask())}
        >
          {currentTask === tasks.length - 1 ? "Se resultat" : "Neste oppgave"}
        </div>
      )}
    </section>
  )
}

export default Quiz
