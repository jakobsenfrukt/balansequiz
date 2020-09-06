import React, { useState } from "react"
import { buttonize } from "../utils"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Register = ({ data, onSend }) => {
  const { inputs } = data
  const { balanseDataApiUrl } = useSiteMetadata()
  const [orgName, setOrgName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [registered, setRegistered] = useState(false)

  const sendForm = () => {
    if (orgName === "") {
      setErrorMessage("Du må fylle inn feltet.")
      return
    } else {
      setErrorMessage("")
    }
    const payload = {
      organization: orgName,
    }
    fetch(`${balanseDataApiUrl}/visitorOrganizations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data)
        setRegistered(true)
      })
      .catch(error => {
        console.error("Error:", error)
        setErrorMessage("Noe gikk galt :-(")
      })
  }

  if (registered) {
    return (
      <section className="slide">
        <div className="slide__content slide__register slide__register_complete">
          <h2>Takk!</h2>
          <p>Gå videre til kurset via knappen nedenfor.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="slide">
      <div className="slide__content slide__register">
        {inputs.map((input, index) => (
          <div key={index}>
            <label htmlFor="org">
              {input.question}
              <input
                id="org"
                name="org"
                type="text"
                aria-label={input.question}
                placeholder={input.placeholder || ""}
                onInput={e => setOrgName(e.target.value)}
              ></input>
            </label>
            <p>{input.description}</p>
          </div>
        ))}
        <div className="button" role="button" {...buttonize(() => sendForm())}>
          Send inn
        </div>
        {errorMessage !== "" && (
          <div className="slider__register__error">{errorMessage}</div>
        )}
      </div>
    </section>
  )
}

export default Register
