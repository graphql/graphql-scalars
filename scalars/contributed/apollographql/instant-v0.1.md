# Instant — GraphQL Custom Scalar

Author - apollographql

Date - 2025-12-04

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a specific instant in time in a way that is independent
of a time zone. For example, "1970-01-01T00:00:00" does not represent a moment
in time since this would happen at different times in different time zones:
someone in Tokyo would think it is already 1970-01-01 several hours earlier than
someone in Berlin would. To represent such entities, use the LocalDateTime. In
contrast, "1970-01-01T00:00:00+00:00" can be represented as an Instant.

Using [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html#section-5.6)
format, a `Instant` is represented as `date-time`:

```
date-fullyear   = 4DIGIT
date-month      = 2DIGIT  ; 01-12
date-mday       = 2DIGIT  ; 01-28, 01-29, 01-30, 01-31 based on
                         ; month/year
time-hour       = 2DIGIT  ; 00-23
time-minute     = 2DIGIT  ; 00-59
time-second     = 2DIGIT  ; 00-58, 00-59, 00-60 based on leap second
                         ; rules
time-secfrac    = "." 1*DIGIT
time-numoffset  = ("+" / "-") time-hour ":" time-minute
time-offset     = "Z" / time-numoffset

partial-time    = time-hour ":" time-minute ":" time-second
                 [time-secfrac]
full-date       = date-fullyear "-" date-month "-" date-mday
full-time       = partial-time time-offset

date-time       = full-date "T" full-time
```

Usage of the uppercase "T" character is recommended, but lowercase "t" is also
valid, in accordance with RFC 3339.

**Fractional second precision:**

RFC 3339 allows representing fractional seconds with arbitrary precision, which is
impractical in most programming languages.

For convenience, this specification enforces nanosecond precision with at most
nine digits.

# Recommended Name

The recommended name is `Instant`.

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

| Value                           | Description                                |
| ------------------------------- | ------------------------------------------ |
| `1983-10-20T23:59:59+00:00`     | A valid instant.                           |
| `1983-10-20T23:59:59Z`          | The zero offset may be represented as "Z". |
| `1983-10-20T23:59:59z`          | Lowercase "z" may be used.                 |
| `1983-10-20t23:59:59Z`          | Lowercase "t" may be used.                 |
| `1983-10-20T23:59:59.123+02:00` | An instant with a fractional second.       |

These are invalid examples:

| Value                          | Why is it invalid                      |
| ------------------------------ | -------------------------------------- |
| `1983-10-20T23:59:59`          | Missing offset.                        |
| `1983-10-20T23:59:59+00:00:00` | Offset may not include seconds.        |
| `1983-10-20T23:59:59 00:00`    | Offset must contain a "+" or "-" sign. |
