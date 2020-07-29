import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const nextSlide = () => window.scrollBy(0, window.innerHeight)

const IndexPage = () => (
  <Layout>
    <SEO title="Start" />
    <section className="green">
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
    </section>
    <section className="pink invert">
      <h1>
        <span className="chapter-no">Del 1</span> En overskrift til en del av
        kurset
      </h1>
    </section>
    <section>
      <header className="chapter-header">
        Del 1: Seksuell trakassering i tall
      </header>
      <p>Tall fra Statistisk Sentralbyrå viser at</p>
      <span className="statistics-number">4 %</span>
      <p>
        av sysselsatte i Norge opplever uønsket seksuell oppmerksomhet,
        kommentarer eller lignende, et par ganger i måneden eller oftere.
      </p>
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
      <p className="timeline-fact">
        Lov om likestilling mellom kjønnene (Likestillingsloven) ble vedtatt 9.
        juni 1978 og trådte i kraft den 15. mars 1979.
      </p>
    </section>
    <section className="darkgreen invert">
      <h1>Yo</h1>
      <ul>
        <li>hei</li>
        <li>dette er</li>
        <li>en kul liste</li>
      </ul>
      <Image />
    </section>
    <section>
      <blockquote>Hvorfor sa du ikke bare nei?</blockquote>
      <p>
        Mange som forteller om opplevelser med seksuell trakassering og overgrep
        blir møtt med spørsmål om hva de selv gjorde for å sette grenser.
      </p>
    </section>
    <section class="pink split">
      <div class="column">
        <h2>
          En overskrift til en del av kurset
        </h2>
      </div>
      <div class="column">
        <p>Et annet eksempel på tolkning og tall:</p>
        <p>EU gjorde for noen år siden en studie av forekomsten av seksuell trakassering og kjønnsbasert vold blant kvinner i EU-land. Det landet som rapporterer om høyest forekomst av seksuell trakassering er Sverige, hvor 81 % av kvinnene oppgir å ha opplevd seksuell trakassering. I Spania og Italia er tallet på rundt 50 % og i Polen er det rundt 40 %.</p>
        <p>Det er lite trolig at Sverige sliter med mer seksuell trakassering sammenliknet med resten av Europa. I stedet handler dette om at det finnes en høyere bevissthet om tematikken i Sverige som gjør at flere svenske kvinner setter ord på uønsket seksuell oppmerksomhet som seksuell trakassering.</p>
      </div>
    </section>
    <section class="darkgreen invert">
      <p>Et annet eksempel på tolkning og tall:</p>
      <p>EU gjorde for noen år siden en studie av forekomsten av seksuell trakassering og kjønnsbasert vold blant kvinner i EU-land. Det landet som rapporterer om høyest forekomst av seksuell trakassering er Sverige, hvor 81 % av kvinnene oppgir å ha opplevd seksuell trakassering. I Spania og Italia er tallet på rundt 50 % og i Polen er det rundt 40 %.</p>
      <p>Det er lite trolig at Sverige sliter med mer seksuell trakassering sammenliknet med resten av Europa. I stedet handler dette om at det finnes en høyere bevissthet om tematikken i Sverige som gjør at flere svenske kvinner setter ord på uønsket seksuell oppmerksomhet som seksuell trakassering.</p> 
      <p>Det er lite trolig at Sverige sliter med mer seksuell trakassering sammenliknet med resten av Europa. I stedet handler dette om at det finnes en høyere bevissthet om tematikken i Sverige som gjør at flere svenske kvinner setter ord på uønsket seksuell oppmerksomhet som seksuell trakassering.</p> 
      <p>Det er lite trolig at Sverige sliter med mer seksuell trakassering sammenliknet med resten av Europa. I stedet handler dette om at det finnes en høyere bevissthet om tematikken i Sverige som gjør at flere svenske kvinner setter ord på uønsket seksuell oppmerksomhet som seksuell trakassering.</p>  
    </section>
    &rarr; <Link to="/page-2/">Go to page 2</Link> <br />
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
