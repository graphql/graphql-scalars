# EmailAddress — GraphQL Custom Scalar

Author - Juke-Duke

Date - 2023-02-06

This is a String-based Scalar.

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

This Scalar represents a valid electronic mail address using a simplified version of [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322).

The format of an email address is `local@domain`, where the local part may consist of up to 64 UTF-8 characters, the domain part may consist of up to 255 UTF-8 characters, and the two parts are separated by an `@` sign.

Other formats, including using square-bracketed IP addresses in the domain part, and quoted-string local parts, are not supported for simplicity.

The local part may contain any of the following ASCII characters:
- Uppercase and lowercase Latin letters `A` to `Z` and `a` to `z`
- Digits `0` to `9`
- Printable characters ``!#$%&'*+-/=?^_`{|}~``
- Dot `.`, provided that it is not the first or last character and provided also that it does not appear consecutively

The domain part may contain any of the following ASCII characters:
- Uppercase and lowercase Latin letters `A` to `Z` and `a` to `z`
- Digits `0` to `9`, provided that top-level domain names are non-all-numeric (.com, .net, .org, etc.)
- Hyphen `-`, provided that it is not the first or last character

**Examples**

The general format is described in [RFC5322 Section 3.4.1](https://www.rfc-editor.org/rfc/rfc5322#section-3.4.1).
These examples are taken from [WikiPedia](https://en.wikipedia.org/wiki/Email_address#Examples), which is also based off of [RFC5322 Section 3.4.1](https://www.rfc-editor.org/rfc/rfc5322#section-3.4.1).

These are valid examples:

| String                                           | Explanation                                                           |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| `simple@example.com`                             | An EmailAddress without any special characters.                       |
| `very.common@example.com`                        | An EmailAddress with a dot inside the local part.                     |
| `disposable.style.email.with+symbol@example.com` | An EmailAddress with dots and a plus sign inside the local part.      |
| `other.email-with-hyphen@example.com`            | An EmailAddress with a dot and hyphens inside the local part.         |
| `fully-qualified-domain@example.com`             | An EmailAddress with hyphens inside the local part.                   |
| `user.name+tag+sorting@example.com`              | An EmailAddress with a dot and plus signs inside the local part       |
| `x@example.com`                                  | An EmailAddress with a single character in the local part.            |
| `example-indeed@strange-example.com`             | An EmailAddress with a hyphen in both the local and domain parts.     |
| `test/test@test.com`                             | An EmailAddress with a slash in the local part.                       |
| `admin@mailserver1`                              | An EmailAddress with no top-level domain. This is highly discouraged. |
| `example@s.example`                              | An EmailAddress with a dot in the domain part.                        |
| `mailhost!username@example.org`                  | An EmailAddress with a bang in the local part.                        |
| `user%example.com@example.org`                   | An EmailAddress with a percent sign in the local part.                |
| `user-@example.org`                              | An EmailAddress with a hyphen in the local part.                      |
| `non-all-numerical-top-level@domain.g2g`         | An EmailAddress with a non-all-numerical top-level domain.            |

These are invalid examples:
| String                                                                           | Explanation                                                    |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Abc.example.com`                                                                | No `@` sign separating the local and domain components.        |
| `A@b@c@example.com`                                                              | Only one is allowed to divide the local and domain components. |
| `a"b(c)d,e:f;g<h>i[j\k]l@example.com`                                            | The local part contains invalid characters.                    |
| `just"not"right@example.com`                                                     | Quotes are not allowed in the local component.                 |
| `this is"not\allowed@example.com`                                                | Spaces and backslashes are not allowed in the local component. |
| `this\ still\"not\\allowed@example.com`                                          | Spaces and backslashes are not allowed in the local component. |
| `1234567890123456789012345678901234567890123456789012345678901234+x@example.com` | The local component is longer than 64 characters.              |
| `i_like_underscore@but_its_not_allowed_in_this_part.example.com`                 | Underscores are not allowed in the domain component.           |
| `QA[icon]CHOCOLATE[icon]@test.com`                                               | Non UTF-8 characters are not allowed in the local component.   |
| `all-numerical-top-level@domain.3778`                                            | Top-level domains cannot be all numerical.                     |


# Name

The recommended name is `EmailAddress`. Alternatives may be `Email`, `E-Mail`, `MailAddress`.

# Result

Every result must follow the valid String formats as described above.

# Input

Every input following the valid String formats as described above must be accepted.

# References

[RFC 5322](https://www.rfc-editor.org/rfc/rfc5322)

[RFC 6531](https://www.rfc-editor.org/rfc/rfc6531)

[Wikipedia](https://en.wikipedia.org/wiki/Email_address)
