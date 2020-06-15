import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const nextSlide = () => (
  window.scrollBy(0, window.innerHeight)
)

const IndexPage = () => (
  <Layout>
    <SEO title="Start" />
    <section className="green">
      <h1>Velkommen!</h1>
      <label htmlFor="org">
        Hvilken organisasjon tilhører du?
        <input id="org" name="org" type="text" aria-label="Hvilken organisasjon tilhører du?" placeholder="Navn på organisasjon"></input>
      </label>
      <p>Vi lagrer informasjonen anonymt. Vi spør fordi vi trenger det til rapporter til Kulturrådet blablabla.</p>
    </section>
    <section className="pink">
      <h1>
        <span className="chapter-no">Del 1</span> En overskrift til en del av kurset
      </h1>
    </section>
    <section>
      <header className="chapter-header">Del 1: Seksuell trakassering i tall</header>
      <p>Tall fra Statistisk Sentralbyrå viser at</p>
      <h1>4 %</h1>
      <p>av sysselsatte i Norge opplever uønsket seksuell oppmerksomhet, kommentarer eller lignende, et par ganger i måneden eller oftere.</p>
    </section>
    <section className="green">
      <h1>Yo</h1>
      <ul>
        <li>hei</li>
        <li>dette er</li>
        <li>en kul liste</li>
      </ul>
    </section>
    <section>
      <p>Hvilket årstall?</p>
      <h1>Norge vedtar Likestillingsloven</h1>
      <div className="timeline-wrapper">
        <div className="timeline-scroll">
          <div className="timeline">
            <div className="options">
              <div className="option-button">1812</div>
              <div className="option-button">1925</div>
              <div className="option-button">2018</div>
            </div>
          </div>
        </div>
      </div>
      <p className="information">Klikk eller scroll for å se hele &rarr;</p>
      <p className="timeline-fact">Lov om likestilling mellom kjønnene (Likestillingsloven) ble vedtatt 9. juni 1978 og trådte i kraft den 15. mars 1979.</p>
    </section>
    <section className="darkgreen">
      <h1>Yo</h1>
    </section>
    <section>
      <blockquote>Hvorfor sa du ikke bare nei?</blockquote>
      <p>Mange som forteller om opplevelser med seksuell trakassering og overgrep blir møtt med spørsmål om hva de selv gjorde for å sette grenser.</p>
    </section>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    &rarr; <Link to="/page-2/">Go to page 2</Link> <br />
    <nav class="slide-nav">
      <span className="arrow-text left">Klikk for å</span>
      <div className="arrow-next-slide" onClick={nextSlide}>&darr;</div>
      <span className="arrow-text right">gå til neste</span>
    </nav>
  </Layout>
)

export default IndexPage
