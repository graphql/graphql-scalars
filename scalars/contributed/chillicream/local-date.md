# LocalDate — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-24

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `LocalDate` scalar type represents a date without time or time zone
information. It is intended for scenarios where only the calendar date matters
in a local context, such as contract effective dates, publication dates, or
recurring events (e.g., "New Year's Day is January 1st"), where the specific
time of day and time zone are irrelevant or managed separately.

Unlike instant-based DateTime scalars that represent a specific moment in time,
`LocalDate` represents a calendar date that could refer to different moments
depending on the time zone context applied to it. This makes it suitable for
applications where only the date component is meaningful.

The scalar uses RFC 3339 format for serialization, specifically the `full-date`
production.

# Recommended name

The recommended name for this scalar is `LocalDate`.

# Result spec

A `LocalDate` scalar must serialize to a string conforming to the RFC 3339
`full-date` production. This represents a calendar date in the format:
`YYYY-MM-DD`.

The format is:

- `YYYY`: Four-digit year
- `MM`: Two-digit month (01-12)
- `DD`: Two-digit day (01-31, valid for the given month)

## Examples

These are valid result values:

| Value          | Explanation                      |
| -------------- | -------------------------------- |
| `"2023-12-24"` | December 24th, 2023.             |
| `"2000-02-29"` | February 29th, 2000 (leap year). |

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

A `LocalDate` scalar accepts string values conforming to the RFC 3339
`full-date` production, both as GraphQL literals and as JSON input values.

The input format matches the result format and must:

- Follow the pattern `YYYY-MM-DD`
- Contain valid date values per RFC 3339
- Use hyphens as separators
- Use zero-padded two-digit months and days

Implementations should validate:

- Year is a valid four-digit number
- Month is between 01 and 12
- Day is valid for the given month and year (accounting for leap years)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  createContract(effectiveDate: "2000-12-24") {
    id
  }
}
```

JSON input:

```json
{
  "effectiveDate": "2000-12-24"
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
