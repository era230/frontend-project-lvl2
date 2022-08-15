import _ from 'lodash';

const getStatus = (key, object1, object2) => {
  if (!Object.hasOwn(object1, key)) {
    return 'added';
  } if (!Object.hasOwn(object2, key)) {
    return 'removed';
  }
  return object1[key] === object2[key] ? 'unchanged' : 'updated';
};

const getValue = (status, key, object1, object2) => {
  switch (status) {
    case 'added':
      return object2[key];
    case 'removed':
    case 'unchanged':
      return object1[key];
    case 'updated':
      return [object1[key], object2[key]];
    default:
      throw new Error(`Unknown value: ${status}`);
  }
};

const makeTree = (fileData1, fileData2) => {
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const tree = _.sortBy(_.union(keys1, keys2))
    .map((name) => {
      if (_.isPlainObject(fileData1[name]) && _.isPlainObject(fileData2[name])) {
        return { name, status: 'nested', children: makeTree(fileData1[name], fileData2[name]) };
      }
      const status = getStatus(name, fileData1, fileData2);
      const value = getValue(status, name, fileData1, fileData2);
      return { name, status, value };
    });
  return tree;
};

export default makeTree;
