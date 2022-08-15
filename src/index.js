import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import chooseFormatter from './formatters/index.js';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => readFileSync(getFilepath(filepath), 'utf-8');

const getObject = (filepath) => {
  const data = getData(filepath);
  const format = _.last(filepath.split('.'))
    .toLowerCase();
  const object = parse(format, data);
  return object;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = getObject(filepath1);
  const fileData2 = getObject(filepath2);
  const tree = makeTree(fileData1, fileData2);
  return chooseFormatter(formatName, tree);
};

export default genDiff;
