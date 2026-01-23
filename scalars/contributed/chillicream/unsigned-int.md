# UnsignedInt — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-09

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `UnsignedInt` scalar type represents an unsigned 32-bit integer. It is
intended for scenarios where values are constrained to the range 0 to
4,294,967,295, such as representing counts, sizes, indices, or other
non-negative integer values.

Unlike the built-in `Int` scalar which represents signed 32-bit integers with a
range of -2,147,483,648 to 2,147,483,647, `UnsignedInt` provides stronger type
safety for values that must be non-negative and can represent larger positive
values.

# Recommended name

The recommended name for this scalar is `UnsignedInt`.

# Result spec

An `UnsignedInt` scalar must serialize to an integer value in the range 0 to
4,294,967,295 (inclusive).

## Examples

These are valid result values:

| Value        | Explanation                           |
| ------------ | ------------------------------------- |
| `0`          | Minimum unsigned int value.           |
| `4294967295` | Maximum unsigned int value.           |
| `2147483648` | A value exceeding signed int maximum. |

These are invalid result values:

| Value        | Why is it invalid                   |
| ------------ | ----------------------------------- |
| `-1`         | Negative values are not allowed.    |
| `4294967296` | Exceeds maximum unsigned int value. |
| `3.14`       | Fractional values are not allowed.  |
| `"1000"`     | Must be a number, not a string.     |

# Input spec

An `UnsignedInt` scalar accepts integer values in the range 0 to 4,294,967,295
(inclusive), both as GraphQL literals and as JSON input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between 0 and 4,294,967,295 (inclusive)
- Value is not negative

## Examples

Valid input values:

GraphQL Literal:

```graphql
query {
  items(limit: 100, offset: 50) {
    id
  }
}
```

JSON input:

```json
{
  "limit": 100,
  "offset": 50
}
```

```json
{
  "count": 4294967295
}
```

Invalid input values:

| Value        | Why is it invalid                   |
| ------------ | ----------------------------------- |
| `-1`         | Negative values are not allowed.    |
| `4294967296` | Exceeds maximum unsigned int value. |
| `3.14`       | Fractional values are not allowed.  |
| `"1000"`     | Must be a number, not a string.     |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
