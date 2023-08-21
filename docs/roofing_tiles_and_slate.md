# Roofing Tiles + Slate Survey SDS Schema

This document describes the schema for the Roofing Tiles + Slate survey.

## Schema

Schema: [roofing_tiles_and_stale.json](/schemas/roofing_tiles_and_slate.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                             | Description                                                                                | Mandatory |
|----------------------------------|--------------------------------------------------------------------------------------------|-----------|
| `items.local_units`              | Data about the local units                                                                 | Yes       |
| `items.local_units[].identifier` | The identifier for the local unit. This is a string representing the local unit reference. | Yes       |
| `items.local_units[].name`       | A string representing the name of the local unit.                                          | Yes       |
| `items.local_units[].address`    | An array containing fields of the address for the local unit.                              | Yes       |

## Examples

Examples can be found at [examples/roofing_tiles_and_slate](/examples/roofing_tiles_and_slate).
