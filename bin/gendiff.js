#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', '[type] output format', 'stylish')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath, option) => {
    const result = gendiff(firstPath, secondPath, option.format);
    console.log(result);
  });

program.parse(process.argv);
