import React, { useState, useEffect } from "react"
import { buttonize, useHasMounted, debounce } from "../utils"

export const NavigationWrapper = ({ children, pageContext, navigate }) => {
  const [hasClickedArrow, setHasClickedArrow] = useState(false)
  const [moreSlides, setMoreSlides] = useState(true)
  const [didInitialSlideCheck, setDidInitialSlideCheck] = useState(false)

  useEffect(() => {
    const debouncedOnScroll = debounce(onScroll, 50)
    window.addEventListener("scroll", debouncedOnScroll)
    return () => {
      window.removeEventListener("scroll", debouncedOnScroll)
    }
  })

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler)

    return () => {
      window.removeEventListener("keydown", keyDownHandler)
    }
  })

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return children
  }

  const keyDownHandler = ({ key, view }) => {
    if (key === "ArrowDown") {
      if (moreSlides) {
        nextSlide()
        view.event.preventDefault()
      }
    }
    if (key === "ArrowUp") {
      previousSlide()
      view.event.preventDefault()
    }
    if (key === "ArrowRight") {
      if (!moreSlides && moreChapters) {
        nextSlide()
      }
    }
  }

  const slides = document.getElementsByClassName("slide")

  const findNearbySlides = () => {
    let previous, current, next
    previous = current = next = null
    for (const slide of slides) {
      if (window.scrollY + 10 >= slide.offsetTop) {
        previous = current
        current = slide
        continue
      }
      next = slide
      break
    }
    return { previous: previous, next: next }
  }

  const onScroll = () => {
    const { next } = findNearbySlides()
    setMoreSlides(next !== null)
  }

  if (!didInitialSlideCheck) {
    onScroll()
    setDidInitialSlideCheck(true)
  }

  const nextSlide = () => {
    setHasClickedArrow(true)
    if (!moreSlides && moreChapters) {
      navigate(pageContext.nextChapterPath)
      return
    }
    const { next } = findNearbySlides()
    if (!next) {
      return
    }
    next.scrollIntoView({ behavior: "smooth" })
  }

  const previousSlide = () => {
    setHasClickedArrow(true)
    const { previous } = findNearbySlides()
    if (!previous) {
      return
    }
    previous.scrollIntoView({ behavior: "smooth" })
  }

  const moreChapters =
    pageContext.nextChapterPath !== null && pageContext.showNextChapterButton
  if (!moreSlides && !moreChapters) {
    return children
  }

  return (
    <>
      {children}
      <nav className={`slide-nav ${!moreSlides ? "next-chapter" : ""}`}>
        <span className="arrow-text left">
          {moreSlides && !hasClickedArrow && <>Klikk for å</>}
          {!moreSlides && <>Neste</>}
        </span>
        <div className="arrow-next-slide" {...buttonize(nextSlide)}>
          &darr;
        </div>
        <span className="arrow-text right">
          {moreSlides && !hasClickedArrow && <>gå til neste</>}
          {!moreSlides && <>kapittel</>}
        </span>
      </nav>
    </>
  )
}
