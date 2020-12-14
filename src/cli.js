import arg from "arg";
import inquirer from "inquirer";
import { createRestAPI } from "./main";

function parseArguments(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--use-npm": Boolean,
      "-g": "--git",
      "-y": "--yes",
    },
    { argv: rawArgs.slice(2) }
  );

  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    npm: args["--use-npm"] || false,
    template: args._[0],
  };
}

async function promptMissingOptions(options) {
  const defaultTemplate = "Javascript";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!questions.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["JavaScript", "TypeScript"],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArguments(args);
  options = await promptMissingOptions(options);
  await createRestAPI(options);
}
