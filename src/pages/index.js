import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const nextSlide = () => window.scrollBy(0, window.innerHeight)

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
      <div className="slide__content">
        <blockquote>Hvorfor sa du ikke bare nei?</blockquote>
        <p>
          Mange som forteller om opplevelser med seksuell trakassering og overgrep
          blir møtt med spørsmål om hva de selv gjorde for å sette grenser.
        </p>
      </div>
    </section>
    <nav className="slide-nav">
      <span className="arrow-text left">Klikk for å</span>
      <div className="arrow-next-slide" onClick={nextSlide}>
        &darr;
      </div>
      <span className="arrow-text right">gå til neste</span>
    </nav>
  </Layout>
)

export default IndexPage
