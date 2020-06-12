import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Start" />
    <section className="green">
      <h1>Velkommen!</h1>
      <label>Hvilken organisasjon tilhører du?</label>
      <input type="text"></input>
      <p>Vi lagrer informasjonen anonymt. Vi spør fordi vi trenger det til rapporter til Kulturrådet blablabla.</p>
    </section>
    <section className="pink">
      <h1>Yo</h1>
    </section>
    <section>
      <p>Tall fra Statistisk Sentralbyrå viser at</p>
      <h1>4 %</h1>
      <p>av sysselsatte i Norge opplever uønsket seksuell oppmerksomhet, kommentarer eller lignende, et par ganger i måneden eller oftere.</p>
    </section>
    <section className="green">
      <h1>Yo</h1>
    </section>
    <section>
      <p>Hvilket årstall?</p>
      <h1>Norge vedtar Likestillingsloven</h1>
      <div class="options">
        <div>1812</div>
        <div>1925</div>
        <div>2018</div>
      </div>
      <p class="timeline-fact">Lov om likestilling mellom kjønnene (Likestillingsloven) ble vedtatt 9. juni 1978 og trådte i kraft den 15. mars 1979.</p>
    </section>
    <section className="darkgreen">
      <h1>Yo</h1>
    </section>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    &rarr; <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
