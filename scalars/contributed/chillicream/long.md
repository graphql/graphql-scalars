# Long — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-29

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Long` scalar type represents a signed 64-bit integer. It is intended for
scenarios where values exceed the range of the built-in `Int` scalar, such as
representing large identifiers, timestamps in milliseconds, file sizes in bytes,
or any integer values requiring more than 32 bits.

Unlike the built-in `Int` scalar which represents signed 32-bit integers with a
range of -2,147,483,648 to 2,147,483,647, `Long` supports values in the range
-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.

**Note:** JavaScript's `JSON.parse()` does not safely support 64-bit integers.
Values outside the safe integer range (-(2^53 - 1) to 2^53 - 1) may lose
precision when parsed as JavaScript numbers. Client applications using
JavaScript should handle `Long` values with care, potentially using libraries
like `json-bigint` or representing them as strings.

This scalar is based on the .NET `Int64` type.

# Recommended name

The recommended name for this scalar is `Long`.

# Result spec

A `Long` scalar must serialize to an integer value in the range
-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (inclusive).

## Examples

These are valid result values:

| Value                  | Explanation                                               |
| ---------------------- | --------------------------------------------------------- |
| `0`                    | Zero.                                                     |
| `-9223372036854775808` | Minimum long value.                                       |
| `9223372036854775807`  | Maximum long value.                                       |
| `1609459200000`        | Unix timestamp in milliseconds (2021-01-01 00:00:00 UTC). |

These are invalid result values:

| Value                  | Why is it invalid                  |
| ---------------------- | ---------------------------------- |
| `-9223372036854775809` | Below minimum long value.          |
| `9223372036854775808`  | Exceeds maximum long value.        |
| `3.14`                 | Fractional values are not allowed. |
| `"1000"`               | Must be a number, not a string.    |

# Input spec

A `Long` scalar accepts integer values in the range -9,223,372,036,854,775,808
to 9,223,372,036,854,775,807 (inclusive), both as GraphQL literals and as JSON
input values.

Implementations should validate:

- Value is an integer (no fractional component)
- Value is between -9,223,372,036,854,775,808 and 9,223,372,036,854,775,807
  (inclusive)

## Examples

Valid input values:

GraphQL Literal:

```graphql
query {
  fileInfo(sizeInBytes: 5368709120) {
    name
  }
}
```

JSON input:

```json
{
  "sizeInBytes": 5368709120
}
```

```json
{
  "timestamp": 1609459200000
}
```

Invalid input values:

| Value                  | Why is it invalid                  |
| ---------------------- | ---------------------------------- |
| `-9223372036854775809` | Below minimum long value.          |
| `9223372036854775808`  | Exceeds maximum long value.        |
| `3.14`                 | Fractional values are not allowed. |
| `"1000"`               | Must be a number, not a string.    |

# References

- [GraphQL Specification - Int](https://spec.graphql.org/September2025/#sec-Int)
  — Built-in integer scalar type
- [.NET Int64 Structure](https://learn.microsoft.com/en-us/dotnet/api/system.int64)
  — The .NET type this scalar is based on
