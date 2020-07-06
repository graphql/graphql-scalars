import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>GraphQL custom Scalar specifications</p>
    <Link to="/overview">List of all custom scalars</Link> <br />
  </Layout>
)

export default IndexPage
