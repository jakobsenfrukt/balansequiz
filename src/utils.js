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
