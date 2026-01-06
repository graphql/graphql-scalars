# Json — GraphQL Custom Scalar

Author – ChilliCream

Date – 2026-01-06

**License and Copyright**

Copyright © GraphQL contributors. This specification is licensed under
[OWFa 1.0](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0).

# Overview

The `Json` scalar type represents arbitrary JSON (JavaScript Object Notation)
data as defined by RFC 8259. It is intended for scenarios where structured data
of varying or dynamic shape needs to be stored or transmitted, such as
configuration objects, metadata, flexible schemas, or data with schemas that are
not known at compile time.

Unlike typed GraphQL objects which have a fixed schema, `Json` allows for any
valid JSON value including objects, arrays, strings, numbers, booleans, and
null. This provides flexibility at the cost of losing GraphQL's type safety for
that field.

The scalar accepts and returns JSON values that conform to RFC 8259.

# Recommended name

The recommended name for this scalar is `Json`.

# Result spec

A `Json` scalar serializes as any valid JSON value as defined by RFC 8259. This
can be:

- A JSON object: `{ "key": "value" }`
- A JSON array: `[1, 2, 3]`
- A JSON string: `"text"`
- A JSON number: `42` or `3.14`
- A JSON boolean: `true` or `false`
- JSON null: `null`

The serialized value must be valid JSON and conform to RFC 8259.

## Examples

These are valid result values:

| Value                                 | Explanation              |
| ------------------------------------- | ------------------------ |
| `{ "name": "John", "age": 30 }`       | A JSON object.           |
| `[1, 2, 3, 4, 5]`                     | A JSON array.            |
| `"Hello, World!"`                     | A JSON string.           |
| `42`                                  | A JSON number (integer). |
| `3.14159`                             | A JSON number (decimal). |
| `true`                                | A JSON boolean.          |
| `null`                                | JSON null value.         |
| `{ "nested": { "data": [1, 2, 3] } }` | Nested JSON structure.   |

These are invalid result values:

| Value       | Why is it invalid       |
| ----------- | ----------------------- |
| `undefined` | Not a valid JSON value. |
| `NaN`       | Not a valid JSON value. |
| `Infinity`  | Not a valid JSON value. |

# Input spec

A `Json` scalar accepts any valid JSON value as defined by RFC 8259, both as
GraphQL literals and as JSON input values.

When provided as a GraphQL literal, object properties are unquoted to be
compatible with GraphQL syntax. This means property names must be valid GraphQL
names (matching the pattern `/[_A-Za-z][_0-9A-Za-z]*/`). When provided as JSON
input (such as in variables), standard JSON syntax with quoted property names is
used.

The input can be:

- A JSON object
- A JSON array
- A JSON string
- A JSON number
- A JSON boolean
- JSON null

Implementations should validate:

- Input is valid JSON per RFC 8259

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

| Value       | Why is it invalid       |
| ----------- | ----------------------- |
| `undefined` | Not a valid JSON value. |
| `NaN`       | Not a valid JSON value. |
| `Infinity`  | Not a valid JSON value. |

# References

- [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) — The JavaScript Object
  Notation (JSON) Data Interchange Format
