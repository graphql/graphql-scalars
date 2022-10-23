# GraphQL Custom Scalars Specification Contribution Guide

Thanks for contributing to GraphQL Scalars.

The goal of the GraphQL Scalars project is to provide a directory of GraphQL
Custom Scalar specifications, contributed by the community. Contributed
specifications will be hosted on a GraphQL Foundation owned domain, which can be
referenced with the built-in `@specifiedBy` GraphQL directive.

GraphQL Custom Scalar specifications are language agnostic and thus can be used
to document and standardize behavior across different languages.

We will confirm the domain details soon. We are currently setting this up.

Please ensure that you read the [Code of Conduct](CODE_OF_CONDUCT.md) before
contributing to this project.

## How to contribute

1. Copy the `template-string.md`
   [template](https://github.com/graphql/graphql-scalars/blob/main/scalars/template-string.md)
   for Custom Scalars based on the built-in String Scalar, or otherwise use the
   `template.md`
   [template](https://github.com/graphql/graphql-scalars/blob/main/scalars/template.md)
   for all other Custom Scalars. Templates are located in the
   [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars/tree/main/scalars).

2. [Open a new pull request](https://github.com/graphql/graphql-scalars/pulls)
   for each Custom Scalar specification you would like to add.

3. Modify your selected template, and save it in the correct place
   `scalars/contributed/<github-user-name>/<scalar-name>.md` in the
   [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars/tree/main/scalars/contributed).
   The directory location is important, as this will form part of the reference
   URL for your specification.

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

## Review process

Your specification will then be reviewed by a maintainer of the
[graphql-scalars repository](https://github.com/graphql/graphql-scalars). The
maintainers will verify that the template has been completed, but note that the
correctness of the specification is the responsibility of the original
contributor.
