# ASHE Survey SDS Schema

This document describes the schema for the ASHE survey.

## Schema

Schema: [ashe.json](/schemas/ashe.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                   | Description                                                                                     | Mandatory |
|----------------------------------------|-------------------------------------------------------------------------------------------------|-----------|
| `identifier`                           | The unique top-level identifier. This is a string representing the Special Arrangements number. | Yes       |
| `items.employees`                      | Data about each employee                                                                        | Yes       |
| `items.employees[].identifier`         | The unique identifier for the employee. This is the employee serial number.                     | Yes       |
| `items.employees[].check_letter`       | Value used for reconciliation downstream.                                                       | Yes       |
| `items.employees[].name`               | The name of the employee.                                                                       | Yes       |
| `items.employees[].work_identifier`    | The unique identifier for the workplace.                                                        | Yes       |
| `items.employees[].dist_number`        | The dist no.                                                                                    | Yes       |
| `items.employees[].employer_ref`       | The employer reference number.                                                                  | Yes       |
| `items.employees[].work_postcode`      | The postcode of the workplace.                                                                  | Yes       |

## Examples

Examples can be found at [examples/ashe](/examples/ashe).

As always, feel free to customize the paths and links to match your file structure and preferences. If you have any additional requirements or questions, please let me know!
