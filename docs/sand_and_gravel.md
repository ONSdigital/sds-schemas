# Sand and Gravel Survey SDS Schema

This document describes the schema for the Sand and Gravel surveys.

## Schema

Schema v1: [v1.json](/schemas/sand_and_gravel/v1.json)   
Schema v2: [v2.json](/schemas/sand_and_gravel/v2.json)   

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                             | Description                                                                                | Mandatory | Present in v1/v2/both |
|----------------------------------|--------------------------------------------------------------------------------------------|-----------|-----------------------|
| `items.local-units`              | Data about the local units                                                                 | Yes       | Both                  |
| `items.local-units[].identifier` | The identifier for the local unit. This is a string representing the local unit reference. | Yes       | Both                  |
| `items.local-units[].name`       | A string representing the name of the local unit.                                          | Yes       | Both                  |
| `items.local-units[].address`    | An array containing fields of the address for the local unit.                              | Yes       | Both                  |
| `survey_id`                      | The identifier for a particular survey                                                     | Yes       | v2                    |

## Examples

Examples can be found at [examples/sand_and_gravel](../examples/sand_and_gravel).
