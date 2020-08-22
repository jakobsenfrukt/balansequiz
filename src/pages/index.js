import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
        <br /><br /><br />
        <p>
          <br/>Utviklingverktøy:<br/>
          <h2><Link to="/chapters">Liste over kapitler</Link></h2>
        </p>
      </div>
    </section>
  </Layout>
)

export default IndexPage
