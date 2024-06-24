# Prodcom Survey SDS Schema

This document describes the schema for the Prodcom survey.

## Schema

Schema v1: [v1.json](/schemas/prodcom/v1.json)   
Schema v2: [v2.json](/schemas/prodcom/v2.json)

**The table below only describes data that is survey specific. The generic structure of supplementary data is documented in [README.md](/docs/README.md)**

| Path                                         | Description                                                              | Mandatory                       | Present in v1/v2/both |
|----------------------------------------------|--------------------------------------------------------------------------|---------------------------------|-----------------------|
| `note`                                       | A note that is used at the questionnaire or product level.               | No                              | Both                  |
| `note.title`                                 | The title of the note. This note may be used at survey or product level. | Yes                             | Both                  |
| `note.description`                           | The description of the note                                              | Yes                             | Both                  |
| `items.products[].identifier`                | The identifier for the product.                                          | Yes                             | Both                  |
| `items.products[].name`                      | Name of the product                                                      | Yes                             | Both                  |
| `items.products[].cn_codes`                  | Customs and Excise Codes for the product                                 | Yes                             | Both                  |
| `items.products[].guidance_include`          | Guidance to used on the "Include" panel                                  | No                              | Both                  |
| `items.products[].guidance_include.title`    | Title for the guidance on including certain items                        | Yes                             | Both                  |
| `items.products[].guidance_include.list`     | List of items to be included                                             | Yes                             | Both                  |
| `items.products[].guidance_exclude`          | Title for the guidance on excluding certain items                        | No                              | Both                  |
| `items.products[].guidance_exclude.title`    | Title for the guidance on excluding certain items                        | Yes                             | Both                  |
| `items.products[].guidance_exclude.list`     | List of items to be excluded                                             | Yes                             | Both                  |
| `items.products[].value_sales`               | Data for the "Value of sales" answer                                     | Yes                             | Both                  |
| `items.products[].value_sales.answer_code`   | Answer code for the value of sales of a product                          | Yes                             | Both                  |
| `items.products[].value_sales.label`         | Label for the value of sales of a product                                | Yes                             | Both                  |
| `items.products[].volume_sales`              | Data for the "Volume of sales" answer                                    | No                              | Both                  |
| `items.products[].volume_sales.answer_code`  | Answer code for the volume of sales of a product                         | Yes                             | Both                  |
| `items.products[].volume_sales.label`        | Label for the volume of sales of a product                               | Yes                             | Both                  |
| `items.products[].volume_sales.unit_label`   | Unit label for the volume of sales of a product                          | Yes                             | Both                  |
| `items.products[].total_volume`              | Data for the "Total volume produced" answer                              | No (Yes if volume_sales exists) | Both                  |
| `items.products[].total_volume.answer_code`  | Answer code for the total volume produced of a product                   | Yes                             | Both                  |
| `items.products[].total_volume.label`        | Label for the total volume produced of a product                         | Yes                             | Both                  |
| `items.products[].total_volume.unit_label`   | Unit label for the total volume produced of a product                    | Yes                             | Both                  |
| `survey_id`                                  | The identifier for a particular survey                                   | Yes                             | v2                    |


## Examples

Examples can be found at [examples/prodcom](../examples/prodcom).
