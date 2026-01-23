# Uuid — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-05

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Uuid` scalar type represents a Universally Unique Identifier (UUID) as
defined by RFC 9562. It is intended for scenarios where globally unique
identifiers are required, such as database primary keys, distributed system
identifiers, or any situation requiring collision-resistant unique identifiers.

Unlike the built-in `ID` scalar which can be any string or number, `Uuid`
enforces the specific format and structure of UUIDs, providing stronger
guarantees about uniqueness and format validity.

The scalar uses the standard UUID string representation as defined in RFC 9562.

# Recommended name

The recommended name for this scalar is `Uuid`.

# Result spec

A `Uuid` scalar must serialize to a string conforming to the UUID string
representation defined in RFC 9562. This represents a UUID in the format:
`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` where each `x` is a hexadecimal digit
(0-9, a-f, A-F).

The format is:

- 8 hexadecimal digits
- Hyphen
- 4 hexadecimal digits
- Hyphen
- 4 hexadecimal digits
- Hyphen
- 4 hexadecimal digits
- Hyphen
- 12 hexadecimal digits

Both lowercase and uppercase hexadecimal digits are valid.

## Examples

These are valid result values:

| Value                                    | Explanation               |
| ---------------------------------------- | ------------------------- |
| `"123e4567-e89b-12d3-a456-426614174000"` | A valid UUID (lowercase). |
| `"123E4567-E89B-12D3-A456-426614174000"` | A valid UUID (uppercase). |
| `"00000000-0000-0000-0000-000000000000"` | The nil UUID.             |
| `"550e8400-e29b-41d4-a716-446655440000"` | A valid UUID v4.          |

These are invalid result values:

| Value                                     | Why is it invalid              |
| ----------------------------------------- | ------------------------------ |
| `"123e4567-e89b-12d3-a456-42661417400"`   | Too few digits in last group.  |
| `"123e4567-e89b-12d3-a456-4266141740000"` | Too many digits in last group. |
| `"123e4567e89b12d3a456426614174000"`      | Missing hyphens.               |
| `"123e4567-e89b-12d3-a456"`               | Incomplete UUID.               |
| `"g23e4567-e89b-12d3-a456-426614174000"`  | Invalid character (g).         |
| `123`                                     | Not a string value.            |

# Input spec

A `Uuid` scalar accepts string values conforming to the UUID string
representation defined in RFC 9562, both as GraphQL literals and as JSON input
values.

The input format matches the result format and must:

- Follow the pattern `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Contain only hexadecimal digits (0-9, a-f, A-F) and hyphens in the correct
  positions
- Have exactly 36 characters (32 hexadecimal digits and 4 hyphens)

Implementations should validate:

- String length is exactly 36 characters
- Hyphens are in the correct positions (after the 8th, 13th, 18th, and 23rd
  characters)
- All other characters are valid hexadecimal digits

## Examples

Valid input values:

GraphQL Literal:

```graphql
query {
  user(id: "123e4567-e89b-12d3-a456-426614174000") {
    name
  }
}
```

JSON input:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

Invalid input values:

| Value                                    | Why is it invalid      |
| ---------------------------------------- | ---------------------- |
| `"123e4567-e89b-12d3-a456-42661417400"`  | Too few digits.        |
| `"123e4567e89b12d3a456426614174000"`     | Missing hyphens.       |
| `"123e4567-e89b-12d3-a456"`              | Incomplete UUID.       |
| `"g23e4567-e89b-12d3-a456-426614174000"` | Invalid character (g). |
| `""`                                     | Empty string.          |

# References

- [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) — Universally Unique
  IDentifiers (UUIDs)
