import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Risk from "../components/risk"

const IndexPage = () => (
  <Layout>
    <SEO title="Start" />
    <section className="slide green">
      <div className="slide__content">
        <h1>Velkommen!</h1>
        <label htmlFor="org">
          Hvilken organisasjon tilhører du?
          <input
            id="org"
            name="org"
            type="text"
            aria-label="Hvilken organisasjon tilhører du?"
            placeholder="Navn på organisasjon"
          ></input>
        </label>
        <p>
          Vi lagrer informasjonen anonymt. Vi spør fordi vi trenger det til
          rapporter til Kulturrådet blablabla.
        </p>
        <p>
          <br/>Utviklingverktøy:<br/>
          <Link to="/chapters">Liste over kapitler</Link>
        </p>
      </div>
    </section>
    <section className="slide">
      <h1>På linje</h1>
      <p>I denne oppgaven skal du ta stilling til ulike påstander om seksuell trakassering. Oppgi tall fra 1 (helt uenig) til 10 (helt enig) for å uttrykke hva du mener om påstandene.</p>
    </section>
    <section className="slide">
      <h2 className="statement-heading">Hvor enig er du?</h2>
      <p className="statement">Seksuell trakassering er mer utbredt i kulturlivet enn i andre sektorer</p>
      <div className="poll-options">
        <div className="poll-option-label">Uenig</div>
        <div className="poll-option-button">1</div>
        <div className="poll-option-button">2</div>
        <div className="poll-option-button">3</div>
        <div className="poll-option-button">4</div>
        <div className="poll-option-button">5</div>
        <div className="poll-option-button">6</div>
        <div className="poll-option-button">7</div>
        <div className="poll-option-label">Enig</div>
      </div>
    </section>
    <Risk />
  </Layout>
)

export default IndexPage
