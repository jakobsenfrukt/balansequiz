import PropTypes from "prop-types"
import React from "react"

import { convertToRoman } from "../utils"

const Slide = ({ data, index }) => {
  const { __typename: type, backgroundColor } = data
  const backgroundColorHex = backgroundColor ? backgroundColor.hex : "inherit"
  const slideStyle = { backgroundColor: backgroundColorHex }
  const darkColors = ["#e269a3", "#0f4138"]
  const bgIsDark = darkColors.includes(backgroundColorHex.toLowerCase())
  const extraClasses = bgIsDark ? "invert" : ""

  if (type === "Balanse_SlideKapittelforside") {
    const { images, chapterTitle: title } = data
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
          {imageUrl && <img src={imageUrl} alt="" />}
        </div>
      </section>
    )
  }

  if (type === "Balanse_SlideEnKolonne") {
    const { text, citations } = data
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div
          className="slide__content single-column"
          dangerouslySetInnerHTML={{ __html: text.content }}
        />
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations.content }}
          />
        )}
      </section>
    )
  }

  if (type === "Balanse_SlideToKolonner") {
    const { left, right, citations } = data
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div className="slide__content split">
          <div
            className="column left"
            dangerouslySetInnerHTML={{ __html: left.content }}
          />
          <div
            className="column right"
            dangerouslySetInnerHTML={{ __html: right.content }}
          />
        </div>
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations.content }}
          />
        )}
      </section>
    )
  }

  if (type === "Balanse_SlideSitat") {
    const { quote, quoteDescription, citations } = data
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div className="slide__content">
          <blockquote>{quote}</blockquote>
          <div
            className="quote-description"
            dangerouslySetInnerHTML={{ __html: quoteDescription.content }}
          />
        </div>
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations.content }}
          />
        )}
      </section>
    )
  }

  if (type === "Balanse_SlideTekstOgBilde") {
    const { text, image, imagePlacement, citations } = data
    const imageUrl = image && image.length !== 0 ? image[0].url : null
    return (
      <section className={`slide ${extraClasses}`} style={slideStyle}>
        <div
          className={`slide__content slide__textandimage slide__textandimage__${imagePlacement}`}
        >
          <div
            className="column column--text"
            dangerouslySetInnerHTML={{ __html: text.content }}
          />
          <div className="column column--image">
            {imageUrl && <img src={imageUrl} alt="" />}
          </div>
        </div>
        {citations && (
          <div
            className="slide__citations"
            dangerouslySetInnerHTML={{ __html: citations.content }}
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
