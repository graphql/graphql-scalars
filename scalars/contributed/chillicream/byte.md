# Byte — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-02-16

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Byte` scalar type represents a signed 8-bit integer. It is intended for
scenarios where values are constrained to the range -128 to 127, such as
representing small offsets, temperature differences, or compact signed counters.

Unlike the built-in `Int` scalar which represents signed 32-bit integers, `Byte`
provides stronger type safety and validation for values that must fit within a
signed 8-bit range.

# Recommended name

The recommended name for this scalar is `Byte`.

# Result spec

A `Byte` scalar must serialize to an integer value in the range -128 to 127
(inclusive).

## Examples

These are valid result values:

| Value  | Explanation                |
| ------ | -------------------------- |
| `-128` | Minimum signed byte value. |
| `0`    | Zero value.                |
| `127`  | Maximum signed byte value. |
| `-42`  | Negative value in range.   |
| `42`   | Positive value in range.   |

These are invalid result values:

| Value  | Why is it invalid                        |
| ------ | ---------------------------------------- |
| `-129` | Below minimum signed byte value (-128).  |
| `128`  | Exceeds maximum signed byte value (127). |
| `3.14` | Fractional values are not allowed.       |
| `"42"` | Must be a number, not a string.          |

# Input spec

A `Byte` scalar accepts integer values in the range -128 to 127 (inclusive),
both as GraphQL literals and as JSON input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between -128 and 127 (inclusive)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  setSensor(offset: -10, calibration: 5) {
    id
  }
}
```

JSON input:

```json
{
  "offset": -10,
  "calibration": 5
}
```

Invalid input values:

| Value  | Why is it invalid                        |
| ------ | ---------------------------------------- |
| `-129` | Below minimum signed byte value (-128).  |
| `128`  | Exceeds maximum signed byte value (127). |
| `3.14` | Fractional values are not allowed.       |
| `"42"` | Must be a number, not a string.          |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
