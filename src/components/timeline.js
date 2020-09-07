import React, { useState } from "react"
import ScrollContainer from "react-indiana-drag-scroll"
import { buttonize } from "../utils"

const Timeline = ({ data }) => {
  const [currentTask, setCurrentTask] = useState(0)
  const [showFact, setShowFact] = useState(false)
  const [complete, setComplete] = useState(false)
  const [usedChoices, setUsedChoices] = useState([])

  const { title, tasks } = data
  const possibleChoices = tasks.map(x => x.year)

  const task = tasks[currentTask]
  const hasFact = task.furtherInformation && task.furtherInformation.content

  const makeChoice = choice => {
    const correct = choice === tasks[currentTask].year
    if (correct) {
      setUsedChoices(usedChoices.concat([choice]))
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
      <ScrollContainer
        className="scroll-container timeline-wrapper"
        vertical={false}
        horizontal={true}
      >
        <div className="timeline">
          <div className="timeline-options">
            {possibleChoices.map((choice, index) => {
              const used = usedChoices.includes(choice)
              return (
                <div
                  className={`timeline-option-button ${
                    used ? "timeline-option-used" : ""
                  }`}
                  key={"choice" + index}
                  {...buttonize(() => makeChoice(choice))}
                >
                  {choice}
                </div>
              )
            })}
          </div>
        </div>
      </ScrollContainer>
      {showFact && (
        <div className="timeline-feedback">
          <p className="timeline-feedback__message">Riktig!</p>
          {hasFact && (
            <p
              className="timeline-fact"
              dangerouslySetInnerHTML={{
                __html: task.furtherInformation.content,
              }}
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
