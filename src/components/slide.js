import PropTypes from "prop-types"
import React from "react"

import { convertToRoman } from "../utils"

const Slide = ({ data, index }) => {
  const { __typename: type, backgroundColor } = data
  const backgroundColorHex = backgroundColor ? backgroundColor : "inherit"
  const slideStyle = { backgroundColor: backgroundColorHex }
  const darkColors = ["#e269a3", "#0f4138"]
  const bgIsDark = darkColors.includes(backgroundColorHex.toLowerCase())
  const bgIsWhite = !backgroundColor || backgroundColorHex === "#ffffff"
  const extraClasses = `${bgIsDark ? "invert" : ""} ${bgIsWhite ? "" : "bgcolor"}`

  if (type === "Balanse_slide_kapittelforside_BlockType") {
    const { images, lead, chapterTitle: title } = data
    const imageUrl = images && images.length !== 0 ? images[0].url : null
    return (
      <section
        className={`slide ${extraClasses} slide--chapter-front`}
        style={slideStyle}
      >
        <div className="slide__content">
          {index !== 0 && (
            <span className="chapter-no">Del {convertToRoman(index)}</span>
          )}
          <h1>{title}</h1>
          {lead && <div className="slide--chapter-front--lead">{lead}</div>}
          {imageUrl && <img src={imageUrl} alt={images[0].title || ""} />}
        </div>
      </section>
    )
  }

  if (type === "Balanse_slide_enKolonne_BlockType") {
    const { text, citations } = data
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div
          className="slide__content single-column"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations }}
          />
        )}
      </section>
    )
  }

  if (type === "Balanse_slide_toKolonner_BlockType") {
    const { left, right, citations } = data
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div className="slide__content split">
          <div
            className="column left"
            dangerouslySetInnerHTML={{ __html: left }}
          />
          <div
            className="column right"
            dangerouslySetInnerHTML={{ __html: right }}
          />
        </div>
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations }}
          />
        )}
      </section>
    )
  }

  if (type === "Balanse_slide_sitat_BlockType") {
    const { quote, quoteDescription, citations } = data
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div className="slide__content slide__content--quote">
          <blockquote className="slide__quote">{quote}</blockquote>
          <div
            className="quote-description"
            dangerouslySetInnerHTML={{ __html: quoteDescription }}
          />
        </div>
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations }}
          />
        )}
      </section>
    )
  }

  if (type === "Balanse_slide_tekstOgBilde_BlockType") {
    const { text, image, imagePlacement, citations } = data
    const imageUrl = image && image.length !== 0 ? image[0].url : null
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div
          className={`slide__content slide__textandimage slide__textandimage__${imagePlacement}`}
        >
          <div
            className="column column--text"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className="column column--image">
            {imageUrl && <img src={imageUrl} alt={image[0].title || ""} />}
          </div>
        </div>
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations }}
          />
        )}
      </section>
    )
  }
  return (
    <p>
      Unhandled slide type <em>{type}</em>
    </p>
  )
}

Slide.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default Slide
