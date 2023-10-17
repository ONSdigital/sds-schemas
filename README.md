# sds-schema-definitions

This project holds the documentation and JSON schema definitions for the surveys that require supplementary data.

## Proposing Changes

1. Open a PR with proposed API changes
2. Add reviewers to the PR this change may affect
3. Changes should be agreed upon and approved between all affected teams
4. Any work that will come out of the proposal should be put on the teams backlogs

## Supported Surveys

Please note that the below surveys are given in the [mapping/survey_map.json](mapping/survey_map.json) file which is used by the live SDS application.
Any changes to the survey_map.json file will impact the SDS application - hence any changes must be signed off by the owners
given here - https://github.com/ONSdigital/sds-schema-definitions/blob/main/.github/CODEOWNERS.

Please note that any new survey id must be added in survey_map.json as a dictionary as shown in the below example.

{ "survey_id": "068", "survey_name": "Roofing Tiles" }

| Survey Name                    | Survey ID |
| ------------------------------ | --------- |
| Prodcom                        | 014       |
| PPI                            | 132       |
| EPI                            | 133       |
| IPI                            | 156       |
| ASHE                           | 141       |
| BRES                           | 221       |
| BRS                            | 241       |
| Roofing Tiles                  | 068       |
| Slate                          | 071       |
| Sand & Gravel (Land Won)       | 066       |
| Sand & Gravel (Marine Dredged) | 076       |

## Docs

Documentation can be found in [docs/](./docs).

- [Main README](docs/README.md)
- [Prodcom README](docs/prodcom.md)
- [Roofing Tiles and Slate README](docs/roofing_tiles_and_slate.md)
- [BRES and BRS README](docs/bres_and_brs.md)
- [JSON Schema Definitions](schemas)
- [JSON Examples (Unit Data)](examples)

## JSON Schema Validation

The supplementary data JSON schemas can be validated using JSON Schema definitions. The JSON schemas are defined using [Draft 2020-12](https://json-schema.org/specification-links.html#2020-12) and are validated via [AJV](https://ajv.js.org/).

** Note: Each JSON schema is self-sufficient and has no external or internal references. Although this does create duplication in the schema, it avoids requiring SDS from needing to resolve the schema references which has a greater overhead than some duplication. This can be revisited in future whereby, the publisher resolves it before it gets to SDS or SDS resolves it before serving it back to Author. **

### Prerequisites

- Node installed matching the version specified in `.nvmrc`. It is recommended that you use [nvm](https://github.com/nvm-sh/nvm) to manage your Node versions.
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (JS package and dependency manager)

**Install dependencies:**

```bash
make build
```

**Validate all examples schemas including inline examples**

```bash
./scripts/validateSchemas.js
```

**Validate inline schema examples**

```bash
./scripts/validateSchemas.js <json-schema-file>
```

**Validate a single file or folder**

```bash
./scripts/validateSchemas.js <json-schema-file> <json-file-or-folder-to-validate>
```

For example:

```bash
./scripts/validateSchemas.js schemas/prodcom.json examples/prodcom/v1.json
```

Help:

```bash
./scripts/validateSchemas.js --help
```

## Development

Format JSON/JS files

```bash
make format
```

Lint JSON/JS files

```bash
make lint
```
