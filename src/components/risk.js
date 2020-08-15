import React from "react"

const Risks = ({ siteTitle }) => (
  <section className="slide">
    <h2 className="risk-heading">Oppdragsarbeid</h2>
    <p className="risk-description">I kulturlivet jobber mange frilans og som selvstendig næringsdrivende. Uten fast ansettelse kan det oppleves vanskelig å varsle i frykt for at konflikter kan ødelegge for fremtidige karrieremuligheter. Det kan skape en problematisk maktbalanse at frilansere er mer utskiftbare enn faste ansatte.</p>
    <div className="risk-options">
      <div className="risk-option-button">Ingen risiko</div>
      <div className="risk-option-button">Lav risiko</div>
      <div className="risk-option-button">Middels risiko</div>
      <div className="risk-option-button">Høy risiko</div>
    </div>
  </section>
)

export default Risks
