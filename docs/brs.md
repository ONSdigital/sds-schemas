# BRES Survey SDS Schema

This document describes the schema for the BRS survey.

## Schema

Schema: [v1.json](/schemas/brs/v1.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                       | Description                                                                                                    | Mandatory |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------|
| `identifier`                               | The unique top-level identifier. This is a string representing the reporting unit reference.                   | Yes       | 
| `vat`                                      | Data about the bussiness VAT registration                                                                      | No        |
| `vat.registration_number`                  | The 9 digit VAT reference of the business.                                                                     | Yes       | 
| `vat.subsidiary_identifier`                | The 3 digit subsidiary identifier, if the business is part of a VAT group.                                     | No        | 
| `employer_paye`                            | Data about the employer PAYE reference                                                                         | No        | 
| `employer_paye.tax_office_number`          | The 3 digit tax office number for the PAYE reference.                                                          | Yes       | 
| `employer_paye.reference`                  | The tax office employer reference for the PAYE reference.                                                      | Yes       |
| `address`                                  | An array containing fields of the address for the reporting unit. At least 2 address lines and Postcode.       | Yes       |
| `items.local-units[].business_description` | The business description for the local unit.                                                                   | Yes       |  


## Examples

Examples can be found at [examples/brs](../examples/brs).