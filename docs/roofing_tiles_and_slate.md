# Roofing Tiles + Slate Survey SDS Schema

This document describes the schema for the Roofing Tiles + Slate survey.

## Schema

Schema: [roofing_tiles_and_stale.json](/schemas/roofing_tiles_and_slate.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                    | Description                                                                           | Mandatory |
|-----------------------------------------|---------------------------------------------------------------------------------------|-----------|
| `items.local_units`                     | Data about the local units                                                            | Yes       |
| `items.local_units.key_field`           | A constant string indicating the name of the key field for the local units.           | Yes       |
| `items.local_units.values[].lu_ref`     | A string representing the local unit reference.                                       | Yes       |
| `items.local_units.values[].lu_name`    | A string representing the name of the local unit.                                     | Yes       |
| `items.local_units.values[].lu_address` | An array containing fields of the address for the local unit.                         | Yes       |

## Examples

Examples can be found at [examples/roofing_tiles_and_slate](/examples/roofing_tiles_and_slate).
