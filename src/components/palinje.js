// import PropTypes from "prop-types"
// import React, { useState } from "react"
import React from "react"
import { buttonize } from "../utils"

const PaLinje = ({ data }) => {
  //   const [currentAssertion, setCurrentAssertion] = useState(0)
  //   const [complete, setComplete] = useState(false)

  const { assertions } = data

  const options = [...Array(7).keys()].map(x => x + 1)

  const makeChoice = choice => {
    console.log("Chose", choice)
  }

  const Assertion = ({ assertion }) => {
    return (
      <section className="slide">
        <h2 className="statement-heading">Hvor enig er du?</h2>
        <p className="statement">{assertion.text}</p>
        <div className="poll-options">
          <div className="poll-option-label">Uenig</div>
          <div className="poll-option-buttons">
            <div className="poll-option-buttons__line"></div>
            {options.map(option => (
              <div
                className="poll-option-button"
                {...buttonize(() => makeChoice(option))}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="poll-option-label">Enig</div>
        </div>
      </section>
    )
  }

  return assertions.map(x => <Assertion assertion={x} />)
}

export default PaLinje
