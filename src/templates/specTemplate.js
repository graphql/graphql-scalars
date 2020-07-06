import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { html } = markdownRemark
  const { isCurrentVersion } = pageContext;
  return (
    <Layout>
      <div className="spec-container">
        {isCurrentVersion && <h3>Current Version</h3>}
        {!isCurrentVersion && <h3>Warning: this is not the current version</h3>}
        <div className="spec">
          <div
            className="spec-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <Link to='/overview'>All Scalars overview</Link>
      </div>
    </Layout >
  );
}

export const pageQuery = graphql`
  query($name: String!, $author: String!, $version: Int!) {
    markdownRemark(frontmatter: { name: { eq: $name }, author: {eq:$author}, version: {eq: $version} }) {
      html
    }
  }
`