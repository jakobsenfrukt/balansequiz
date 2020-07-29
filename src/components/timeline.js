import PropTypes from "prop-types"
import React from "react"

const Timeline = ({ siteTitle }) => (
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
)

export default Timeline
