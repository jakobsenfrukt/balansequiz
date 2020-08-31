// import PropTypes from "prop-types"
// import React, { useState } from "react"
import React from "react"
import { buttonize } from "../utils"

const PaLinje = ({ data }) => {
  //   const [currentAssertion, setCurrentAssertion] = useState(0)
  //   const [complete, setComplete] = useState(false)
  // const [showBarsFor, setShowBarsFor] = useState([])

  const { assertions } = data

  const options = [...Array(7).keys()].map(x => x + 1)
  const optionsDistrib = {
    1: 5,
    2: 5,
    3: 0,
    4: 15,
    5: 5,
    6: 30,
    7: 40,
  }

  const makeChoice = choice => {
    console.log("Chose", choice)
    // setShowBarsFor(showBarsFor.concat[choice])
  }

  const Assertion = ({ assertion }) => {
    // const showBars = showBarsFor.includes(assertion.id)
    const showBars = true
    return (
      <section className="slide">
        <h2 className="statement-heading">Hvor enig er du?</h2>
        <p className="statement">{assertion.text}</p>
        {showBars && (
          <div className="poll-distribution" style={{ maxHeight: "10rem" }}>
            {options.map(option => {
              const pct = optionsDistrib[option]
              const lineLength = pct / 5
              const lineStyle = {
                height: `${lineLength}rem`,
              }
              return <div className="poll-line" style={lineStyle}></div>
            })}
          </div>
        )}
        <div className="poll-options">
          <div className="poll-option-label">Uenig</div>
          <div className="poll-option-buttons">
            <div className="poll-option-buttons__line"></div>
            {options.map(option => {
              return (
                <div
                  className="poll-option-button"
                  {...buttonize(() => makeChoice(option))}
                >
                  {option}
                </div>
              )
            })}
          </div>
          <div className="poll-option-label">Enig</div>
        </div>
      </section>
    )
  }

  return assertions.map(x => <Assertion assertion={x} />)
}

export default PaLinje
