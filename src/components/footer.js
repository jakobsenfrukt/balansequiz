import { Link } from "gatsby"
import React from "react"
import Logo from "../images/BKlogo.svg"

const Footer = () => (
  <footer className="site-footer">
    <div>
      Et initiativ fra
      <Link to="https://balansekunstprosjektet.no" target="_blank">
        <img className="logo" src={Logo} alt="Logo for Balansekunstprosjektet" />
      </Link>
    </div>
  </footer>
)

export default Footer
