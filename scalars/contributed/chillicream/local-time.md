# LocalTime — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-24

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `LocalTime` scalar type represents a time of day without date or time zone
information. It is intended for scenarios where only the time component matters,
such as business operating hours (e.g., "opens at 09:00"), daily schedules, or
recurring time-based events where the specific date is irrelevant.

Unlike instant-based DateTime scalars that represent a specific moment in time,
`LocalTime` represents a wall-clock time that could refer to different moments
depending on the date and time zone context applied to it. This makes it
suitable for applications where only the time of day is meaningful.

The scalar uses RFC 3339 format for serialization, specifically the
`partial-time` production.

# Recommended name

The recommended name for this scalar is `LocalTime`.

# Result spec

A `LocalTime` scalar must serialize to a string conforming to the RFC 3339
`partial-time` production. This represents a time of day in the format:
`HH:mm:ss` or `HH:mm:ss.fffffff` (with optional fractional seconds).

The format is:

- `HH`: Two-digit hour (00-23)
- `mm`: Two-digit minute (00-59)
- `ss`: Two-digit second (00-59)
- `.fffffff`: Optional fractional seconds (up to 7 digits for 100-nanosecond
  precision)

The serialized value must **not** include time zone offset information.

## Examples

These are valid result values:

| Value                | Explanation                            |
| -------------------- | -------------------------------------- |
| `"15:30:00"`         | 3:30 PM without fractional seconds.    |
| `"09:00:00.1234567"` | 9:00 AM with 100-nanosecond precision. |
| `"00:00:00"`         | Midnight.                              |
| `"23:59:59"`         | One second before midnight.            |

These are invalid result values:

| Value                   | Why is it invalid                     |
| ----------------------- | ------------------------------------- |
| `"15:30:00Z"`           | Contains time zone indicator `Z`.     |
| `"15:30:00+00:00"`      | Contains time zone offset.            |
| `"2023-12-24T15:30:00"` | Contains date component.              |
| `"15:30"`               | Missing seconds component.            |
| `"24:00:00"`            | Invalid hour (24).                    |
| `"15:60:00"`            | Invalid minute (60).                  |
| `"15:30:60"`            | Invalid second (60).                  |
| `"15:30:00.12345678"`   | More than 7 fractional second digits. |

# Input spec

A `LocalTime` scalar accepts string values conforming to the RFC 3339
`partial-time` production, both as GraphQL literals and as JSON input values.

The input format matches the result format and must:

- Follow the pattern `HH:mm:ss` or `HH:mm:ss.fffffff`
- Not include time zone offset information (`Z` or `+/-HH:mm`)
- Contain valid time values per RFC 3339

Implementations should validate:

- Hour is between 00 and 23
- Minute is between 00 and 59
- Second is between 00 and 59 (leap seconds are not supported)
- Fractional seconds, if present, are numeric (up to 7 digits)

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  setBusinessHours(openingTime: "09:00:00", closingTime: "17:00:00") {
    id
  }
}
```

JSON input:

```json
{
  "openingTime": "09:00:00"
}
```

```json
{
  "alarmTime": "07:30:00.1234567"
}
```

Invalid input values:

| Value                   | Why is it invalid                     |
| ----------------------- | ------------------------------------- |
| `"15:30:00Z"`           | Contains time zone indicator `Z`.     |
| `"15:30:00+05:30"`      | Contains time zone offset.            |
| `"2023-12-24T15:30:00"` | Contains date component.              |
| `"15:30"`               | Missing seconds component.            |
| `"24:00:00"`            | Invalid hour (24).                    |
| `"15:60:00"`            | Invalid minute (60).                  |
| `"15:30:00.12345678"`   | More than 7 fractional second digits. |

# References

- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) — Date and Time on the
  Internet: Timestamps
