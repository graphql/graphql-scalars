#!/bin/bash -eu
# This script publishes the GraphQL custom scalars specs

echo "Building guide"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp scalars/*.png "$OUT_DIR"
spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" README.md > "$OUT_DIR/readme-contribution-guide.html"
spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" scalars/implementation-guide.md > "$OUT_DIR/implementation-guide.html"
spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" scalars/template.md > "$OUT_DIR/template.html"
spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" scalars/template-string.md > "$OUT_DIR/template-string.html"


# Create the index file
echo "Rebuilding: / (index)"
HTML="<html>
  <head>
    <title>GraphQL Custom Scalars</title>
    <style>
      body {
        color: #333333;
        font: 13pt/18pt Cambria, 'Palatino Linotype', Palatino, 'Liberation Serif', serif;
        margin: 6rem auto 3rem;
        max-width: 780px;
      }
      @media (min-width: 1240px) {
        body {
          padding-right: 300px;
        }
      }
      a {
        color: #3B5998;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      h1 {
        font-size: 1.5em;
        margin: 8rem 0 2em;
      }
      h2 {
        font-size: 1.33em;
        margin: 2rem 0 1em;
      }
      ul {
        padding-left: 2rem;
      }
      table {
        border-spacing: 1rem 0.2rem;
        padding-left: 1rem;
      }
      th, td {
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h1>GraphQL Custom Scalars</h1>
    <p>This is a directory of GraphQL Custom Scalar specifications, contributed by the community.</p>
    <p>Specifications in this directory can be referred to with the <a href=\"https://spec.graphql.org/draft/#sec--specifiedBy\">@specifiedBy directive</a>, a built-in directive for documenting the behavior of custom scalar types.</p>

    <h2>Contributed specifications</h2>
    <table>
     <tr>
        <th>Author</th>
        <th>Spec name</th>
      </tr>"

echo "building specs"
for AUTHOR in scalars/contributed/*; do
  mkdir -p "$OUT_DIR/$(basename $AUTHOR)"
  for FILE in "$AUTHOR"/*; do
    spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" "$FILE" > "$OUT_DIR/$(basename $AUTHOR)"/"$(basename $FILE .md)".html
    HTML="$HTML
      <tr>
        <td>$(basename $AUTHOR)</td>
        <td><a href=\"$(basename $AUTHOR)/$(basename $FILE .md).html\">$(basename ${FILE%.*})</a></td>
      </tr>"
    true
  done
done

HTML="$HTML
    </table>

    <h2>How to contribute</h2>
    <ul>
      <li><a href=\"readme-contribution-guide.html\">README: a contribution guide</a></td></li>
      <li><a href=\"implementation-guide.html\">Scalar specification implementation guide</a></td></li>
      <li><a href=\"template.html\">Template: For new Scalars</a></td></li>
      <li><a href=\"template-string.html\">Template: Simplifed for new String based Scalars</a></td></li>
    </ul>
  </body>
</html>"

echo "$HTML" > "$OUT_DIR/index.html"

echo ""
echo "Completed build:"
du -ah "$OUT_DIR"
