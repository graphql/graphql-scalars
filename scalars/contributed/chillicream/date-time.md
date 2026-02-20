<!-- cspell:ignore DDTHH -->

# DateTime — GraphQL Custom Scalar

Author – ChilliCream

Date – 2024-12-24

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `DateTime` scalar type represents a date and time with time zone offset
information. It is intended for scenarios where representing a specific instant
in time is required, such as recording when an event occurred, scheduling future
events across time zones, or storing timestamps for auditing purposes.

Unlike local date-time scalars that represent calendar dates and wall-clock
times without time zone context, `DateTime` represents a specific moment in time
that can be unambiguously compared and ordered regardless of the observer's time
zone. This makes it suitable for applications where the absolute instant in time
is important.

The scalar uses RFC 3339 format for serialization, specifically the `date-time`
production from section 5.6, which includes both the date and time components
along with a time zone offset.

# Recommended name

The recommended name for this scalar is `DateTime`.

# Result spec

A `DateTime` scalar must serialize to a string conforming to the RFC 3339
`date-time` production from section 5.6. This represents a date, time, and time
zone offset in the format: `YYYY-MM-DDTHH:mm:ss.fffffff+HH:mm` or
`YYYY-MM-DDTHH:mm:ss.fffffffZ`.

The format is:

- `YYYY`: Four-digit year
- `MM`: Two-digit month (01-12)
- `DD`: Two-digit day (01-31, valid for the given month)
- `T` or `t`: Literal separator character
- `HH`: Two-digit hour (00-23)
- `mm`: Two-digit minute (00-59)
- `ss`: Two-digit second (00-59)
- `.fffffff`: Optional fractional seconds (up to 7 digits for 100-nanosecond
  precision)
- Time zone offset: Either `Z` or `z` (indicating UTC) or `+HH:mm` or `-HH:mm`
  (indicating offset from UTC)

The serialized value must include time zone offset information as specified in
the RFC 3339 `time-offset` production.

## Examples

These are valid result values:

| Value                                 | Explanation                               |
| ------------------------------------- | ----------------------------------------- |
| `"2023-12-24T15:30:00Z"`              | A DateTime in UTC.                        |
| `"2023-12-24t15:30:00z"`              | The `t` and `z` may be lowercase.         |
| `"2023-12-24T15:30:00+00:00"`         | A DateTime in UTC (explicit zero offset). |
| `"2023-12-24T15:30:00-05:00"`         | A DateTime with negative offset (EST).    |
| `"2023-12-24T15:30:00.123Z"`          | A DateTime with millisecond precision.    |
| `"2023-12-24T15:30:00.1234567+01:00"` | A DateTime with 100-nanosecond precision. |

These are invalid result values:

| Value                             | Why is it invalid                      |
| --------------------------------- | -------------------------------------- |
| `"2023-12-24T15:30:00"`           | Missing time zone offset.              |
| `"2023-12-24 15:30:00Z"`          | Space instead of `T` or `t` separator. |
| `"2023-12-24"`                    | Missing time component.                |
| `"15:30:00Z"`                     | Missing date component.                |
| `"2023-13-01T00:00:00Z"`          | Invalid month (13).                    |
| `"2023-12-32T00:00:00Z"`          | Invalid day (32).                      |
| `"2023-12-24T15:30:00.12345678Z"` | More than 7 fractional second digits.  |
| `"2023-12-24T24:00:00Z"`          | Invalid hour (24).                     |
| `"2023-02-30T15:30:00Z"`          | Invalid date (February 30th).          |
| `"2023-12-24T15:30:00+24:00"`     | Invalid offset (exceeds ±23:59).       |

# Input spec

A `DateTime` scalar accepts string values conforming to the RFC 3339 `date-time`
production from section 5.6, both as GraphQL literals and as JSON input values.

The input format matches the result format and must:

- Follow the pattern `YYYY-MM-DDTHH:mm:ss.fffffff+HH:mm` or
  `YYYY-MM-DDTHH:mm:ss.fffffffZ`
- Include time zone offset information (`Z`, `z`, or `+/-HH:mm`)
- Use uppercase `T` or lowercase `t` as the separator between date and time
  components
- Use uppercase `Z` or lowercase `z` if representing UTC with the zero offset
  notation
- Contain valid date and time values per RFC 3339

Implementations should validate:

- Year is a valid four-digit number
- Month is between 01 and 12
- Day is valid for the given month and year (accounting for leap years)
- Hour is between 00 and 23
- Minute is between 00 and 59
- Second is between 00 and 59
- Fractional seconds, if present, are numeric (up to 7 digits)
- Time zone offset is valid (between -23:59 and +23:59, or `Z`/`z`)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  scheduleEvent(startTime: "2023-12-24T15:30:00Z") {
    id
  }
}
```

```graphql
mutation {
  scheduleEvent(startTime: "2023-12-24T15:30:00.1234567+01:00") {
    id
  }
}
```

JSON input:

```json
{
  "startTime": "2023-12-24T15:30:00Z"
}
```

```json
{
  "startTime": "2023-12-24T15:30:00-05:00"
}
```

Invalid input values:

| Value                             | Why is it invalid                      |
| --------------------------------- | -------------------------------------- |
| `"2023-12-24T15:30:00"`           | Missing time zone offset.              |
| `"2023-12-24 15:30:00Z"`          | Space instead of `T` or `t` separator. |
| `"2023-12-24T25:00:00Z"`          | Invalid hour (25).                     |
| `"2023-12-24T15:60:00Z"`          | Invalid minute (60).                   |
| `"2023-02-30T15:30:00Z"`          | Invalid date (February 30th).          |
| `"2023-12-24T15:30:00.12345678Z"` | More than 7 fractional second digits.  |
| `"2023-12-24T15:30:00+25:00"`     | Invalid offset (exceeds maximum).      |
| `"2023-12-24T15:30:00 UTC"`       | Invalid offset format.                 |

# References

- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) — Date and Time on the
  Internet: Timestamps (specifically section 5.6 for the `date-time` production)
