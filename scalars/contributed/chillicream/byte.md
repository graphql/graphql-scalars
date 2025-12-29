# Byte — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-29

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Byte` scalar type represents an unsigned 8-bit integer. It is intended for
scenarios where values are constrained to the range 0 to 255, such as
representing color channel values (RGB), small counters, or byte-level data.

Unlike the built-in `Int` scalar which represents signed 32-bit integers, `Byte`
provides stronger type safety and validation for values that must fit within an
unsigned 8-bit range.

This scalar is based on the .NET `Byte` type.

# Recommended name

The recommended name for this scalar is `Byte`.

# Result spec

A `Byte` scalar must serialize to an integer value in the range 0 to 255
(inclusive).

## Examples

These are valid result values:

| Value | Explanation         |
| ----- | ------------------- |
| `0`   | Minimum byte value. |
| `255` | Maximum byte value. |
| `128` | Mid-range value.    |

These are invalid result values:

| Value   | Why is it invalid                  |
| ------- | ---------------------------------- |
| `-1`    | Negative values are not allowed.   |
| `256`   | Exceeds maximum byte value (255).  |
| `3.14`  | Fractional values are not allowed. |
| `"128"` | Must be a number, not a string.    |

# Input spec

A `Byte` scalar accepts integer values in the range 0 to 255 (inclusive), both
as GraphQL literals and as JSON input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between 0 and 255 (inclusive)
- Value is not negative

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  setColor(red: 255, green: 128, blue: 0) {
    id
  }
}
```

JSON input:

```json
{
  "red": 255,
  "green": 128,
  "blue": 0
}
```

Invalid input values:

| Value   | Why is it invalid                  |
| ------- | ---------------------------------- |
| `-1`    | Negative values are not allowed.   |
| `256`   | Exceeds maximum byte value (255).  |
| `3.14`  | Fractional values are not allowed. |
| `"128"` | Must be a number, not a string.    |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
- [.NET Byte Structure](https://learn.microsoft.com/en-us/dotnet/api/system.byte)
  — The .NET type this scalar is based on
