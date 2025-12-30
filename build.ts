#!/usr/bin/env tsx

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Get output directory from environment or use default
const OUT_DIR = process.env.OUT_DIR || "public";

console.log("Building guide");

// Remove and recreate output directory
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

// Copy PNG files
const pngFiles = fs
  .readdirSync("scalars")
  .filter((file) => file.endsWith(".png"));
for (const file of pngFiles) {
  fs.copyFileSync(path.join("scalars", file), path.join(OUT_DIR, file));
}

// Helper function to run spec-md
function buildSpec(inputPath: string, outputPath: string): void {
  const command = `spec-md --githubSource "https://github.com/graphql/graphql-scalars/blame/main/" "${inputPath}"`;
  const html = execSync(command, { encoding: "utf-8" });
  fs.writeFileSync(outputPath, html);
}

// Build documentation files
buildSpec("README.md", path.join(OUT_DIR, "readme-contribution-guide.html"));
buildSpec(
  "scalars/implementation-guide.md",
  path.join(OUT_DIR, "implementation-guide.html")
);
buildSpec("scalars/template.md", path.join(OUT_DIR, "template.html"));
buildSpec(
  "scalars/template-string.md",
  path.join(OUT_DIR, "template-string.html")
);

// Create the index file
console.log("Rebuilding: / (index)");

const htmlHeader = `<html>
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
      h3 {
        font-size: 1.17em;
        margin: 1.5rem 0 0.5em;
        color: #666666;
      }
      ul {
        padding-left: 2rem;
      }
    </style>
  </head>
  <body>
    <h1>GraphQL Custom Scalars</h1>
    <p>This is a directory of GraphQL Custom Scalar specifications, contributed by the community.</p>
    <p>Specifications in this directory can be referred to with the <a href="https://spec.graphql.org/draft/#sec--specifiedBy">@specifiedBy directive</a>, a built-in directive for documenting the behavior of custom scalar types.</p>

    <h2>Contributed specifications</h2>`;

// Build specs from contributed directory
console.log("building specs");

const authorGroups: Map<string, string[]> = new Map();
const contributedDir = "scalars/contributed";

if (fs.existsSync(contributedDir)) {
  const authors = fs
    .readdirSync(contributedDir)
    .filter((name) =>
      fs.statSync(path.join(contributedDir, name)).isDirectory()
    )
    .sort();

  for (const author of authors) {
    const authorDir = path.join(contributedDir, author);
    const outAuthorDir = path.join(OUT_DIR, author);
    fs.mkdirSync(outAuthorDir, { recursive: true });

    const files = fs
      .readdirSync(authorDir)
      .filter((file) => file.endsWith(".md"))
      .sort();

    const specs: string[] = [];
    for (const file of files) {
      const inputPath = path.join(authorDir, file);
      const baseName = path.basename(file, ".md");
      const outputPath = path.join(outAuthorDir, `${baseName}.html`);

      buildSpec(inputPath, outputPath);

      specs.push(
        `        <li><a href="${author}/${baseName}.html">${baseName}</a></li>`
      );
    }

    if (specs.length > 0) {
      authorGroups.set(author, specs);
    }
  }
}

// Generate grouped HTML
const groupedSections: string[] = [];
for (const [author, specs] of authorGroups) {
  groupedSections.push(`
    <h3>${author}</h3>
    <ul>
${specs.join("\n")}
    </ul>`);
}

const htmlFooter = `

    <h2>How to contribute</h2>
    <ul>
      <li><a href="readme-contribution-guide.html">README: a contribution guide</a></td></li>
      <li><a href="implementation-guide.html">Scalar specification implementation guide</a></td></li>
      <li><a href="template.html">Template: For new Scalars</a></td></li>
      <li><a href="template-string.html">Template: Simplifed for new String based Scalars</a></td></li>
    </ul>
  </body>
</html>`;

const fullHtml = htmlHeader + groupedSections.join("") + htmlFooter;
fs.writeFileSync(path.join(OUT_DIR, "index.html"), fullHtml);

console.log("");
console.log("Completed build:");

// Display directory contents (similar to du -ah)
function displayDirContents(dir: string, prefix = ""): void {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    const size = (stats.size / 1024).toFixed(1) + "K";
    console.log(`${size.padStart(8)}  ${fullPath}`);

    if (stats.isDirectory()) {
      displayDirContents(fullPath, prefix + "  ");
    }
  }
}

displayDirContents(OUT_DIR);
