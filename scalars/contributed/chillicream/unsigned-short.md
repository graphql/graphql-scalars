# UnsignedShort — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-09

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `UnsignedShort` scalar type represents an unsigned 16-bit integer. It is
intended for scenarios where values are constrained to the range 0 to 65,535,
such as representing port numbers, small counts, or other non-negative values
that fit within 16 bits.

Unlike the `Short` scalar which represents signed 16-bit integers with a range
of -32,768 to 32,767, `UnsignedShort` provides stronger type safety for values
that must be non-negative and can represent larger positive values.

# Recommended name

The recommended name for this scalar is `UnsignedShort`.

# Result spec

An `UnsignedShort` scalar must serialize to an integer value in the range 0 to
65,535 (inclusive).

## Examples

These are valid result values:

| Value   | Explanation                   |
| ------- | ----------------------------- |
| `0`     | Minimum unsigned short value. |
| `65535` | Maximum unsigned short value. |
| `8080`  | A common port number.         |

These are invalid result values:

| Value    | Why is it invalid                     |
| -------- | ------------------------------------- |
| `-1`     | Negative values are not allowed.      |
| `65536`  | Exceeds maximum unsigned short value. |
| `3.14`   | Fractional values are not allowed.    |
| `"8080"` | Must be a number, not a string.       |

# Input spec

An `UnsignedShort` scalar accepts integer values in the range 0 to 65,535
(inclusive), both as GraphQL literals and as JSON input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between 0 and 65,535 (inclusive)
- Value is not negative

## Examples

Valid input values:

GraphQL Literal:

```graphql
query {
  serviceStatus(port: 8080) {
    status
  }
}
```

JSON input:

```json
{
  "port": 8080
}
```

```json
{
  "maxConnections": 65535
}
```

Invalid input values:

| Value    | Why is it invalid                     |
| -------- | ------------------------------------- |
| `-1`     | Negative values are not allowed.      |
| `65536`  | Exceeds maximum unsigned short value. |
| `3.14`   | Fractional values are not allowed.    |
| `"8080"` | Must be a number, not a string.       |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
