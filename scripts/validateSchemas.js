#!/usr/bin/env node

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import fs from "fs";
import glob from "glob";
import esMain from "es-main";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Coloured console output
const foregroundRed = "\x1b[31m%s\x1b[0m";
const foregroundYellow = "\x1b[33m%s\x1b[0m";
const foregroundGreen = "\x1b[32m%s\x1b[0m";

const ajvValidator = () => {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: false,
  });
  addFormats(ajv);
  return ajv;
};

const schemaDefinitionJsonToExamplesGlob = {
  "schemas/prodcom/v1.json": "examples/prodcom/v1.json",
  "schemas/roofing_tiles_slate/v1.json": "examples/roofing_tiles_slate/v1.json",
  "schemas/sand_and_gravel/v1.json": "examples/sand_and_gravel/v1.json",
  "schemas/bres/v1.json": "examples/bres/v1.json",
  "schemas/prodcom/v2.json": "examples/prodcom/v2.json",
  "schemas/roofing_tiles_slate/v2.json": "examples/roofing_tiles_slate/v2.json",
  "schemas/sand_and_gravel/v2.json": "examples/sand_and_gravel/v2.json",
  "schemas/bres/v2.json": "examples/bres/v2.json",
};

// Recursive function for validating examples against their respective schemas
const _validateInlineExamples = (examples, schema, schemaPath) => {
  /**
   * This function validates the examples array in the schema against the schema object it resides in.
   * It only checks the value is valid within the context of itself not the whole schema.
   */

  const validate = ajvValidator().compile(schema);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];
    const valid = validate(example);

    if (!valid) {
      console.error(
        `Validation failed for example ${i + 1} at schema path: ${schemaPath}`
      );
      console.error("Failed example:", example);
      console.error("Validation errors:", validate.errors);

      failed++;
    } else {
      passed++;
    }
  }

  return { passed, failed };
};

const _checkInlineExamples = (data, schemaPath = "") => {
  /**
   * This function checks for inline examples in the schema and validates them recursively
   */

  let passed = 0;
  let failed = 0;

  if (data.examples && Array.isArray(data.examples)) {
    const result = _validateInlineExamples(data.examples, data, schemaPath);
    passed += result.passed;
    failed += result.failed;
  }

  for (const prop in data) {
    if (typeof data[prop] === "object") {
      const result = _checkInlineExamples(data[prop], schemaPath + "." + prop);
      passed += result.passed;
      failed += result.failed;
    }
  }

  return {
    passed,
    failed,
  };
};

const _validateSchemaForFile = (fileName, baseSchema) => {
  /**
   * This function validates a single schema file against the base schema
   */

  const validate = ajvValidator().compile(baseSchema);

  const jsonData = JSON.parse(fs.readFileSync(fileName));
  const passed = validate(jsonData);
  if (passed) {
    // Validate property names
    const errors = validateListNameNotUsedAtTopLevel(jsonData);

    if (errors.length) {
      console.error(foregroundRed, `\n---\n${fileName} - FAILED`);
      console.dir(
        { Errors: errors },
        {
          depth: null,
        }
      );
      return false;
    }

    console.log(foregroundGreen, `${fileName} - PASSED`);
    return true;
  }

  console.error(foregroundRed, `\n---\n${fileName} - FAILED`);
  console.dir(validate.errors, { depth: null });
  return false;
};

const validateListNameNotUsedAtTopLevel = (jsonData) => {
  /**
   * This function validates properties used in "items" (list names) cannot be used as top level properties
   */
  const errors = [];

  const topLevelKeys = Object.keys(jsonData);
  if (topLevelKeys.includes("items")) {
    const itemsKeys = Object.keys(jsonData.items);
    for (const key of itemsKeys) {
      if (topLevelKeys.includes(key)) {
        errors.push(
          `"${key}" is used both at the top level and inside "items". They are mutually exclusive.`
        );
      }
    }
  }

  return errors;
};

const validateExampleSchemas = (schemaDefinitionFile, filepathOrGlob) => {
  const baseSchema = JSON.parse(fs.readFileSync(schemaDefinitionFile));

  let passed = 0;
  let failed = 0;

  filepathOrGlob = filepathOrGlob.endsWith(".json")
    ? filepathOrGlob
    : `${filepathOrGlob}/**/*.json`;

  const files = glob.sync(`${filepathOrGlob}`);

  if (files.length === 0) {
    console.error(
      foregroundRed,
      `No files found for ${filepathOrGlob}. All schemas must have at least one example.\n`
    );
    return false;
  }

  console.info(
    foregroundYellow,
    `Validating schema(s) "${filepathOrGlob}" (${schemaDefinitionFile})`
  );

  files.forEach((file) => {
    const isValid = _validateSchemaForFile(file, baseSchema);

    if (isValid === true) {
      passed++;
    } else {
      failed++;
    }
  });

  console.log(
    `\n${foregroundGreen} - ${foregroundRed}`,
    `Passed: ${passed}`,
    `Failed: ${failed}\n---\n`
  );

  return !failed;
};

const validateInlineExamples = (schemasMap) => {
  let anyFailed = false;
  // Load and validate examples for each schema
  for (const schemaFile in schemasMap) {
    console.info(
      foregroundYellow,
      `Validating inline schema examples for schema "${schemaFile}"`
    );
    const baseSchema = JSON.parse(fs.readFileSync(schemaFile));

    const result = _checkInlineExamples(baseSchema);
    anyFailed |= !result.passed;

    console.log(
      `${foregroundGreen} - ${foregroundRed}`,
      `Passed: ${result.passed}`,
      `Failed: ${result.failed}\n---\n`
    );
  }

  return !anyFailed;
};

const validateAllExampleSchemas = (schemasMap) => {
  let anyFailed = false;
  for (const [sFile, folderGlob] of Object.entries(schemasMap)) {
    const examplesFolderPassed = validateExampleSchemas(sFile, folderGlob);
    anyFailed |= !examplesFolderPassed;
  }

  return !anyFailed;
};

if (esMain(import.meta)) {
  yargs(hideBin(process.argv))
    .usage(
      `Usage: ./scripts/validateSchemas.js <optional: json-schema-file> <optional: json-file-or-folder-to-validate>`
    )
    .example("./scripts/validateExampleSchemas.js")
    .example("./scripts/validateExampleSchemas.js schemas/prodcom/v1.json ")
    .example(
      "./scripts/validateExampleSchemas.js schemas/prodcom/v1.json examples/prodcom/v1.json"
    )
    .command(
      "$0",
      "Validate a JSON file or folder of JSON files against its JSON schema definition. This also validates any inline examples in the schema definition.",
      (opt) => {
        opt.positional("json-schema-definition-file", {
          describe: `The JSON schema files to use for validation. One of: ${Object.keys(
            schemaDefinitionJsonToExamplesGlob
          )}`,
        });
        opt.positional("json-file-or-folder-to-validate", {
          describe: "The JSON file or folder to validate. ",
        });
      },
      (argv) => {
        const schemaDefinitionFile = argv._[0];
        const schemaFileOrGlob = argv._[1];

        let schemasMap = {};
        if (schemaDefinitionFile && schemaFileOrGlob) {
          schemasMap[schemaDefinitionFile] = schemaFileOrGlob;
        } else if (schemaDefinitionFile) {
          schemasMap[schemaDefinitionFile] =
            schemaDefinitionJsonToExamplesGlob[schemaDefinitionFile];
        } else {
          schemasMap = schemaDefinitionJsonToExamplesGlob;
        }

        let anyFailed = false;

        for (const schemaDefinitionFile in schemasMap) {
          if (!(schemaDefinitionFile in schemaDefinitionJsonToExamplesGlob)) {
            console.error(
              foregroundRed,
              `Invalid JSON Schema Definition File ${schemaDefinitionFile}. Schema file must be one of:`
            );
            console.dir(Object.keys(schemaDefinitionJsonToExamplesGlob));
            console.log(`Help: ./scripts/validateSchemas.js --help`);
            process.exit(1);
          }
        }

        const allExampleFilesPassed = validateAllExampleSchemas(schemasMap);
        const allInlineExamplesPassed = validateInlineExamples(schemasMap);

        anyFailed |= !allExampleFilesPassed || !allInlineExamplesPassed;

        if (anyFailed) {
          process.exit(1);
        }
      }
    )
    .wrap(null)
    .parse();
}
