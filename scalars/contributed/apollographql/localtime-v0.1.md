# LocalTime — GraphQL Custom Scalar

Author - apollographql

Date - 2025-12-04

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a local date and time, without any reference to a time
zone.

Using [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html#section-5.6)
format, a `LocalTime` is represented as `partial-time`:

```
time-hour       = 2DIGIT  ; 00-23
time-minute     = 2DIGIT  ; 00-59
time-second     = 2DIGIT  ; 00-58, 00-59, 00-60 based on leap second
                         ; rules
time-secfrac    = "." 1*9DIGIT

partial-time    = time-hour ":" time-minute ":" time-second
                 [time-secfrac]
```

**Fractional second precision:**

RFC 3339 allows representing fractional seconds with arbitrary precision, which is
impractical in most programming languages.

For convenience, this specification enforces nanosecond precision with at most
nine digits.

Note: JavaScript `Date` only has millisecond precision. Use `LocalTime` with
care if you are using it in applications that require precise times.

# Recommended Name

The recommended name is `LocalTime`.

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

| Value                | Description                      |
| -------------------- | -------------------------------- |
| `23:59:59`           | A valid time.                    |
| `23:59:59.123`       | A time with a fractional second. |
| `23:59:59.123000`    | Trailing zeroes are valid.       |
| `23:59:59.123456789` | Nanosecond precision.            |

These are invalid examples:

| Value                   | Why is it invalid                     |
| ----------------------- | ------------------------------------- |
| `24:59:59`              | `24` is not a valid `time-hour`.      |
| `23:60:59`              | `60` is not a valid `time-minute`.    |
| `23:59:61`              | `61` is not a valid `time-second`.    |
| `23:59:59.123456789123` | Seconds exceed nanosecond precision.  |
| `23:59:59.1234567890`   | More than nine digits for `sec-frac`. |
| `15:20:15-07:00`        | Time offsets are not allowed.         |
