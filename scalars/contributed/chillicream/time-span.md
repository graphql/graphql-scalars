# TimeSpan — GraphQL Custom Scalar

Author – ChilliCream

Date – 2025-12-30

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `TimeSpan` scalar type represents a duration of time. It is intended for
scenarios where you need to represent time intervals, such as elapsed time,
timeout durations, scheduling intervals, or any measurement of time that is not
tied to a specific date or time.

Unlike date-time scalars which represent points in time, `TimeSpan` represents a
length of time that could be applied to any point in time.

# Recommended name

The recommended name for this scalar is `TimeSpan`.

# Result spec

A `TimeSpan` scalar must serialize to a string representation conforming to the
ISO 8601 duration format.

The format follows the pattern: `P[n]Y[n]M[n]W[n]DT[n]H[n]M[n]S` where:

- `P` is the duration designator (for period) placed at the start
- `Y` is the year designator following the value for years
- `M` is the month designator following the value for months
- `W` is the week designator following the value for weeks
- `D` is the day designator following the value for days
- `T` is the time designator that precedes the time components
- `H` is the hour designator following the value for hours
- `M` is the minute designator following the value for minutes
- `S` is the second designator following the value for seconds

Fractional seconds may be included after the seconds value, preceded by a
decimal point.

## Examples

These are valid result values:

| Value          | Explanation                         |
| -------------- | ----------------------------------- |
| `"PT1H"`       | 1 hour.                             |
| `"PT30M"`      | 30 minutes.                         |
| `"P1DT2H30M"`  | 1 day, 2 hours, and 30 minutes.     |
| `"P2W"`        | 2 weeks.                            |
| `"PT1H30M45S"` | 1 hour, 30 minutes, and 45 seconds. |
| `"PT0.5S"`     | 0.5 seconds (500 milliseconds).     |
| `"-PT15M"`     | Negative 15 minutes.                |

These are invalid result values:

| Value       | Why is it invalid                |
| ----------- | -------------------------------- |
| `"1 hour"`  | Not in ISO 8601 duration format. |
| `"90"`      | Missing duration designators.    |
| `"1:30:00"` | Not in ISO 8601 duration format. |
| `123`       | Must be a string, not a number.  |

# Input spec

A `TimeSpan` scalar accepts string values representing durations in ISO 8601
duration format, both as GraphQL literals and as JSON input values.

Implementations should validate:

- String conforms to ISO 8601 duration format
- All time components are within valid ranges
- The total duration is within the supported range of the implementation

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  setSessionTimeout(duration: "PT30M") {
    id
  }
}
```

JSON input:

```json
{
  "duration": "PT2H30M"
}
```

```json
{
  "cacheExpiration": "P1DT12H"
}
```

Invalid input values:

| Value        | Why is it invalid                |
| ------------ | -------------------------------- |
| `"1 hour"`   | Not in ISO 8601 duration format. |
| `"90"`       | Missing duration designators.    |
| `"01:00:00"` | Not in ISO 8601 duration format. |
| `""`         | Empty string.                    |

# References

- [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) — Date and
  time format (includes duration format)
- [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) —
  Wikipedia reference for duration format
