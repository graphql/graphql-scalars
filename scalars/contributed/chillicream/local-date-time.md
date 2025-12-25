<!-- cspell:ignore birthdates, DDTHH -->

# LocalDateTime — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-24

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `LocalDateTime` scalar type represents a date and time without time zone
information. It is intended for scenarios where time zone context is either
unnecessary or managed separately, such as recording birthdates and times (where
the event occurred in a specific local context), displaying timestamps in a
user's local time zone (where the time zone is known from context), or recording
historical timestamps where the time zone was not captured.

Unlike instant-based DateTime scalars that represent a specific moment in time,
`LocalDateTime` represents a calendar date and wall-clock time that could refer
to different moments depending on the time zone context applied to it. This
makes it suitable for applications where the time zone is managed separately
from the date-time value itself.

The scalar uses RFC 3339 format for serialization, specifically the `full-date`
and `partial-time` productions combined with a `T` or `t` separator, but without
time zone offset information.

# Recommended name

The recommended name for this scalar is `LocalDateTime`.

# Result spec

A `LocalDateTime` scalar must serialize to a string conforming to the RFC 3339
`full-date` and `partial-time` productions combined with a `T` or `t` separator,
but without the `time-offset` component. This represents a local date and time
in the format: `YYYY-MM-DDTHH:mm:ss` or `YYYY-MM-DDTHH:mm:ss.fffffffff` (with
optional fractional seconds).

The format is:

- `YYYY`: Four-digit year
- `MM`: Two-digit month (01-12)
- `DD`: Two-digit day (01-31, valid for the given month)
- `T` or `t`: Literal separator character
- `HH`: Two-digit hour (00-23)
- `mm`: Two-digit minute (00-59)
- `ss`: Two-digit second (00-59)
- `.fffffffff`: Optional fractional seconds (up to 9 digits for nanosecond
  precision)

The serialized value must **not** include time zone offset information (e.g.,
`Z`, `+00:00`, or `-05:00`) as specified in the RFC 3339 `time-offset`
production.

## Examples

These are valid result values:

| String                          | Explanation                                  |
| ------------------------------- | -------------------------------------------- |
| `2023-12-24T15:30:00`           | A LocalDateTime without fractional seconds.  |
| `2023-12-24t15:30:00`           | The `t` separator may be lowercase.          |
| `2023-12-24T15:30:00.123`       | A LocalDateTime with millisecond precision.  |
| `2023-12-24T15:30:00.123456789` | A LocalDateTime with nanosecond precision.   |
| `2023-01-01T00:00:00`           | Midnight on January 1st.                     |
| `2023-12-31T23:59:59`           | One second before midnight on December 31st. |

These are invalid result values:

| String                           | Why is it invalid                     |
| -------------------------------- | ------------------------------------- |
| `2023-12-24T15:30:00Z`           | Contains time zone indicator `Z`.     |
| `2023-12-24T15:30:00+00:00`      | Contains time zone offset.            |
| `2023-12-24 15:30:00`            | Missing `T` or `t` separator.         |
| `2023-12-24`                     | Missing time component.               |
| `15:30:00`                       | Missing date component.               |
| `2023-13-01T00:00:00`            | Invalid month (13).                   |
| `2023-12-32T00:00:00`            | Invalid day (32).                     |
| `2023-12-24T15:30:00.1234567890` | More than 9 fractional second digits. |
| `2023-12-24T24:00:00`            | Invalid hour (24).                    |
| `2023-02-30T15:30:00`            | Invalid date (February 30th).         |

# Input spec

A `LocalDateTime` scalar accepts string values conforming to the RFC 3339
`full-date` and `partial-time` productions combined with a `T` or `t` separator,
but without the `time-offset` component, both as GraphQL literals and as JSON
input values.

The input format matches the result format and must:

- Follow the pattern `YYYY-MM-DDTHH:mm:ss` or `YYYY-MM-DDTHH:mm:ss.fffffffff`
- Not include time zone offset information (`Z` or `+/-HH:mm`)
- Contain valid date and time values per RFC 3339
- Use either uppercase `T` or lowercase `t` as the separator between date and
  time components

Implementations should validate:

- Year is a valid four-digit number
- Month is between 01 and 12
- Day is valid for the given month and year (accounting for leap years)
- Hour is between 00 and 23
- Minute is between 00 and 59
- Second is between 00 and 59 (leap seconds are not supported)
- Fractional seconds, if present, are numeric (up to 9 digits)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  updateProfile(birthDateTime: "2023-12-24T15:30:00") {
    id
  }
}
```

JSON input:

```json
{
  "birthDateTime": "2023-12-24T15:30:00"
}
```

```json
{
  "birthDateTime": "2023-12-24t15:30:00.123456789"
}
```

Invalid input values:

| String                           | Why is it invalid                                |
| -------------------------------- | ------------------------------------------------ |
| `2023-12-24T15:30:00Z`           | Contains time zone indicator `Z`.                |
| `2023-12-24T15:30:00+05:30`      | Contains time zone offset.                       |
| `2023-12-24 15:30:00`            | Invalid separator (space instead of `T` or `t`). |
| `2023-12-24T25:00:00`            | Invalid hour (25).                               |
| `2023-12-24T15:60:00`            | Invalid minute (60).                             |
| `2023-02-30T15:30:00`            | Invalid date (February 30th).                    |
| `2023-12-24T15:30:00.1234567890` | More than 9 fractional second digits.            |

# References

- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) — Date and Time on the
  Internet: Timestamps
