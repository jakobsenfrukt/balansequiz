import React from "react"
import { buttonize } from "../utils"

const Register = ({ data, onSend }) => {
  const { inputs } = data

  const sendForm = () => {
    onSend()
  }

  return (
    <section className="slide green">
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
              ></input>
            </label>
            <p>{input.description}</p>
          </div>
        ))}
        <div className="button" role="button" {...buttonize(() => sendForm())}>
          Send inn og start kurset
        </div>
      </div>
    </section>
  )
}

export default Register
