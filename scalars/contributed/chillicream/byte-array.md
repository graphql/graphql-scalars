<!-- cspell:ignore AQIDBA -->

# ByteArray — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-29

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `ByteArray` scalar type represents an array of bytes encoded as a Base64
string. It is intended for scenarios where binary data needs to be transmitted,
such as file contents, cryptographic keys, image data, or any arbitrary binary
data.

Base64 encoding allows binary data to be safely represented as text in JSON and
GraphQL, which natively only support text-based formats.

This scalar is based on the .NET `Byte[]` (byte array) type.

# Recommended name

The recommended name for this scalar is `ByteArray`.

# Result spec

A `ByteArray` scalar must serialize to a Base64-encoded string representing the
binary data.

The Base64 encoding should follow RFC 4648, using the standard Base64 alphabet
(A-Z, a-z, 0-9, +, /) with padding characters (=) as needed.

## Examples

These are valid result values:

| Value                | Explanation                        |
| -------------------- | ---------------------------------- |
| `"SGVsbG8gV29ybGQ="` | Base64-encoded "Hello World".      |
| `"AQIDBA=="`         | Base64-encoded bytes [1, 2, 3, 4]. |
| `""`                 | Empty byte array (zero bytes).     |

These are invalid result values:

| Value               | Why is it invalid                               |
| ------------------- | ----------------------------------------------- |
| `"Hello World"`     | Not Base64-encoded.                             |
| `"SGVsbG8gV29ybGQ"` | Missing padding (should be `SGVsbG8gV29ybGQ=`). |
| `"SGVs bG8="`       | Contains whitespace.                            |
| `123`               | Not a string value.                             |

# Input spec

A `ByteArray` scalar accepts Base64-encoded string values, both as GraphQL
literals and as JSON input values.

The input must be a valid Base64-encoded string following RFC 4648.
Implementations should validate that the input string contains only valid Base64
characters and proper padding.

Implementations should validate:

- String contains only valid Base64 characters (A-Z, a-z, 0-9, +, /, =)
- Padding is correct (0, 1, or 2 '=' characters at the end)
- String length is valid for Base64 encoding (multiple of 4 characters after
  padding)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  uploadFile(content: "SGVsbG8gV29ybGQ=") {
    id
  }
}
```

JSON input:

```json
{
  "content": "SGVsbG8gV29ybGQ="
}
```

```json
{
  "thumbnail": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
}
```

Invalid input values:

| Value           | Why is it invalid                     |
| --------------- | ------------------------------------- |
| `"Hello World"` | Not Base64-encoded.                   |
| `"SGVs bG8="`   | Contains whitespace.                  |
| `"SGVsbG8!"`    | Contains invalid character (!).       |
| `"SGVsbG8"`     | Invalid length (not a multiple of 4). |

# References

- [RFC 4648](https://www.rfc-editor.org/rfc/rfc4648) — The Base64 Data Encoding
- [.NET Byte](https://learn.microsoft.com/en-us/dotnet/api/system.byte) — The
  .NET type this scalar is based on
