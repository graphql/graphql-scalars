<!-- cspell:ignore bignumber -->

# Decimal — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-29

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Decimal` scalar type represents a decimal floating-point number with high
precision. It is intended for scenarios where precise decimal representation is
critical, such as financial calculations, monetary values, scientific
measurements, or any domain where floating-point rounding errors are
unacceptable.

Unlike the built-in `Float` scalar which uses binary floating-point
representation (IEEE 754) and can introduce rounding errors in decimal
calculations, `Decimal` provides exact decimal representation.

**Note:** JavaScript's number type uses binary floating-point (IEEE 754 double
precision) and cannot accurately represent all decimal values. For example,
`0.1 + 0.2` in JavaScript does not equal `0.3` exactly. Client applications
using JavaScript should handle `Decimal` values with care, potentially using
libraries like `decimal.js`, `big.js`, or `bignumber.js` for precise decimal
arithmetic.

# Recommended name

The recommended name for this scalar is `Decimal`.

# Result spec

A `Decimal` scalar must serialize to a numeric value representing the decimal
number.

The serialized value is a standard numeric representation that can include:

- Optional leading sign (negative values)
- Integer and fractional components
- Standard decimal notation

## Examples

These are valid result values:

| Value                              | Explanation                |
| ---------------------------------- | -------------------------- |
| `123.45`                           | A positive decimal number. |
| `-123.45`                          | A negative decimal number. |
| `0.123456789012345678901234567890` | High-precision decimal.    |
| `1000000`                          | Integer value as decimal.  |
| `0`                                | Zero.                      |

These are invalid result values:

| Value      | Why is it invalid               |
| ---------- | ------------------------------- |
| `"123.45"` | Must be a number, not a string. |
| `NaN`      | Not a valid number.             |
| `Infinity` | Not a valid decimal value.      |

# Input spec

A `Decimal` scalar accepts numeric values representing decimal numbers, both as
GraphQL literals and as JSON input values.

Implementations should validate:

- Value is a valid number (not `NaN` or `Infinity`)
- Value is within the supported precision range of the implementation

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  processPayment(amount: 99.99, taxRate: 0.08) {
    total
  }
}
```

JSON input:

```json
{
  "amount": 99.99
}
```

```json
{
  "price": 1234567890.123456789
}
```

Invalid input values:

| Value      | Why is it invalid               |
| ---------- | ------------------------------- |
| `NaN`      | Not a valid number.             |
| `Infinity` | Not a valid decimal value.      |
| `"99.99"`  | Must be a number, not a string. |

# References

- [GraphQL Specification - Float](https://spec.graphql.org/September2025/#sec-Float)
  — Built-in floating-point scalar type
