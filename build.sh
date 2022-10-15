#!/bin/bash -e
# This script publishes the GraphQL custom scalars specs

echo "Building guide"
mkdir -p public
cp scalars/*.png public
spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" scalars/guide.md > public/guide.html


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
      td {
        padding-bottom: 5px;
      }
      td + td {
        padding-left: 2ch;
      }
    </style>
  </head>
  <body>
  This is a list of custom Scalars specifications, contributed by the community.
  They are hosted on scalars.graphql.org
    <h1>GraphQL Custom Scalars specs</h1>
    <a href=\"guide.html\">Scalars implementation guide</a></td>
    <table>"

echo "building specs"
for AUTHOR in scalars/contributed/*; do
  for FILE in "$AUTHOR"/*; do
    spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" "$FILE" > public/"$(basename $AUTHOR)"-"$(basename $FILE)".html
    HTML="$HTML
      <tr>
        <td>$(basename $AUTHOR)</td>
        <td><a href=\"$(basename $AUTHOR)-$(basename $FILE).html\">$(basename ${FILE%.*})</a></td>
      </tr>"
    true
  done
done


HTML="$HTML
    </table>
  </body>
</html>"

echo "$HTML" > "public/index.html"
