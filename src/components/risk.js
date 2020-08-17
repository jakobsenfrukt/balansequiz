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

  const makeButton = (choice, text, color) => (
    <div
      className={`risk-option-button ${
        currentChoice === choice ? "risk-option-active" : ""
      }`}
      style={{ background: color }}
      {...buttonize(() => makeChoice(choice))}
    >
      {text}
    </div>
  )

  return (
    <section className="slide slide--risk">
      <h2 className="risk-heading">{title}</h2>
      <p className="risk-description">{description}</p>
      <h3 className="risk-question">Hvordan er risikoen der du jobber?</h3>
      <div className="risk-options">
        {makeButton(0, "Ingen risiko", "#91e2ce")}
        {makeButton(1, "Lav risiko", "#ecdd88")}
        {makeButton(2, "Middels risiko", "#f7bd9b")}
        {makeButton(3, "Høy risiko", "#f78d8d")}
      </div>
      {showMeasures && (
        <div className="risk-measures">
          <h3>Anbefalte tiltak</h3>
          <p dangerouslySetInnerHTML={{ __html: measures.content }} />
        </div>
      )}
      {currentChoice === 0 && <h3>&hearts;</h3>}
    </section>
  )
}

const Risks = ({ data }) => {
  const { risks } = data
  return (
    <>
      {risks.map(risk => (
        <Risk
          key={risk.id}
          title={risk.riskTitle}
          description={risk.description}
          measures={risk.measures}
        />
      ))}
    </>
  )
}

export default Risks
