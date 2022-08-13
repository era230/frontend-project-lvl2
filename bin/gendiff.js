#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';
import chooseFormatter from '../src/formatters/index.js';

const program = new Command();

program
  .version('0.0.1', '-v, --VERSION', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish', chooseFormatter)
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const formatter = chooseFormatter(options.format);
    console.log(options.format);
    console.log(chooseFormatter(options.format));
    console.log(genDiff(filepath1, filepath2, formatter));
  });

program.parse();
