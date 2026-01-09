# UnsignedLong — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-09

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `UnsignedLong` scalar type represents an unsigned 64-bit integer. It is
intended for scenarios where values exceed the range of unsigned 32-bit
integers, such as representing very large counts, file sizes, memory addresses,
or any non-negative integer values requiring more than 32 bits.

Unlike the `Long` scalar which represents signed 64-bit integers with a range of
-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807, `UnsignedLong` supports
non-negative values in the range 0 to 18,446,744,073,709,551,615.

**Note:** JavaScript's `JSON.parse()` does not safely support 64-bit integers.
Values outside the safe integer range (0 to 2^53 - 1) may lose precision when
parsed as JavaScript numbers. Client applications using JavaScript should handle
`UnsignedLong` values with care, potentially using libraries like `json-bigint`
or representing them as strings.

# Recommended name

The recommended name for this scalar is `UnsignedLong`.

# Result spec

An `UnsignedLong` scalar must serialize to an integer value in the range 0 to
18,446,744,073,709,551,615 (inclusive).

## Examples

These are valid result values:

| Value                  | Explanation                            |
| ---------------------- | -------------------------------------- |
| `0`                    | Minimum unsigned long value.           |
| `18446744073709551615` | Maximum unsigned long value.           |
| `9223372036854775808`  | A value exceeding signed long maximum. |

These are invalid result values:

| Value                  | Why is it invalid                    |
| ---------------------- | ------------------------------------ |
| `-1`                   | Negative values are not allowed.     |
| `18446744073709551616` | Exceeds maximum unsigned long value. |
| `3.14`                 | Fractional values are not allowed.   |
| `"1000"`               | Must be a number, not a string.      |

# Input spec

An `UnsignedLong` scalar accepts integer values in the range 0 to
18,446,744,073,709,551,615 (inclusive), both as GraphQL literals and as JSON
input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between 0 and 18,446,744,073,709,551,615 (inclusive)
- Value is not negative

## Examples

Valid input values:

GraphQL Literal:

```graphql
query {
  fileInfo(sizeInBytes: 10000000000000000000) {
    name
  }
}
```

JSON input:

```json
{
  "sizeInBytes": 10000000000000000000
}
```

```json
{
  "maxValue": 18446744073709551615
}
```

Invalid input values:

| Value                  | Why is it invalid                    |
| ---------------------- | ------------------------------------ |
| `-1`                   | Negative values are not allowed.     |
| `18446744073709551616` | Exceeds maximum unsigned long value. |
| `3.14`                 | Fractional values are not allowed.   |
| `"1000"`               | Must be a number, not a string.      |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
