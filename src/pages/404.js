import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Finner ikke siden!" />
    <h1>Finner ikke siden!</h1>
    <p>Ånei! Her gikk noe galt. Sorry! Gå tilbake og prøv igjen.</p>
  </Layout>
)

export default NotFoundPage
