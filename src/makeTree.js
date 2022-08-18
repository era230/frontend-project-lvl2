import _ from 'lodash';

const getStatus = (key, fileData1, fileData2) => {
  if (_.isPlainObject(fileData1[key]) && _.isPlainObject(fileData2[key])) {
    return 'nested';
  }
  if (!Object.hasOwn(fileData1, key)) {
    return 'added';
  }
  if (!Object.hasOwn(fileData2, key)) {
    return 'removed';
  }
  if (fileData1[key] !== fileData2[key]) {
    return 'updated';
  }
  if (fileData1[key] === fileData2[key]) {
    return 'unchanged';
  }
  throw new Error('Getting status error');
};

const makeTree = (fileData1, fileData2) => {
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const tree = _.sortBy(_.union(keys1, keys2)).map((key) => {
    const status = getStatus(key, fileData1, fileData2);
    switch (status) {
      case 'nested':
        return {
          name: key,
          status,
          children: makeTree(fileData1[key], fileData2[key]),
        };
      case 'added':
        return { name: key, status, value: fileData2[key] };
      case 'removed':
      case 'unchanged':
        return { name: key, status, value: fileData1[key] };
      case 'updated':
        return {
          name: key,
          status,
          value1: fileData1[key],
          value2: fileData2[key],
        };
      default:
        throw new Error(`Unknown ${status}`);
    }
  });
  return tree;
};

export default makeTree;
