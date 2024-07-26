<!-- cspell:ignore ayushvora10 -->

# YearMonth — GraphQL Custom Scalar

"Author - ayushvora10"

"Date - 2024-07-27"

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This string-based scalar represents a specific month of a specific year (not just any month) following ISO 8601.

The pattern is “YYYY-MM” with “YYYY” representing the year and “MM” the month.

This can be used for records that are monthly in nature. Eg. a monthly sales forecast.

# Name

`YearMonth` inspired by [Java](https://docs.oracle.com/javase/8/docs/api/java/time/YearMonth.html)

Or `ISO8601YearMonth`
Or just `Month`?
`ISO8601Month`?

# Result spec

The result must be an ISO 8601 extended format string with just the year and month: “YYYY-MM”

## Valid examples

| String    | Explanation |
| -------- | ------- |
| `2024-07`  | Representing July 2024    |
| `2024-12` | Representing December 2024     |
| `0999-01`    | Representing January of the year 999    |

## Invalid examples

| String    | Explanation |
| -------- | ------- |
| `2024-7`  | Zero-padding missing on the month, should be 2024-07 |
| `24-07` | Truncated representations on year (YY instead of YYYY) are not recommended by ISO and can be confusing |
| `2024-07-01`    | Full date is not expected, precision must only be up to month |
| `2024-07-01T00:00:00Z`    | Full date-time is not expected, precision must only be up to month |
| `07-2024`    | Should be YYYY-MM, not the other way |
| `2024-00`    | Month must be 1-indexed, not 0-indexed: Jan = 01, Dec = 12 |
| `202407`    | Hyphen missing; ISO recommends the “basic format (one without hyphens) should be avoided in plain text” |
| `2024/07`    | Slash instead of hyphen |
| `2024`    | Incomplete - month missing |
| `2024-Jul`    | No strings allowed |
| `+2024-07`    | No prefix (or postfix) symbols or characters allowed |

# Input spec

For input, _any valid ISO 8601 string_ is allowed.

## Valid examples

| String    | Explanation |
| -------- | ------- |
| `2024-07`  | Representing July 2024    |
| `2024-07-13` | Still representing July 2024 - the implementation can ignore the date as needed     |
| `2024-07-13T16:23:58Z` | Still representing July 2024 - the implementation can ignore everything beyond month as needed     |
| `2024`  | Just year is valid ISO and must be treated as January of that year |

## Invalid examples

| String    | Explanation |
| -------- | ------- |
| `2024-July`  | Invalid ISO |

# References

- [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
List external references, other background information etc.
