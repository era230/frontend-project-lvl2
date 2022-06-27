#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
    .version('output the version number')
    .description('Compares two configuration files and shows a difference.')

program.parse();