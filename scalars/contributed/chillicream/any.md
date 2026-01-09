# Any — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-06

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Any` scalar type represents any valid GraphQL value. It is intended for
scenarios where the type of data is dynamic or not known at schema definition
time, such as configuration objects, metadata, flexible schemas, or polymorphic
data structures.

Unlike typed GraphQL objects which have a fixed schema, `Any` allows for any
valid GraphQL value including objects, lists, strings, numbers, booleans, and
null. This provides flexibility at the cost of losing GraphQL's type safety for
that field.

# Recommended name

The recommended name for this scalar is `Any`.

# Result spec

An `Any` scalar serializes as any valid GraphQL value. This can be:

- A GraphQL object (represented as a map of field names to values)
- A GraphQL list (represented as an array of values)
- A GraphQL string
- A GraphQL integer or float
- A GraphQL boolean
- A GraphQL null value

The serialized format depends on the transport mechanism used (typically JSON
over HTTP, but GraphQL is transport-agnostic).

## Examples

These are valid result values:

| Value                                 | Explanation       |
| ------------------------------------- | ----------------- |
| `{ "name": "John", "age": 30 }`       | An object value.  |
| `[1, 2, 3, 4, 5]`                     | A list value.     |
| `"Hello, World!"`                     | A string value.   |
| `42`                                  | An integer value. |
| `3.14159`                             | A float value.    |
| `true`                                | A boolean value.  |
| `null`                                | A null value.     |
| `{ "nested": { "data": [1, 2, 3] } }` | Nested structure. |

These are invalid result values:

| Value       | Why is it invalid          |
| ----------- | -------------------------- |
| `undefined` | Not a valid GraphQL value. |
| `NaN`       | Not a valid GraphQL value. |
| `Infinity`  | Not a valid GraphQL value. |

# Input spec

An `Any` scalar accepts any valid GraphQL value, both as GraphQL literals and as
input values.

The input can be:

- A GraphQL object
- A GraphQL list
- A GraphQL string
- A GraphQL integer or float
- A GraphQL boolean
- A GraphQL null value

## Examples

Valid input values:

GraphQL Literal:

```graphql
mutation {
  updateMetadata(data: { theme: "dark", notifications: true }) {
    id
  }
}
```

JSON input:

```json
{
  "data": {
    "theme": "dark",
    "notifications": true
  }
}
```

```json
{
  "tags": ["important", "urgent", "review"]
}
```

```json
{
  "count": 42
}
```

Invalid input values:

| Value       | Why is it invalid          |
| ----------- | -------------------------- |
| `undefined` | Not a valid GraphQL value. |
| `NaN`       | Not a valid GraphQL value. |
| `Infinity`  | Not a valid GraphQL value. |

# References

- [GraphQL Specification - Input Values](https://spec.graphql.org/September2025/#sec-Input-Values)
  — GraphQL input value specification
