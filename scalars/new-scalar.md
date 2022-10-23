# Custom Scalar specification contribution guide

Thanks for contributing to GraphQL Scalars.

The goal of the GraphQL Scalars project is to provide a directory of GraphQL
Custom Scalar specifications, contributed by the community. Contributed
specifications will be hosted on a GraphQL Foundation owned domain, which can be
referenced with the built-in `@specifiedBy` GraphQL directive.

GraphQL Custom Scalar specifications are language agnostic and thus can be used
to document and standardize behavior across different languages.

We will confirm the domain details soon. We are currently setting this up.

Please ensure that you read the
[Code of Conduct](https://github.com/graphql/graphql-scalars/blob/main/CODE_OF_CONDUCT.md)
before contributing to this project.

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

## Review process

Your specification will then be reviewed by a maintainer of the
[graphql-scalars repository](https://github.com/graphql/graphql-scalars). The
maintainers will verify that the template has been completed, but note that the
correctness of the specification is the responsibility of the original
contributor.
