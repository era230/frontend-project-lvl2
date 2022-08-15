import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import _ from 'lodash';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import chooseFormatter from './formatters/index.js';

const getFilepath = (filepath) => path.resolve(cwd(), filepath);
const getData = (filepath) => readFileSync(getFilepath(filepath), 'utf-8');

const getObject = (filepath) => {
  const data = getData(filepath);
  const format = _.last(filepath.split('.'))
    .toLowerCase();
  const object = parse(format, data);
  return object;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const tree = makeTree(obj1, obj2);
  return chooseFormatter(formatName, tree);
};

export default genDiff;
