// import PropTypes from "prop-types"
import React, { useState } from "react"
import { buttonize } from "../utils"

const Timeline = ({ data }) => {
  const [currentTask, setCurrentTask] = useState(0)
  const [showFact, setShowFact] = useState(false)
  const [complete, setComplete] = useState(false)

  const { title, tasks } = data
  const possibleChoices = tasks.map(x => x.year)

  const task = tasks[currentTask]
  const hasFact = task.furtherInformation && task.furtherInformation.content

  const makeChoice = choice => {
    const correct = choice === tasks[currentTask].year
    if (correct) {
      setShowFact(true)
    }
  }

  const nextTask = () => {
    setShowFact(false)
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
      <h2 className="timeline-heading">{title}</h2>
      <div className="timeline-statement">{task.toBePlaced}</div>
      <p className="information">Dra eller scroll for å se hele &rarr;</p>
      <div className="timeline-wrapper">
        <div className="timeline-scroll">
          <div className="timeline">
            <div className="timeline-options">
              {possibleChoices.map((choice, index) => {
                return (
                  <div
                    className="timeline-option-button"
                    key={'choice' + index}
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
      {showFact && (
        <div className="timeline-feedback">
          <p className="timeline-feedback__message">Riktig!</p>
          {hasFact && (
            <p
              className="timeline-fact"
              dangerouslySetInnerHTML={{ __html: task.furtherInformation.content }}
            />
          )}
          <div className="button" {...buttonize(nextTask)}>
            Neste oppgave &rarr;
          </div>
        </div>
      )}
    </section>
  )
}

export default Timeline
