# Long — GraphQL Custom Scalar

Author - apollographql

Date - 2025-12-04

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a 64-bit signed integer using two's complement.

The minimum value is −9223372036854775808 and the maximum value
is 9223372036854775807.

Note: JavaScript `JSON.parse()` looses precision for numbers outside the [-(2^53
– 1), 2^53 - 1] range. Use with care if you are using it in applications that
require precise integer arithmetic.

# Recommended Name

The recommended name is `Long`.

# GraphQL input coercion

The input must be a
[GraphQL IntValue](https://spec.graphql.org/September2025/#IntValue), with
values ranging from -9223372036854775808 to 9223372036854775807.

All other values must raise an error.

# JSON input coercion

The input must be a [JSON integer](https://www.json.org/json-en.html), with
values ranging from -9223372036854775808 to 9223372036854775807 with no leading
'0'.

All other values must raise an error.

# JSON result coercion

The result must be a [JSON integer](https://www.json.org/json-en.html), with
values ranging from -9223372036854775808 to 9223372036854775807 with no leading
'0'.

All other values must raise an error.

# Examples

Because GraphQL IntValue and JSON integer are so similar, the first column in
the table below may be understood as either a GraphQL IntValue or a JSON
integer.

| Value                  | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `0`                    | The number 0.                                      |
| `-0`                   | Also the number 0. The value is equivalent to '0'. |
| `42`                   | The number 42.                                     |
| `−9223372036854775808` | The minimum representable value.                   |
| `9223372036854775807`  | The maximum representable value.                   |

These are invalid examples:

| Value                  | Why is it invalid                |
| ---------------------- | -------------------------------- |
| `0.3`                  | No fractional parts are allowed. |
| `042`                  | Leading zeroes are not allowed.  |
| `1E7`                  | Exponents are not allowed.       |
| `−9223372036854775809` | Out of range.                    |
| `9223372036854775808`  | Out of range.                    |
