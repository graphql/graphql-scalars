# LocalDateTime — GraphQL Custom Scalar

"Author - ChilliCream"

"Date - 2025-11-27"

This is a String-based scalar.

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a date and time without a time-zone in the
[ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system.

The pattern is "YYYY-MM-DDThh:mm:ss" with "YYYY" representing the year, "MM" the
month, "DD" the day, "hh" the hour, "mm" the minute, and "ss" the second. The
"T" may be lower case.

Valid examples are "1983-10-20T23:59:59" or "2023-04-01T23:59:59". An invalid
example would be "2011-13-10T23:59:59" because there isn't a 13th month in a
year.

The prefix "Local" comes from the fact that without a time-zone it is not a
specific point in time, but rather expresses a "local point of view".

Because this scalar depends on the ISO-8601 calendar it is not recommended to
use for dates before the year 1582.

# Name

The recommended name is "LocalDateTime".

# Result

Every result must follow the pattern described above, with the further
requirement that the divider character `T` is always uppercase, never `t`.

# Input

Every input must follow the pattern described above.

# References

[ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
