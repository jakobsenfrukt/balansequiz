import React, { useState } from "react"
import { buttonize } from "../utils"

const Risk = ({ title, description, measures }) => {
  const [showMeasures, setShowMeasures] = useState(false)
  const [currentChoice, setChoice] = useState(null)

  const makeChoice = choice => {
    const risky = choice !== 0
    setShowMeasures(risky)
    setChoice(choice)
  }

  const makeButton = (choice, text) => (
    <div
      className={`risk-option-button ${
        currentChoice === choice ? "risk-option-active" : ""
      }`}
      {...buttonize(() => makeChoice(choice))}
    >
      {text}
    </div>
  )

  return (
    <section className="slide">
      <h2 className="risk-heading">{title}</h2>
      <p className="risk-description">{description}</p>
      <div className="risk-options">
        {makeButton(0, "Ingen risiko")}
        {makeButton(1, "Lav risiko")}
        {makeButton(2, "Middels risiko")}
        {makeButton(3, "Høy risiko")}
      </div>
      {showMeasures && (
        <div className="risk-measures">
          <h3>Anbefalte tiltak</h3>
          <p dangerouslySetInnerHTML={{ __html: measures.content }} />
        </div>
      )}
      {currentChoice === 0 && <h3>Ingen anbefalte tiltak</h3>}
    </section>
  )
}

const Risks = ({ data }) => {
  const { title, risks } = data
  return (
    <section className="risks">
      <h2>{title}</h2>
      {risks.map(risk => (
        <Risk
          key={risk.id}
          title={risk.riskTitle}
          description={risk.description}
          measures={risk.measures}
        />
      ))}
    </section>
  )
}

export default Risks
