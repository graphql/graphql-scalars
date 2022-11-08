# Custom Scalar spec DateTime

"Author: andimarek"

"Date: 2022-10-18"

This is a String based Scalars (TODO: add link to explanation).

# Overview

This Scalar represents an exact point in time. This point in time is specified
by having an offset to UTC and does **not** use a time zone.

It is a slightly refined version of
[RFC 3339](https://tools.ietf.org/html/rfc3339) including the
[errata](https://www.rfc-editor.org/errata/rfc3339).

All definitions of RFC 3339 are adopted and nothing is added or removed unless
explicitly mentioned here.

The following refinements/clarifications apply:

**Only "date-time"**

This scalar represents a “date-time” as specified in section 5.6 of RFC 3339.

The other productions in section 5.6 are only used to support "date-time" but
never stand alone for this Scalar.

**Non-optional exact milliseconds**

RFC 3339 defines `time-secfrac` optional as:

```
time-secfrac    = "." 1*DIGIT (Meaning 1 or more DIGIT)
```

This allows for an unlimited numbers of digits. For this scalar the rule is not
optional anymore and refined as:

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

In order to simplify this Scalar this convention is dropped and an offset of
`-00:00` is not allowed.

**Examples**

The general format is described in
[RFC3339 Section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6).

Under consideration of the additional restrictions and explanations above here
are valid and invalid examples:

These are valid examples:

| String                          | Explanation                                        |
| ------------------------------- | -------------------------------------------------- |
| `2011-08-30T13:22:53.108Z`      | A DateTime with UTC offset (+00:00).               |
| `2011-08-30T13:22:53.108+00:00` | A DateTime with `+00:00` which is the same as UTC. |
| `2011-08-30t13:22:53.108z`      | The `z` and `t` may be lower case.                 |
| `2011-08-30T13:22:53.108-03:00` | A DateTime with -3h offset.                        |
| `2011-08-30T13:22:53.108+03:30` | A DateTime with +3h 30min offset.                  |

These are invalid examples:

| String                             | Why is it invalid                                                  |
| ---------------------------------- | ------------------------------------------------------------------ |
| `2011-08-30T13:22:53.108-03`       | The minutes of the offset are missing.                             |
| `2011-08-30T13:22:53.108912Z`      | Too many digits for fractions of a second. Exactly three expected. |
| `2011-08-30T24:22:53Z`             | Fractions of a second are missing.                                 |
| `2011-08-30T13:22:53.108`          | No offset provided.                                                |
| `2011-08-30`                       | No time provided.                                                  |
| `2011-08-30T13:22:53.108-00:00`    | Negative offset (`-00:00`) is not allowed                          |
| `2011-08-30T13:22:53.108+03:30:15` | Seconds are not allowed for the offset                             |
| `2011-08-30T24:22:53.108Z`         | `24` is not allowed as hour of the time.                           |
| `2010-02-30T21:22:53.108Z`         | 30th of February is not a valid date                               |
| `2010-02-11T21:22:53.108Z+25:11`   | 25 is not a valid hour for offset                                  |

# Name

The recommended name is `DateTime`. An alternative is `OffsetDateTime`.

`Date` is potentially misleading as this Scalar also specifies a time, not only
a date.

# Result

The result must be formatted as described above with the further requirement
that UTC offset should be always be represented as `Z` and not `+00:00` and the
two divider characters `T` and `Z` are always uppercase, never `t` or `z`.

# Input

As Input every valid String as described above must be accepted.
