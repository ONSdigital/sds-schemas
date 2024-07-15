# SDS Unit Data Schema

This document describes the general structure that all supplementary data sets should follow.

## Schema

v1 Template: [template_v1.json](/schemas/template_v1.json)   
v2 Template: [template_v2.json](/schemas/template_v2.json)

| Path             | Description                                                                                                                                      | Mandatory     |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `schema_version` | A constant string indicating the version of the schema specification being used.                                                                 | Yes           |
| `identifier`     | The unique top-level identifier. For business surveys, this is the same value as the `ru_ref`.                                                   | Yes           |
| `items`          | An object used to represent repeating items. For example, list of employees, companies, products etc. See: [Repeating Items](#repeating-items)   | No            |
| `survey_id`      | The identifier for a particular survey **(Only for v2)**                                                                                         | Yes           |

At the top level, additional supplementary data can be added. However, currently only simple key value strings, objects, arrays are supported. Nested arrays and deeply nested objected are not supported at this top level.

### Repeating Items

Repeating items are any bits of data that have the same semantic structure but contain different data. For example, a list of employees, companies, products etc.
This is used to support repeating/looping features in eQ Runner. `items` are used as `lists` in runner, therefore `items` allow you to use any `list` feature in eQ Runner such as Looping and Repeating sections.

Each top-level property of `items` is considered a `list`. Each property will represent a list in eQ Runner. For example, `items.employees` will be a list of employees.

*Note: The name of `items` is restricted to lowercase alphanumeric characters and hyphens. This is because the name of `items` is used in the URL of eQ Runner. Therefore, this restriction is required to ensure URLs are accessible and follow gov.uk guidelines.*

Items must follow this spec:

```json
{
	"items": {
		"type": "object",
		"propertyNames": {
			"pattern": "^[a-z0-9][a-z0-9\\-]*[a-z0-9]$",
			"description": "Names for repeating items must be lower case, start with a letter or number, end with a letter or number, and contain only letters, numbers, or hyphens. This field can be shown in eQ URLs therefore no other characters are allowed."
		},
		"properties": {
			"<some-name>": {
				"type": "array",
				"minItems": 1,
				"uniqueItems": true,
				"items": {
					"type": "object",
					"properties": {
						"identifier": {
							"type": ["string", "integer"],
							"minLength": 1,
							"minimum": 0,
							"description": "The unique identifier for the item"
						}
					},
					"additionalProperties": false,
					"required": ["identifier"]
				}
			}
		},
		"additionalProperties": false,
		"required": ["<some-name>"]
	}
}
```

