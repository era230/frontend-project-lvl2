import _ from 'lodash';

const getStatus = (key, object1, object2) => {
  if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
    return 'nested';
  }
  if (!Object.hasOwn(object1, key)) {
    return 'added';
  } if (!Object.hasOwn(object2, key)) {
    return 'removed';
  }
  return object1[key] === object2[key] ? 'unchanged' : 'updated';
};

const makeTree = (fileData1, fileData2) => {
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const tree = _.sortBy(_.union(keys1, keys2))
    .map((name) => {
      const status = getStatus(name, fileData1, fileData2);
      switch (status) {
        case 'nested':
          return { name, status, children: makeTree(fileData1[name], fileData2[name]) };
        case 'added':
          return { name, status, value: fileData2[name] };
        case 'removed':
        case 'unchanged':
          return { name, status, value: fileData1[name] };
        case 'updated':
          return { name, status, value: [fileData1[name], fileData2[name]] };
        default:
          throw new Error(`Unknown value: ${status}`);
      }
    });
  return tree;
};

export default makeTree;
