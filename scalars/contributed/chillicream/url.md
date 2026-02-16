# URL — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-05

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `URL` scalar type represents a Uniform Resource Locator (URL) as defined by
RFC 3986. It is intended for scenarios where a field must contain a valid URL,
such as links to external resources, API endpoints, image sources, or any
web-accessible resource.

Unlike the built-in `String` scalar which accepts any text, `URL` provides
validation to ensure the value conforms to the URL specification.

# Recommended name

The recommended name for this scalar is `URL`.

# Result spec

A `URL` scalar must serialize to a string representation of a valid URL
conforming to RFC 3986.

A valid URL must include:

- A scheme (e.g., `http`, `https`, `ftp`)
- A hierarchical part (authority and/or path)

The URL may optionally include:

- A query string
- A fragment identifier

## Examples

These are valid result values:

| Value                                      | Explanation                     |
| ------------------------------------------ | ------------------------------- |
| `"https://example.com"`                    | Simple HTTPS URL.               |
| `"https://example.com/path/to/resource"`   | URL with path.                  |
| `"https://example.com:8080/api?key=value"` | URL with port and query string. |
| `"ftp://files.example.com/document.pdf"`   | FTP URL.                        |
| `"https://example.com/page#section"`       | URL with fragment.              |

These are invalid result values:

| Value             | Why is it invalid                  |
| ----------------- | ---------------------------------- |
| `"not a url"`     | Missing scheme and invalid format. |
| `"//example.com"` | Missing scheme.                    |
| `"http://"`       | Missing authority/path.            |
| `"example.com"`   | Missing scheme.                    |
| `123`             | Must be a string, not a number.    |

# Input spec

A `URL` scalar accepts string values representing valid URLs conforming to RFC
3986, both as GraphQL literals and as JSON input values.

Implementations should validate:

- String is a valid URL per RFC 3986
- URL includes a scheme
- URL has a valid hierarchical structure

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  addBookmark(url: "https://example.com/article") {
    id
  }
}
```

JSON input:

```json
{
  "url": "https://example.com/article"
}
```

```json
{
  "imageSource": "https://cdn.example.com/images/photo.jpg"
}
```

Invalid input values:

| Value             | Why is it invalid                  |
| ----------------- | ---------------------------------- |
| `"not a url"`     | Missing scheme and invalid format. |
| `"//example.com"` | Missing scheme.                    |
| `"example.com"`   | Missing scheme.                    |
| `"http://"`       | Missing authority/path.            |
| `""`              | Empty string.                      |

# References

- [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) — Uniform Resource
  Identifier (URI): Generic Syntax
