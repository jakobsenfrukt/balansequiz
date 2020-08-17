// import PropTypes from "prop-types"
import React, { useState } from "react"
import { buttonize } from "../utils"

const Quiz = ({ data }) => {
  const [currentTask, setCurrentTask] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [complete, setComplete] = useState(false)

  const { tasks } = data

  const task = tasks[currentTask]

  const makeChoice = choice => {
    const correct = choice === tasks[currentTask].rightAnswer
    if (correct) {
      setCorrectAnswers(correctAnswers + 1)
    }
    setTimeout(nextTask, 400)
  }

  const nextTask = () => {
    if (currentTask === tasks.length - 1) {
      setComplete(true)
    } else {
      setCurrentTask(currentTask + 1)
    }
  }

  if (complete) {
    let feedback = ""
    if (correctAnswers === tasks.length) {
      feedback =
        "Juhu! Alt riktig! Med ditt kunnskapsnivå kan du være en ressurs for andre. Hjelp oss å spre kunnskap og øke bevisstheten om seksuell trakassering, makt og grenser."
    } else if (correctAnswers >= 4) {
      feedback =
        "Ser man det! Du har koll på tematikken seksuell trakassering, makt og grenser."
    } else {
      feedback =
        "Ops! Her er det noen kunnskapshull. Kanskje du har tid til å se igjennom e-kurset på nytt en annen dag?"
    }

    return (
      <section className="slide">
        <h2 className="quiz-heading">
          Du fikk {correctAnswers} av {tasks.length} poeng
        </h2>
        <p>{feedback}</p>
        <a href="/" className="button">Gå til starten av kurset</a>
        <a href="/" className="button">Start quizen på nytt</a>
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
          className="quiz-option-button"
          {...buttonize(() => makeChoice("A"))}
        >
          {task.answerA}
        </li>
        <li
          className="quiz-option-button"
          {...buttonize(() => makeChoice("B"))}
        >
          {task.answerB}
        </li>
        <li
          className="quiz-option-button"
          {...buttonize(() => makeChoice("C"))}
        >
          {task.answerC}
        </li>
      </ol>
    </section>
  )
}

export default Quiz
