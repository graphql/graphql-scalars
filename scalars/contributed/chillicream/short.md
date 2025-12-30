# Short — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-29

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Short` scalar type represents a signed 16-bit integer. It is intended for
scenarios where values are constrained to the range -32,768 to 32,767, providing
a more compact representation than the built-in `Int` scalar for smaller integer
values.

Unlike the built-in `Int` scalar which represents signed 32-bit integers,
`Short` provides stronger type safety and validation for values that must fit
within a signed 16-bit range.

This scalar is based on the .NET `Int16` type.

# Recommended name

The recommended name for this scalar is `Short`.

# Result spec

A `Short` scalar must serialize to an integer value in the range -32,768 to
32,767 (inclusive).

## Examples

These are valid result values:

| Value    | Explanation          |
| -------- | -------------------- |
| `0`      | Zero.                |
| `-32768` | Minimum short value. |
| `32767`  | Maximum short value. |

These are invalid result values:

| Value    | Why is it invalid                     |
| -------- | ------------------------------------- |
| `-32769` | Below minimum short value (-32,768).  |
| `32768`  | Exceeds maximum short value (32,767). |
| `3.14`   | Fractional values are not allowed.    |
| `"1000"` | Must be a number, not a string.       |

# Input spec

A `Short` scalar accepts integer values in the range -32,768 to 32,767
(inclusive), both as GraphQL literals and as JSON input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between -32,768 and 32,767 (inclusive)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  setTemperature(celsius: -40) {
    id
  }
}
```

JSON input:

```json
{
  "celsius": -40
}
```

```json
{
  "count": 32767
}
```

Invalid input values:

| Value    | Why is it invalid                     |
| -------- | ------------------------------------- |
| `-32769` | Below minimum short value (-32,768).  |
| `32768`  | Exceeds maximum short value (32,767). |
| `3.14`   | Fractional values are not allowed.    |
| `"1000"` | Must be a number, not a string.       |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
- [.NET Int16 Structure](https://learn.microsoft.com/en-us/dotnet/api/system.int16)
  — The .NET type this scalar is based on
