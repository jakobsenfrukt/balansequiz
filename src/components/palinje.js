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
          console.log("before", distributions)
          console.log("statement id is", statementId)
          console.log("data.distribution is", data.distribution)
          setDistributions({
            ...{ [statementId]: data.distribution },
            ...distributions,
          })
          console.log("after", distributions)
        }
        return data
      })
      .catch(error => {
        console.error("Error:", error)
      })
    return null
  }

  const makeChoice = (statementId, choice) => {
    sendChoice(statementId, choice)
  }

  const showResults = statementId => {
    fetchDistribution(statementId)
  }

  const Assertion = ({ assertion, distribution }) => {
    const showBars = distribution !== null
    return (
      <section className="slide">
        <h2 className="statement-heading">Hva mener du?</h2>
        <p className="statement">{assertion.text}</p>
        {showBars && (
          <div className="poll-distribution" style={{ maxHeight: "10rem" }}>
            {options.map(option => {
              const thisDistribution =
                distribution.filter(x => x.agreement === option)[0] || null
              const pct = thisDistribution && thisDistribution.percent
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
                  {...buttonize(() => makeChoice(assertion.id, option))}
                >
                  {option}
                </div>
              )
            })}
          </div>
          <div className="poll-option-label">Enig</div>
        </div>
        {!showBars && (
          <div
            className="button statement-show-results"
            {...buttonize(() => showResults(assertion.id))}
          >
            Vis resultat
          </div>
        )}
      </section>
    )
  }

  return assertions.map(x => (
    <Assertion assertion={x} distribution={distributions[x.id] || null} />
  ))
}

export default PaLinje
