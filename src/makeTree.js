import _ from 'lodash';

const makeTree = (fileData1, fileData2) => {
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const tree = _.sortBy(_.union(keys1, keys2)).map((key) => {
    if (_.isPlainObject(fileData1[key]) && _.isPlainObject(fileData2[key])) {
      return {
        name: key,
        status: 'nested',
        children: makeTree(fileData1[key], fileData2[key]),
      };
    }
    if (!Object.hasOwn(fileData1, key)) {
      return { name: key, status: 'added', value: fileData2[key] };
    }
    if (!Object.hasOwn(fileData2, key)) {
      return { name: key, status: 'removed', value: fileData1[key] };
    }
    if (fileData1[key] !== fileData2[key]) {
      return {
        name: key,
        status: 'updated',
        value1: fileData1[key],
        value2: fileData2[key],
      };
    }
    if (fileData1[key] === fileData2[key]) {
      return { name: key, status: 'unchanged', value: fileData1[key] };
    }
    throw new Error('Unknown status');
  });
  return tree;
};

export default makeTree;
