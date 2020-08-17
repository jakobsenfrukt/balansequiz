// import PropTypes from "prop-types"
import React, { useState } from "react"
import { buttonize } from "../utils"

const Timeline = ({ data }) => {
  const [currentTask, setCurrentTask] = useState(0)
  const [showFact, setShowFact] = useState(false)
  const [complete, setComplete] = useState(false)
  const [feedback, setFeedback] = useState("")

  const { title, tasks } = data
  const possibleChoices = tasks.map(x => x.year)

  const task = tasks[currentTask]
  const hasFact = task.furtherInformation && task.furtherInformation.content

  const makeChoice = choice => {
    const correct = choice === tasks[currentTask].year
    if (correct) {
      setFeedback("Riktig!")
      setShowFact(true)
    } else {
      setFeedback("Niks!")
    }
  }

  const nextTask = () => {
    setShowFact(false)
    setFeedback("")
    if (currentTask === tasks.length - 1) {
      setComplete(true)
    } else {
      setCurrentTask(currentTask + 1)
    }
  }

  if (complete) {
    return <section className="slide">Du klarte det!</section>
  }

  return (
    <section className="slide">
      <p>{title}</p>
      <div className="timeline-statement">{task.toBePlaced}</div>
      <div className="timeline-wrapper">
        <div className="timeline-scroll">
          <div className="timeline">
            <div className="timeline-options">
              {possibleChoices.map(choice => {
                return (
                  <div
                    className="timeline-option-button"
                    {...buttonize(() => makeChoice(choice))}
                  >
                    {choice}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <p className="information">Klikk eller scroll for å se hele &rarr;</p>
      <p className="timeline-feedback">{feedback}</p>
      {showFact && hasFact && (
        <p
          className="timeline-fact"
          dangerouslySetInnerHTML={{ __html: task.furtherInformation.content }}
        />
      )}
      {showFact && (
        <div className="button" {...buttonize(nextTask)}>
          Neste oppgave
        </div>
      )}
    </section>
  )
}

export default Timeline
