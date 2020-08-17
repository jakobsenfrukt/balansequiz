import { Link } from "gatsby"
import React from "react"
import Logo from "../images/BKlogo.svg"

const Footer = () => (
  <footer className="site-footer">
    <Link to="https://balansekunstprosjektet.no" target="_blank">
      <span>Et initiativ fra</span><br />
      <img className="logo" src={Logo} alt="Logo for Balansekunstprosjektet" />
    </Link>
  </footer>
)

export default Footer
