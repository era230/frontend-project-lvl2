import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';
import parse from './parsers.js';

const getObject = (filepath) => {
  const getFixturePath = path.resolve(cwd(), filepath);
  const data = readFileSync(getFixturePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();
  const object = parse(data, extension);
  return object;
};

const mkfile = (name, status = '', value = '') => ({
  name, type: 'node-leaf', status, value,
});

const mkdir = (name, children = []) => ({
  name, type: 'node-internal', children,
});

const getStatus = (key, object1, object2) => {
  let result = '';
  if (!Object.hasOwn(object1, key)) {
    result = 'added';
  } else if (!Object.hasOwn(object2, key)) {
    result = 'deleted';
  } else {
    result = object1[key] === object2[key] ? 'unchanged' : 'changed';
  }
  return result;
};

const getValue = (status, key, object1, object2) => {
  switch (status) {
    case 'added':
      return object2[key];
    case 'deleted':
      return object1[key];
    case 'unchanged':
      return object1[key];
    case 'changed':
      return { valueDel: object1[key], valueAdd: object2[key] };
    default:
      throw new Error(`Unknown value: ${status}`);
  }
};

const gendiff = (filepath1, filepath2) => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const result = _.sortBy(_.union([...keys1, ...keys2]))
      .map((key) => {
        if (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key])) {
          const status = getStatus(key, obj1, obj2);
          return mkfile(key, status, getValue(status, key, obj1, obj2));
        }
        return mkdir(key, iter(obj1[key], obj2[key]));
      });
    return result;
  };
  return iter(object1, object2);
};

export default gendiff;

console.log(gendiff('../__fixtures__/file3.json', '../__fixtures__/file4.json'));
