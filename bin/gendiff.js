#!/usr/bin/env node
import gendiff from '../src/index.js';
import { Command } from 'commander';
const program = new Command();

program
    .version('output the version number')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        gendiff(filepath1, filepath2);
    });

program.parse();