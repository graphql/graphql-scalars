# GraphQL Custom Scalar Specifications

Thanks for contributing to GraphQL Scalars.

The goal of the GraphQL Scalars project is to provide a directory of GraphQL
Custom Scalar specifications, contributed by the community. Contributed
specifications are hosted on a GraphQL Foundation owned domain
[scalars.graphql.org](https://scalars.graphql.org), which can be referenced with
the built-in `@specifiedBy`
[GraphQL directive](https://spec.graphql.org/draft/#sec--specifiedBy).

GraphQL Custom Scalar specifications are language agnostic and thus can be used
to document and standardize behavior across different languages.

Please ensure that you read the
[Code of Conduct](https://graphql.org/codeofconduct/) before contributing to
this project.

## How to contribute

1. Copy the `template-string.md`
   [template](https://github.com/graphql/graphql-scalars/blob/main/scalars/template-string.md)
   for Custom Scalars based on the built-in String Scalar, or otherwise use the
   `template.md`
   [template](https://github.com/graphql/graphql-scalars/blob/main/scalars/template.md)
   for all other Custom Scalars. Templates are located in the
   [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars/tree/main/scalars).

2. Modify your selected template, and save it in the correct place
   `scalars/contributed/<github-user-name>/<scalar-name>.md` in the
   [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars/tree/main/scalars/contributed).
   The directory location is important, as this will form part of the reference
   URL for your specification.

3. Install dependencies with `npm install` and the run `npm run build` to
   locally build the resulting public specification files. Navigate to the
   `/public` folder to view the built files.

4. Run `npm test` to ensure proper formatting before submitting a pull request.

5. [Open a new pull request](https://github.com/graphql/graphql-scalars/pulls)
   for each Custom Scalar specification you would like to add.

### Review process

Your specification pull request will be reviewed by a maintainer of the
[graphql-scalars repository](https://github.com/graphql/graphql-scalars). The
maintainers will verify that the template has been completed, but note that the
correctness of the specification is the responsibility of the original
contributor.

### Immutable specifications

Specification semantics must not change, as specifications are publicly
available reference documents. We will permit small edits which do not change
specification semantics, such as typo fixes.

A new version of a Custom Scalar specification should have a new scalar name,
either with a number appended such as `<scalar-name>2`, or a different name such
as `OffsetDateTime` to differentiate from `DateTime`.

## Licensing

Specifications contributed to the GraphQL Scalars repository are part of the
GraphQL Specification Project and are made available by the
[Joint Development Foundation](https://www.jointdevelopment.org/). The current
[GraphQL Working Group](https://github.com/graphql/graphql-wg) charter, which
includes the IP policy governing all working group deliverables (including
specifications, source code, and datasets) may be found in the
[technical charter](https://technical-charter.graphql.org).

By contributing to this repository, you agree to license your work according to
the licenses governing GraphQL Specification Project deliverables, which are:

| Deliverable    | License                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Specifications | [Open Web Foundation Agreement 1.0 (Patent and Copyright Grants)](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0) |
| Source code    | [MIT License](https://opensource.org/licenses/MIT)                                                                                                                 |
| Data sets      | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)                                                                                                      |

### Contributor License Agreement

This repository is managed by EasyCLA. Project participants must sign the free
[GraphQL Specification Membership agreement](https://preview-spec-membership.graphql.org)
before making a contribution. You only need to do this one time, and it can be
signed by
[individual contributors](http://individual-spec-membership.graphql.org/) or
their [employers](http://corporate-spec-membership.graphql.org/).

To initiate the signature process please open a PR against this repo. The
EasyCLA bot will block the merge if we still need a membership agreement from
you.

You can find
[detailed information here](https://github.com/graphql/graphql-wg/tree/main/membership).
If you have issues, please email
[operations@graphql.org](mailto:operations@graphql.org).

### Copyright

Copyright © GraphQL contributors

THESE MATERIALS ARE PROVIDED “AS IS”. The parties expressly disclaim any
warranties (express, implied, or otherwise), including implied warranties of
merchantability, non-infringement, fitness for a particular purpose, or title,
related to the materials. The entire risk as to implementing or otherwise using
the materials is assumed by the implementer and user. IN NO EVENT WILL THE
PARTIES BE LIABLE TO ANY OTHER PARTY FOR LOST PROFITS OR ANY FORM OF INDIRECT,
SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER FROM ANY CAUSES
OF ACTION OF ANY KIND WITH RESPECT TO THIS DELIVERABLE OR ITS GOVERNING
AGREEMENT, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
OTHERWISE, AND WHETHER OR NOT THE OTHER MEMBER HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

## Code of Conduct

This project abides by the GraphQL Foundation's
[Code of Conduct](https://graphql.org/codeofconduct/).
