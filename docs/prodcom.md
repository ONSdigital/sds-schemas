# Prodcom Survey SDS Schema

This document describes the schema for the Prodcom survey.

## Schema

Schema: [prodcom.json](/schemas/prodcom.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                               | Description                                                              | Mandatory                       |
|----------------------------------------------------|--------------------------------------------------------------------------|---------------------------------|
| `note`                                             | A note that is used at the questionnaire or product level.               | No                              |
| `note.title`                                       | The title of the note. This note may be used at survey or product level. | Yes                             |
| `note.description`                                 | The description of the note                                              | Yes                             |
| `items.products.key_field`                         | The field used as the key identifier for products                        | Yes                             |
| `items.products.values[].identifier`               | Identifier for a product                                                 | Yes                             |
| `items.products.values[].name`                     | Name of the product                                                      | Yes                             |
| `items.products.values[].cn_codes`                 | Customs and Excise Codes for the product                                 | Yes                             |
| `items.products.values[].guidance_include`         | Guidance to used on the "Include" panel                                  | No                              |
| `items.products.values[].guidance_include.title`   | Title for the guidance on including certain items                        | Yes                             |
| `items.products.values[].guidance_include.list`    | List of items to be included                                             | Yes                             |
| `items.products.values[].guidance_exclude`         | Title for the guidance on excluding certain items                        | No                              |
| `items.products.values[].guidance_exclude.title`   | Title for the guidance on excluding certain items                        | Yes                             |
| `items.products.values[].guidance_exclude.list`    | List of items to be excluded                                             | Yes                             |
| `items.products.values[].value_sales`              | Data for the "Value of sales" answer                                     | Yes                             |
| `items.products.values[].value_sales.answer_code`  | Answer code for the value of sales of a product                          | Yes                             |
| `items.products.values[].value_sales.label`        | Label for the value of sales of a product                                | Yes                             |
| `items.products.values[].volume_sales`             | Data for the "Volume of sales" answer                                    | No                              |
| `items.products.values[].volume_sales.answer_code` | Answer code for the volume of sales of a product                         | Yes                             |
| `items.products.values[].volume_sales.label`       | Label for the volume of sales of a product                               | Yes                             |
| `items.products.values[].volume_sales.unit_label`  | Unit label for the volume of sales of a product                          | Yes                             |
| `items.products.values[].total_volume`             | Data for the "Total volume produced" answer                              | No (Yes if volume_sales exists) |
| `items.products.values[].total_volume.answer_code` | Answer code for the total volume produced of a product                   | Yes                             |
| `items.products.values[].total_volume.label`       | Label for the total volume produced of a product                         | Yes                             |
| `items.products.values[].total_volume.unit_label`  | Unit label for the total volume produced of a product                    | Yes                             |

## Examples

Examples can be found at [examples/prodcom](/examples/prodcom).
