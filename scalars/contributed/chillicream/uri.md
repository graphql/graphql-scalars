# URI — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-02-16

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `URI` scalar type represents a Uniform Resource Identifier (URI) as defined
by RFC 3986. It is intended for scenarios where a field must contain a valid
URI, which includes both URLs (locators) and URNs (names), such as resource
identifiers, namespace identifiers, or any standardized resource reference.

Unlike the `URL` scalar which specifically requires a locator with a scheme and
hierarchical structure, `URI` accepts the broader set of URI formats including
relative references and URNs. Unlike the built-in `String` scalar which accepts
any text, `URI` provides validation to ensure the value conforms to the URI
specification.

# Recommended name

The recommended name for this scalar is `URI`.

# Result spec

A `URI` scalar must serialize to a string representation of a valid URI
conforming to RFC 3986.

A valid URI may be:

- An absolute URI with scheme (e.g., `https://example.com`,
  `urn:isbn:0451450523`)
- A relative reference (e.g., `/path/to/resource`, `../parent/resource`)
- A URI with optional authority, path, query, and fragment components

## Examples

These are valid result values:

| Value                                      | Explanation                       |
| ------------------------------------------ | --------------------------------- |
| `"https://example.com"`                    | Absolute HTTP URL.                |
| `"urn:isbn:0451450523"`                    | URN for an ISBN.                  |
| `"/path/to/resource"`                      | Relative reference with path.     |
| `"//example.com/path"`                     | Protocol-relative reference.      |
| `"../parent/resource"`                     | Relative reference with parent.   |
| `"https://example.com:8080/api?key=value"` | Absolute URL with port and query. |
| `"mailto:user@example.com"`                | Mailto URI.                       |
| `"#section"`                               | Fragment-only reference.          |
| `"?query=value"`                           | Query-only reference.             |

These are invalid result values:

| Value                   | Why is it invalid               |
| ----------------------- | ------------------------------- |
| `"ht!tp://example.com"` | Invalid scheme characters.      |
| `"http://exam ple.com"` | Contains whitespace.            |
| `123`                   | Must be a string, not a number. |

# Input spec

A `URI` scalar accepts string values representing valid URIs conforming to RFC
3986, both as GraphQL literals and as JSON input values.

Implementations should validate:

- String is a valid URI per RFC 3986
- String does not contain invalid characters (e.g., unescaped spaces)
- String follows proper URI syntax rules

Note: Unlike the `URL` scalar, `URI` accepts both absolute and relative
references, making it suitable for a broader range of use cases.

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  createResource(uri: "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6") {
    id
  }
}
```

```graphql
mutation {
  addLink(uri: "/relative/path/to/resource") {
    id
  }
}
```

JSON input:

```json
{
  "uri": "https://example.com/article"
}
```

```json
{
  "resourceId": "urn:isbn:0451450523"
}
```

```json
{
  "relativeUrl": "../parent/page"
}
```

Invalid input values:

| Value                   | Why is it invalid              |
| ----------------------- | ------------------------------ |
| `"ht!tp://example.com"` | Invalid scheme characters.     |
| `"http://exam ple.com"` | Contains unescaped whitespace. |
| `""`                    | Empty string.                  |

# References

- [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) — Uniform Resource
  Identifier (URI): Generic Syntax
