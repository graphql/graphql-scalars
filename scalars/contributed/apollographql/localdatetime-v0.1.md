# LocalDateTime — GraphQL Custom Scalar

Author - apollographql

Date - 2025-12-04

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a local date and time, without any reference to a time
zone.

Using [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html#section-5.6)
format, a `LocalDateTime` is represented as `full-date "T" partial-time`:

```
date-fullyear   = 4DIGIT  ; 0000-9999
date-month      = 2DIGIT  ; 01-12
date-mday       = 2DIGIT  ; 01-28, 01-29, 01-30, 01-31 based on
                         ; month/year
time-hour       = 2DIGIT  ; 00-23
time-minute     = 2DIGIT  ; 00-59
time-second     = 2DIGIT  ; 00-58, 00-59, 00-60 based on leap second
                         ; rules
time-secfrac    = "." 1*9DIGIT

partial-time    = time-hour ":" time-minute ":" time-second
                 [time-secfrac]
full-date       = date-fullyear "-" date-month "-" date-mday

local-date-time       = full-date "T" partial-time
```

Usage of the uppercase "T" character is recommended, but lowercase "t" is also
valid, in accordance with RFC 3339.

**Fractional second precision:**

RFC 3339 allows representing fractional seconds with arbitrary precision, which is
impractical in most programming languages.

For convenience, this specification enforces nanosecond precision with at most
nine digits.

Note: JavaScript `Date` only has millisecond precision. Use `LocalDateTime` with
care if you are using it in applications that require precise times.

# Recommended Name

The recommended name is `LocalDateTime`.

# GraphQL input coercion

The input must be a
[GraphQL StringValue](https://spec.graphql.org/September2025/#StringValue)
matching the description above.

All other values must raise an error.

# JSON input coercion

The input must be a [JSON string](https://www.json.org/json-en.html) matching
the description above.

All other values must raise an error.

# JSON result coercion

The result must be a [JSON string](https://www.json.org/json-en.html) matching
the description above.

# Examples

Because GraphQL StringValue and JSON string are so similar, the first column in
the table below may be understood as either a GraphQL StringValue or a JSON
string.

| Value                           | Description                      |
| ------------------------------- | -------------------------------- |
| `1983-10-20T23:59:59`           | A valid date.                    |
| `1983-10-20t23:59:59`           | Lowercase "t" may be used.       |
| `1983-10-20T23:59:59.123`       | A date with a fractional second. |
| `1983-10-20T23:59:59.123000`    | Trailing zeroes are valid.       |
| `1983-10-20T23:59:59.123456789` | Nanosecond precision.            |

These are invalid examples:

| Value                              | Why is it invalid                       |
| ---------------------------------- | --------------------------------------- |
| `1983-10-20 23:59:59`              | Missing "T" separator.                  |
| `1983-00-20T23:59:59`              | 00 is not a valid month.                |
| `1983-01-32T23:59:59`              | 32 is not a valid day.                  |
| `1983-01-32T23:59:59.123456789123` | Seconds exceed nanosecond precision.    |
| `2018-04-01T15:20:15-07:00`        | Time offsets are not allowed.           |
| `10000-10-20 23:59:59`             | More than 4 digits for `date-fullyear`. |
| `52-10-20 23:59:59`                | Less than 4 digits for `date-fullyear`. |
