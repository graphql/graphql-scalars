# Custom Scalar spec DateTime

"Author: andimarek"

"Date: 18.10.2022"

# Overview

This Scalar represents an exact point in time. 
This point in time is specified by having an offset to UTC and does **not** use a time zone.

It is a slightly refined version of [RFC 3339](https://tools.ietf.org/html/rfc3339) including the [errata](https://www.rfc-editor.org/errata/rfc3339).

All definitions of RFC 3339 are adopted and nothing is added or removed unless explicitly mentioned here.

The following refinements/clarifications apply:

**Only "date-time"**

This scalar represents a “date-time” as specified in section 5.6 of RFC 3339.

The other productions in section 5.6 are only used to support "date-time" but never stand alone for this Scalar.

**Non-optional exact milliseconds**

RFC 3339 defines `time-secfrac` optional as:

```
time-secfrac    = "." 1*DIGIT (Meaning 1 or more DIGIT)
```

This allows for an unlimited numbers of digits. For this scalar the rule is not optional anymore and refined as:

```
time-secfrac    = "." DIGIT DIGIT DIGIT
```

consisting always of exact three digits representing milliseconds.

**No 'Unknown Local Offset Convention'**

[Section 4.3](https://tools.ietf.org/html/rfc3339#section-4.3) says:

```
If the time in UTC is known, but the offset to local time is unknown, 
this can be represented with an offset of "-00:00".
```

In order to simplify this Scalar this convention is dropped and an offset of `-00:00` is not allowed.

# Name

The recommended name is `DateTime`. An alternative is `OffsetDateTime`.

`Date` is potentially misleading as this Scalar also specifies a time, not only a date.

# Result JSON spec

TODO

# Literal Input spec

TODO

# Raw Input JSON spec

TODO

