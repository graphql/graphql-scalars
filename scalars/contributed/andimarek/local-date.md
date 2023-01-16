<!-- cspell:ignore <github user name> -->

# LocalDate — GraphQL Custom Scalar

"Author - andimarek "

"Date - TODO"

This is a String-based Scalar.

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This scalar represents a date without a time-zone in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system.


The pattern is "YYYY-MM-DD" with "YYYY" representing the year, "MM" the month and "DD" the day.

For example "1983-20-10" or "2023-04-01".

The prefix "Local" comes from the fact that without a time-zone it is a not a specific point in time, but rather expresses
a "local point of view". A popular use case for using this scalar are birthdays for example, which are normally not 
stored with a specific timezone.

Because this scalar depends on the ISO-8601 calendar it is not recommend to use for dates before the year 1582. 

# Name

The recommended name is "LocalDate".


# Result spec

Every result must follow the pattern "YYYY-MM-DD" as described above.

# Input spec

Every input must follow the pattern "YYYY-MM-DD" as described above.

# References

ISO-8601 wikipedia: https://en.wikipedia.org/wiki/ISO_8601
