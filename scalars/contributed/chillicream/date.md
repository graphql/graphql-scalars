<!-- cspell:ignore birthdates -->

# Date — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-24

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Date` scalar type represents a date in UTC. Unlike `LocalDate`, which
represents a calendar date with local context (such as where a contract was
signed), `Date` always represents the UTC date without any local context.

When serializing, implementations must convert the underlying date-time value to
UTC before extracting the date component. This ensures that `Date` represents a
specific calendar day in UTC, regardless of the local time zone of the server or
client. This makes it suitable for representing dates that refer to specific
moments in time, such as birthdates or historical events, where the date should
be consistent globally.

For example, if a timestamp represents `2023-12-24T23:00:00-05:00` (11 PM on
December 24th in UTC-5), it would serialize as `2023-12-25` because that moment
in time corresponds to December 25th in UTC.

The scalar uses RFC 3339 format for serialization, specifically the `full-date`
production.

# Recommended name

The recommended name for this scalar is `Date`.

# Result spec

A `Date` scalar must serialize to a string conforming to the RFC 3339
`full-date` production, representing the UTC date. This represents a calendar
date in the format: `YYYY-MM-DD`.

The format is:

- `YYYY`: Four-digit year
- `MM`: Two-digit month (01-12)
- `DD`: Two-digit day (01-31, valid for the given month)

The serialized date must represent the UTC date of the underlying value.

## Examples

These are valid result values:

| Value          | Explanation                             |
| -------------- | --------------------------------------- |
| `"2023-12-24"` | December 24th, 2023 in UTC.             |
| `"2000-02-29"` | February 29th, 2000 in UTC (leap year). |

These are invalid result values:

| Value                    | Why is it invalid                                |
| ------------------------ | ------------------------------------------------ |
| `"2023-12-24T15:30:00"`  | Contains time component.                         |
| `"2023-12-24T15:30:00Z"` | Contains time and time zone information.         |
| `"2023-13-01"`           | Invalid month (13).                              |
| `"2023-12-32"`           | Invalid day (32).                                |
| `"2023-2-5"`             | Month and day must be zero-padded to two digits. |
| `"23-12-24"`             | Year must be four digits.                        |
| `"2023/12/24"`           | Invalid separator (slash instead of hyphen).     |
| `"2001-02-29"`           | Invalid date (2001 is not a leap year).          |

# Input spec

A `Date` scalar accepts string values conforming to the RFC 3339 `full-date`
production, both as GraphQL literals and as JSON input values.

The input format matches the result format and must:

- Follow the pattern `YYYY-MM-DD`
- Contain valid date values per RFC 3339
- Use hyphens as separators
- Use zero-padded two-digit months and days

When parsing input, implementations should interpret the date as representing
midnight UTC on the specified date, or convert it to the appropriate internal
representation for their platform.

Implementations should validate:

- Year is a valid four-digit number
- Month is between 01 and 12
- Day is valid for the given month and year (accounting for leap years)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  updateProfile(birthDate: "2000-12-24") {
    id
  }
}
```

JSON input:

```json
{
  "birthDate": "2000-12-24"
}
```

Invalid input values:

| Value                   | Why is it invalid                  |
| ----------------------- | ---------------------------------- |
| `"2023-12-24T15:30:00"` | Contains time component.           |
| `"2023-13-01"`          | Invalid month (13).                |
| `"2023-12-32"`          | Invalid day (32).                  |
| `"2023-2-5"`            | Month and day must be zero-padded. |
| `"2023/12/24"`          | Invalid separator.                 |
| `"2023-02-30"`          | Invalid date (February 30th).      |

# References

- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) — Date and Time on the
  Internet: Timestamps
