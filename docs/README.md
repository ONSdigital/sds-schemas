# SDS Unit Data Schema

This document describes the general structure that all supplementary data sets should follow.

## Schema

v1 Template: [template_v1.json](/schemas/template_v1.json)

| Path                           | Description                                                                                                                                    | Mandatory |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `schema_version`               | A constant string indicating the version of the schema specification being used.                                                               | Yes       |
| `key_field`                    | A constant string indicating the name of the key field for the top level data. The string must exist as a top level property.                  | Yes       |
| `items`                        | An object used to represent repeating items. For example, list of employees, companies, products etc. See: [Repeating Items](#repeating-items) | No        |

At the top level, additional supplementary data can be added. However, currently only simple key value strings, objects, arrays are supported. Nested arrays and deeply nested objected are not supported at this top level.

### Repeating Items

Repeating items are any bits of data that have the same semantic structure but contain different data. For example, a list of employees, companies, products etc.
This is used to support repeating/looping features in eQ Runner. `items` are used as `lists` in runner, therefore `items` allow you to use any `list` feature in eQ Runner such as Looping and Repeating sections.

Each top-level property of `items` is considered a `list`. Each property will represent a list in eQ Runner. For example, `items.employees` will be a list of employees. 

Items must follow this spec:

```json
{
  "type": "object",
  "properties": {
    "<some-name>": {
      "type": "object",
      "properties": {
        "key_field": {
          "const": "identifier",
          "description": "The name to key field for the items"
        },
        "values": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {},
          }
        }
      },
      "additionalProperties": false,
      "required": ["key_field", "values"]
    }
  },
  "additionalProperties": false,
  "required": ["<some-name>"]
}
```

Data about each item is represented in `items.<some-name>.values`. Each item must have a property which match `items.<some-name>.values.key_field` property.

