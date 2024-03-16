<!-- cspell:ignore Alexandre -->

# AccurateDuration — GraphQL Custom Scalar

Author - AlexandreCarlton

Date - 2024-03-17

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This Scalar represents an exact length in time. It is a refinement of the
duration as defined by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) with
the caveat that it does not support calendar components that would otherwise
require the knowledge of a date to determine a precise value. As such, the
following components are excluded:

- calendar year (as this can be potentially a leap year).
- calendar month as this may contain a variable number of days).
- calendar day (as this may contain leap seconds by decision of the
  [Internal Earth Rotation Service](https://en.wikipedia.org/wiki/International_Earth_Rotation_and_Reference_Systems_Service)).
- calendar week (as this is seven calendar days).

Days (unlike calendar days) are supported under the definition of
[ISO 31-1](https://en.wikipedia.org/wiki/ISO_31-1): 24 hours.

Negative durations per [ISO 8601-2](https://en.wikipedia.org/wiki/ISO_8601) are
supported.

# Name

`AccurateDuration`, originating from the wording in
[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):

<blockquote>Duration can be expressed by a combination of components with accurate duration (hour, minute and second)
and components with nominal duration (year, month, week and day).</blockquote>

# Input/Result specification

[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) defines a duration as either:

- `PnYnMnDTnHnMnS`
- `PnW`

Instead, the specification `PDTnHnMn.nS` is used, with the further amendments:

- Year/Month/Week components are not supported.
- Days are considered to be always 24 hours.
- The entire string may be prefixed with a `-` to signify a negative duration.
- Each component may be prefixed with a `-` to signify a negative component.
- The seconds component (and only the seconds component) may have a fractional
  component of up to 9 digits.
- Overflowing of components above their maximum (e.g. 60 for a minute) is
  allowed. For example, `PT90M` is valid and equivalent to `PT1H30M`.

## Positive examples

| String           | Explanation                                              |
| ---------------- | -------------------------------------------------------- |
| `PT2M`           | A duration representing 2 minutes.                       |
| `PT120S`         | A duration representing 120 seconds (2 minutes).         |
| `PT0.000000001S` | A duration representing 1 nanosecond.                    |
| `-P1D`           | A duration representing 1 negative day.                  |
| `P1D-2H`         | A duration representing two hours fewer than a full day. |

## Negative examples

| String            | Explanation                                                     |
| ----------------- | --------------------------------------------------------------- |
| `P1Y`             | Calendar years are not supported.                               |
| `P1M`             | Calendar months are not supported.                              |
| `P1W`             | Calendar weeks are not supported.                               |
| `P0.5D`           | Fractional component is only supported for seconds.             |
| `PT0.0000000001S` | Fractional component in seconds only supports at most 9 digits. |
| `PTS`             | Digits must precede units.                                      |

# References

- [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
