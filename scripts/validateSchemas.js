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

const ajValidator = new Ajv2020({
  allErrors: true,
  strict: false,
});
addFormats(ajValidator);

const schemaDefinitionJsonToExamplesGlob = {
  "schemas/prodcom.json": "examples/prodcom/*.json",
  "schemas/roofing_tiles_and_slate.json":
    "examples/roofing_tiles_and_slate/*.json",
};

const validateSchemaForFile = (fileName, baseSchema) => {
  const validate = ajValidator.compile(baseSchema);

  const jsonData = JSON.parse(fs.readFileSync(fileName));
  const result = validate(jsonData);
  if (result) {
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
   * This function validates:
   *  - properties used in "items" (list names) cannot be used as top level properties
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

const validateSchemas = (schemaDefinitionFile, filepathOrGlob) => {
  const baseSchema = JSON.parse(fs.readFileSync(schemaDefinitionFile));

  let passed = 0;
  let failed = 0;

  filepathOrGlob = filepathOrGlob.endsWith(".json")
    ? filepathOrGlob
    : `${filepathOrGlob}/**/*.json`;

  const files = glob.sync(`${filepathOrGlob}`);

  if (files.length === 0) {
    console.error(foregroundRed, `No files found for ${filepathOrGlob}`);
    return false;
  }

  console.info(
    foregroundYellow,
    `Validating schema "${filepathOrGlob}" (${schemaDefinitionFile})`
  );

  files.forEach((file) => {
    const isValid = validateSchemaForFile(file, baseSchema);

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

if (esMain(import.meta)) {
  yargs(hideBin(process.argv))
    .usage(
      `Usage: ./scripts/validateSchemas.js <json-schema-file> <json-file-or-folder-to-validate>`
    )
    .example(
      "./scripts/validateSchemas.js schemas/prodcom.json examples/prodcom/v1.json"
    )
    .command(
      "$0",
      "Validate a schema or folder of schemas against its JSON schema definition.",
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

        let anyFailed = false;

        const schemasMap =
          schemaDefinitionFile && schemaFileOrGlob
            ? { [schemaDefinitionFile]: schemaFileOrGlob }
            : schemaDefinitionJsonToExamplesGlob;

        for (const [sFile, folderGlob] of Object.entries(schemasMap)) {
          if (!(sFile in schemaDefinitionJsonToExamplesGlob)) {
            console.error(
              foregroundRed,
              `Invalid JSON Schema Definition File ${sFile}. Schema file must be one of:`
            );
            console.dir(Object.keys(schemaDefinitionJsonToExamplesGlob));
            console.log(`Help: ./scripts/validateSchemas.js --help`);
            return;
          }

          const passed = validateSchemas(sFile, folderGlob);
          anyFailed |= !passed;
        }

        if (anyFailed) {
          process.exit(1);
        }
      }
    )
    .wrap(null)
    .parse();
}
