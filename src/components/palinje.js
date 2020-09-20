import React, { useState } from "react"
import { buttonize, uuidv4 } from "../utils"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const PaLinje = ({ data }) => {
  const [anonymousId, setAnonymousId] = useState("")
  const [distributions, setDistributions] = useState({})
  const { balanseDataApiUrl } = useSiteMetadata()
  const { assertions } = data

  if (anonymousId === "") {
    const uuid = uuidv4()
    setAnonymousId(uuid)
  }

  const options = [...Array(7).keys()].map(x => x + 1)

  const sendChoice = (statementId, choice) => {
    const payload = {
      participant: anonymousId,
      statement_id: statementId,
      agreement: choice,
    }
    fetch(`${balanseDataApiUrl}/agreements/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data)
        fetchDistribution(statementId)
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  const fetchDistribution = statementId => {
    fetch(`${balanseDataApiUrl}/agreementDistribution/${statementId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data)
        if (!distributions.hasOwnProperty(statementId)) {
          setDistributions({
            ...{ [statementId]: data.distribution },
            ...distributions,
          })
        }
        return data
      })
      .catch(error => {
        console.error("Error:", error)
      })
    return null
  }

  const makeChoice = (statementId, choice) => {
    if (distributions.hasOwnProperty(statementId)) {
      // Result is known or visitor has voted before
      return
    }
    sendChoice(statementId, choice)
  }

  /*const showResults = statementId => {
    fetchDistribution(statementId)
  }*/

  const Assertion = ({ assertion, distribution }) => {
    const showLines = distribution !== null
    return (
      <section className="slide">
        <h2 className="statement-heading">Hva mener du?</h2>
        <p className="statement">{assertion.text}</p>
        <div
          className={`poll-options ${
            showLines ? "poll-options-has-lines" : ""
          }`}
        >
          <div className="poll-option-label poll-option-label--disagree">Uenig</div>

          <div className="poll-option-buttons">
            <div className="poll-option-buttons__line"></div>
            {options.map((option, index) => {
              return (
                <div className="poll-option-column" key={index}>
                  {showLines && (
                    <div
                      className="poll-distribution"
                      style={{ maxHeight: "10rem" }}
                    >
                      {(() => {
                        const thisDistribution =
                          distribution.filter(x => x.agreement === option)[0] ||
                          null
                        const pct = thisDistribution && thisDistribution.percent
                        const lineLength = pct / 6
                        const lineStyle = {
                          height: `${lineLength}rem`,
                        }
                        return (
                          <>
                            <div className="poll-percent">
                              {pct ? `${pct}%` : ""}
                            </div>
                            <div className="poll-line" style={lineStyle}></div>
                          </>
                        )
                      })()}
                    </div>
                  )}
                  <div
                    className="poll-option-button"
                    {...buttonize(() => makeChoice(assertion.id, option))}
                  >
                    {option}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="poll-option-label poll-option-label--agree">Enig</div>
        </div>
        {/* !showLines && (
          <div
            className="button button--small statement-show-results"
            {...buttonize(() => showResults(assertion.id))}
          >
            Vis resultat
          </div>
        )*/}
      </section>
    )
  }

  return assertions.map((x, index) => (
    <Assertion
      assertion={x}
      distribution={distributions[x.id] || null}
      key={index}
    />
  ))
}

export default PaLinje
