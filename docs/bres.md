# BRES Survey SDS Schema

This document describes the schema for the BRES survey.

## Schema

Schema v1: [v1.json](/schemas/bres/v1.json)   
Schema v2: [v2.json](/schemas/bres/v2.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                       | Description                                                                                                    | Mandatory | Present in v1/v2/both |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------|-----------------------|
| `identifier`                               | The unique top-level identifier. This is a string representing the reporting unit reference.                   | Yes       | Both                  |
| `vat`                                      | Data about the bussiness VAT registration                                                                      | No        | Boht                  |
| `vat.registration_number`                  | The 9 digit VAT reference of the business.                                                                     | Yes       | Boht                  |
| `vat.subsidiary_identifier`                | The 3 digit subsidiary identifier, if the business is part of a VAT group.                                     | No        | Both                  |
| `employer_paye`                            | Data about the employer PAYE reference                                                                         | No        | Both                  |
| `employer_paye.tax_office_number`          | The 3 digit tax office number for the PAYE reference.                                                          | Yes       | Both                  | 
| `employer_paye.reference`                  | The tax office employer reference for the PAYE reference.                                                      | Yes       | Both                  |
| `address`                                  | An array containing fields of the address for the reporting unit. At least 2 address lines and Postcode.       | Yes       | Both                  |   
| `items.local-units`                        | Data about the local units                                                                                     | Yes       | Both                  |
| `items.local-units[].identifier`           | The identifier for the local unit. This is a string representing the local unit reference.                     | Yes       | Both                  |
| `items.local-units[].name`                 | The name of the local unit.                                                                                    | Yes       | Both                  |   
| `items.local-units[].trading_name`         | The "trading as" name for the local unit.                                                                      | No        | Both                  |
| `items.local-units[].business_description` | The business description for the local unit.                                                                   | Yes       | Both                  |   
| `items.local-units[].address`              | An array containing fields of the address for the local unit. At least 1 address line and Postcode will exist. | Yes       | Both                  |
| `survey_id`                                | The identifier for a particular survey                                                                         | Yes       | v2                    |

## Examples

Examples can be found at [examples/bres](../examples/bres).
