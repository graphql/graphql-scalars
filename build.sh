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
    <p>This is a directory of GraphQL Custom Scalar specifications, contributed by the community.</p>

    <p>Specifications in this directory can be referred to with the <a href=\"https://spec.graphql.org/draft/#sec--specifiedBy\">@specifiedBy directive</a>, a built-in directive for documenting the behavior of custom scalar types.</p>
    <h1><a href=\"guide.html\">Scalars implementation guide</a></td></h1>
    <h1>Custom Scalar specifications</h1>
    <table>
     <tr>
        <th>Author</th>
        <th>Spec name</th>
      </tr>"

echo "building specs"
for AUTHOR in scalars/contributed/*; do
  mkdir public/"$(basename $AUTHOR)"
  for FILE in "$AUTHOR"/*; do
    spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" "$FILE" > public/"$(basename $AUTHOR)"/"$(basename $FILE .md)".html
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
  </body>
</html>"

echo "$HTML" > "public/index.html"
