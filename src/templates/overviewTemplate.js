import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({
    pageContext
  }) {
  const { specs } = pageContext;
  return (
    <Layout>
      <h1>List of all Scalar specifications</h1>
      <div className="overview-container">
        <ol>{specs.map(spec => {
          return <li><Link to={spec.path}>{spec.name}</Link></li>
        })}
        </ol>
      </div>
    </Layout>
  );
}
