<!-- cspell:ignore <github user name> -->

# Long — GraphQL Custom Scalar

Author - jakobmerrild

Date - 2024-12-16

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a 64-bit signed integer (non-fractional) value, ranging from `-2^63` to `2^63-1`. ```

# Name

The scalar should be named `Long` to match commonly used names for the same data structure in a variety of programming languages.
Alternatively the scalar can be named `Int64` to represent the 64-bit encoding.

# Result coercion

A field of type `Long` should result in a JSON `number` without a fractional or exponential part. A leading `-` should only be
added if the field represents a negative value.

These are valid examples:

| Output                 | Explanation                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `0`                    | Zero is a valid integer within the range                       |
| `-9223372036854775808` | This is the lowest value that can be represented in the range  |
| `9223372036854775807`  | This is the largest value that can be represented in the range |

These are invalid examples:

| Output                  | Explanation                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `+1234`                 | Leading `+` is not allowed                                               |
| `-10223372036854775808` | Value is lower than `-2^63`                                              |
| `12223372036854775807`  | Value is greater than `2^63-1`                                           |
| `123.0`                 | Fractional part is not allowed even if it is zero                        |
| `1e6`                   | Exponential notation is not allowed, even if it represents a valid value |
| `"12345"`               | String representations of a valid value are not allowed                  |

# Literal Input spec

For input both IntValue and StringValue shall be accepted so long as the StringValue is a base-10 representation of a
valid value within the range.

These are valid examples:

| Input                  | Explanation                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| `0`                    | IntValue within range                                                     |
| `-9223372036854775808` | This is the lowest value that can be represented in the range             |
| `9223372036854775807`  | This is the largest value that can be represented in the range            |
| `"987654321"`          | A StringValue containing a base-10 representation of the value is allowed |

These are invalid examples:

| Output                  | Explanation                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `-10223372036854775808` | Value is lower than `-2^63`                                                                                                  |
| `12223372036854775807`  | Value is greater than `2^63-1`                                                                                               |
| `123.0`                 | FloatValue is not allowed                                                                                                    |
| `"FFFFF"`               | A StringValue containing a base-16 representation of a valid value is not allowed                                            |
| `"6543.000"`            | A StringValue containing a base-10 representation with a fractional part is not allowed. Even if the fractional part is zero |

# Raw Input JSON spec

For raw input the same rules apply as for Literal inputs.

# References

- [Support of `Long` (64-bit integer) scalar](https://github.com/graphql/graphql-spec/issues/73)
