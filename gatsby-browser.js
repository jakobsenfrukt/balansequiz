/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { NavigationWrapper } from "./src/templates/chapter.js"

export const wrapPageElement = ({ element, props }) => {
  if (!props.pageContext.showNavigation) {
      return element
  }
  return <NavigationWrapper {...props}>{element}</NavigationWrapper>
}
