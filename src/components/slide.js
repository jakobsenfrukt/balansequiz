import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Slide = ({ data }) => {
  console.log("slide data", data)
  const { __typename: type } = data
  if (type === "Balanse_SlideKapittelforside") {
    const { images, chapterTitle: title } = data
    const imageUrl = images && images.length != 0 ? images[0].url : null
    return (
      <section className="slide-chapter-front">
        <header className="chapter-header">{title}</header>
        {imageUrl && <img src={imageUrl} />}
      </section>
    )
  }
  if (type === "Balanse_SlideEnKolonne") {
    const { text } = data
    return (
      <section
        className="slide-one-column"
        dangerouslySetInnerHTML={{ __html: text.content }}
      />
    )
  }
  if (type === "Balanse_SlideToKolonner") {
    const { left, right } = data
    return (
      <section className="slide-two-columns">
        <div
          className="column-left"
          dangerouslySetInnerHTML={{ __html: left.content }}
        />
        <div
          className="column-right"
          dangerouslySetInnerHTML={{ __html: right.content }}
        />
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
