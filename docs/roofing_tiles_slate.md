# Roofing Tiles + Slate Survey SDS Schema

This document describes the schema for the Roofing Tiles + Slate surveys.

## Schema

Schema v1: [v1.json](/schemas/roofing_tiles_slate/v1.json)  
Schema v2: [v2.json](/schemas/roofing_tiles_slate/v2.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                             | Description                                                                                | Mandatory | Present in v1/v2/both |
|----------------------------------|--------------------------------------------------------------------------------------------|-----------|-----------------------|
| `items.local-units`              | Data about the local units                                                                 | Yes       | Both                  |
| `items.local-units[].identifier` | The identifier for the local unit. This is a string representing the local unit reference. | Yes       | Both                  |
| `items.local-units[].name`       | A string representing the name of the local unit.                                          | Yes       | Both                  |
| `items.local-units[].address`    | An array containing fields of the address for the local unit.                              | Yes       | Both                  |
| `survey_id`                      | The identifier for a particular survey                                                     | Yes       | v2                    |
## Examples

Examples can be found at [examples/roofing_tiles_slate](../examples/roofing_tiles_slate).
