import { useState, useEffect } from "react"

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export const stripPrefix = (needle, haystack) => {
  if (haystack.indexOf(needle) === 0) {
    return haystack.slice(needle.length)
  }
  return haystack
}

export const stripSectionPrefixFromUri = uri => stripPrefix("kurs", uri)

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const debounce = (func, wait) => {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const buttonize = handler => {
  return {
    role: "button",
    onClick: handler,
    onKeyDown: event => {
      // 13 = Enter
      if (event.keyCode === 13) {
        handler(event)
      }
    },
  }
}

export const convertToRoman = num => {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }
  let str = ""

  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i])
    num -= q * roman[i]
    str += i.repeat(q)
  }

  return str
}
