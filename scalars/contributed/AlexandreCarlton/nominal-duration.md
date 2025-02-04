<!-- cspell:ignore Alexandre -->

# NominalDuration — GraphQL Custom Scalar

Author - AlexandreCarlton

Date - 2024-03-17

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This Scalar represents a length in time in years, months, weeks or days. It is a
refinement of the duration as defined by
[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) with the caveat that it only
supports calendar components that require the knowledge of the particular
calendar position with which the duration is being evaluated. As such, only the
following components are included:

- calendar year (as this can be potentially a leap year).
- calendar month as this may contain a variable number of days).
- calendar day (as this may contain leap seconds by decision of the
  [Internal Earth Rotation Service](https://en.wikipedia.org/wiki/International_Earth_Rotation_and_Reference_Systems_Service)).
- calendar week (as this is seven calendar days).

Negative durations per [ISO 8601-2](https://en.wikipedia.org/wiki/ISO_8601) are
supported.

# Name

`NominalDuration`, originating from the wording in
[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):

<blockquote>Duration can be expressed by a combination of components with accurate duration (hour, minute and second)
and components with nominal duration (year, month, week and day).</blockquote>

# Input/Result specification

[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) defines a duration as either:

- `PnYnMnDTnHnMnS`
- `PnW`

Instead, the specification `PnYnMnWnD` is used, with the further amendments:

- The entire string may be prefixed with a `-` to signify a negative duration.
- Each component may be prefixed with a `-` to signify a negative component.
- A calendar week may be declared alongside calendar year/month/day components.

## Positive examples

| String   | Explanation                                                               |
| -------- | ------------------------------------------------------------------------- |
| `P1Y`    | A duration representing a calendar year.                                  |
| `P2W`    | A duration representing two calendar weeks.                               |
| `-P1Y2M` | A negative duration representing a calendar year and calendar month.      |
| `P1Y-2M` | A duration representing a two calendar months fewer than a calendar year. |
| `P2M3W`  | A duration representing a two calendar months and three calendar weeks.   |
| `P24M`   | A duration representing a twenty four calendar months.                    |

## Negative examples

| String  | Explanation                              |
| ------- | ---------------------------------------- |
| `PT1H`  | Hours are not supported.                 |
| `PT1M`  | Minutes are not supported.               |
| `PT1S`  | Seconds are not supported.               |
| `P1.5Y` | Fractional components are not supported. |
| `PY`    | Digits must precede units.               |

# References

- [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
