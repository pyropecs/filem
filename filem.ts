#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
//create file

const program = new Command();
program
  .name("filem")
  .description(
    `${chalk.blue(
      "a cli file manager so it is easy to manipulate files and folders without bash script"
    )}`
  )
  .version("1.0.0");

program
  .command("create")
  .description(`${chalk.red("requires file name with extension")}`)
  .argument("<string>", "enter the filename with extension")
  .action((str) => {
    if (fs.existsSync(str)) {
      console.log(chalk.blue("file is already exists"));
    } else {
      const createStream = fs.createWriteStream(path.resolve(__dirname, str));
      createStream.end();
    }
  });
//create file and add content to it

program
  .command("add ")
  .description(
    `${chalk.green(
      "create a file and other file content or content will be added to it"
    )}`
  )
  .argument(
    "[names...]",
    "enter the filename with option -f or type the content you want to include in "
  )
  .option(
    "-f,--filename <string...>",
    "enter the file name you want to write in new folder"
  )
  .action((str, options) => {
    if (!options.filename) {
      if (!fs.existsSync(options.filename)) {
        console.log(
          `${chalk.red(
            "file is not found.... check the spelling or check it exist in the document "
          )}`
        );
      } else {
        fs.readFile(options.filename, (err, data) => {
          if (err) {
            console.log(`${chalk.red(err)}`);
          } else {
            fs.writeFile(str[0], data, (err) => {
              console.log(`${chalk.red(err)}`);
            });
          }
        });
      }
    }
  });
program.parse();
