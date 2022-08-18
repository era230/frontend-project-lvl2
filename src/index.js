import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(getAbsolutePath(filepath), 'utf-8');

const getData = (filepath) => {
  const fileData = readFile(filepath);
  const extencion = _.last(filepath.split('.')).toLowerCase();
  const object = parse(extencion, fileData);
  return object;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = getData(filepath1);
  const fileData2 = getData(filepath2);
  const tree = makeTree(fileData1, fileData2);
  return format(formatName, tree);
};

export default genDiff;
