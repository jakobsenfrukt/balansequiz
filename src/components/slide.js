import PropTypes from "prop-types"
import React from "react"

import { convertToRoman } from "../utils"

const Slide = ({ data, index }) => {
  const { __typename: type } = data
  if (type === "Balanse_SlideKapittelforside") {
    const { images, chapterTitle: title } = data
    const imageUrl = images && images.length !== 0 ? images[0].url : null
    return (
      <section className="slide slide--chapter-front">
        <div className="slide__content">
          {index !== 0 && (
            <span className="chapter-no">Del {convertToRoman(index)}</span>
          )}
          <h1>{title}</h1>
          {imageUrl && <img src={imageUrl} />}
        </div>
      </section>
    )
  }
  if (type === "Balanse_SlideEnKolonne") {
    const { text } = data
    return (
      <section className="slide">
        <div
          className="slide__content"
          dangerouslySetInnerHTML={{ __html: text.content }}
        />
      </section>
    )
  }
  if (type === "Balanse_SlideToKolonner") {
    const { left, right } = data
    return (
      <section className="slide">
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
      </section>
    )
  }
  if (type === "Balanse_SlideSitat") {
    const { quote, quoteDescription } = data
    return (
      <section className="slide">
        <div className="slide__content">
          <blockquote>{quote}</blockquote>
          <div
            className="quote-description"
            dangerouslySetInnerHTML={{ __html: quoteDescription.content }}
          />
        </div>
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
