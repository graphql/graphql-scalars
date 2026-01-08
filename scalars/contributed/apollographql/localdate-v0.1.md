# LocalDate — GraphQL Custom Scalar

Author - apollographql

Date - 2025-12-04

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a local date, without any reference to a time zone.

Using [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html#section-5.6)
format, a `LocalDate` is represented as `full-date`:

```
date-fullyear   = 4DIGIT  ; 0000-9999
date-month      = 2DIGIT  ; 01-12
date-mday       = 2DIGIT  ; 01-28, 01-29, 01-30, 01-31 based on
                         ; month/year

full-date       = date-fullyear "-" date-month "-" date-mday
```

# Recommended Name

The recommended name is `LocalDate`.

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

| Value        | Description   |
| ------------ | ------------- |
| `1983-10-20` | A valid date. |

These are invalid examples:

| Value                 | Why is it invalid                       |
| --------------------- | --------------------------------------- |
| `1983-01-20T23:59:59` | Time is not allowed.                    |
| `1983-00-20`          | 00 is not a valid month.                |
| `1983-01-32`          | 32 is not a valid day.                  |
| `10000-10-20`         | More than 4 digits for `date-fullyear`. |
| `52-10-20`            | Less than 4 digits for `date-fullyear`. |
