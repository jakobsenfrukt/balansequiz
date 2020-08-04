import PropTypes from "prop-types"
import React, { useState } from "react"

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
      console.log("DING DING")
      setShowFact(true)
    } else {
      console.log("💥", choice, "is the wrong answer :(")
    }
  }

  const nextTask = () => {
    setShowFact(false)
    if (currentTask === tasks.length - 1) {
      console.log("very nice 🥇")
      setComplete(true)
    } else {
      setCurrentTask(currentTask + 1)
    }
  }

  if (complete) {
    return <section className="slide">Du klarte det! 🥇</section>
  }

  return (
    <section className="slide">
      <p>{title}</p>
      <h1>{task.toBePlaced}</h1>
      <div className="timeline-wrapper">
        <div className="timeline-scroll">
          <div className="timeline">
            <div className="options">
              {possibleChoices.map(choice => {
                return (
                  <div
                    className="option-button"
                    role="button"
                    onClick={() => makeChoice(choice)}
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
      {showFact && hasFact && (
        <p
          className="timeline-fact"
          dangerouslySetInnerHTML={{ __html: task.furtherInformation.content }}
        />
      )}
      {showFact && (
        <div className="option-button" role="button" onClick={nextTask}>
          ok fett
        </div>
      )}
    </section>
  )
}

export default Timeline
