# BRES + BRS Survey SDS Schema

This document describes the schema for the BRES + BRS survey.

## Schema

Schema: [bres_and_brs.json](/schemas/bres_and_brs.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                       | Description                                                                                                     | Mandatory |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------|
| `identifier`                               | The unique top-level identifier. This is a string representing the reporting unit reference.                    | Yes       |
| `vat`                                      | Data about the bussiness VAT registration                                                                       | No        |
| `vat.registration_number`                  | The 9 digit VAT reference of the business.                                                                      | Yes       |
| `vat.subsidiary_identifier`                | The 3 digit subsidiary identifier, if the business is part of a VAT group.                                      | No        |
| `employer_paye`                            | Data about the employer PAYE reference                                                                          | No        |
| `employer_paye.tax_office_number`          | The 3 digit tax office number for the PAYE reference.                                                           | Yes       |
| `employer_paye.reference`                  | The tax office employer reference for the PAYE reference.                                                       | Yes       |
| `address`                                  | An array containing fields of the address for the reporting unit. At least 2 address lines and Postcode.        | Yes       |
| `items.local_units`                        | Data about the local units                                                                                      | Yes       |
| `items.local_units[].identifier`           | The identifier for the local unit. This is a string representing the local unit reference.                      | Yes       |
| `items.local_units[].name`                 | The name of the local unit.                                                                                     | Yes       |
| `items.local_units[].trading_name`         | The "trading as" name for the local unit.                                                                       | No        |
| `items.local_units[].business_description` | The business description for the local unit.                                                                    | Yes       |
| `items.local_units[].address`              | An array containing fields of the address for the local unit. At least 1 address line and Postcode will exist.  | Yes       |

## Examples

Examples can be found at [examples/bres_and_brs](/examples/bres_and_brs).
