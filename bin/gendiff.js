#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';
import formatTree from '../src/stylish.js';

const program = new Command();

program
  .version('0.0.1', '-v, --VERSION', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'stylish') {
      console.log(gendiff(filepath1, filepath2, formatTree));
    }
  });

program.parse();
