import _ from 'lodash';

const mkfile = (name, status = '', value = '') => ({
  name, status, value,
});

const mkdir = (name, children = []) => ({
  name, status: 'nested', children,
});

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

const makeTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const tree = _.sortBy(_.union([...keys1, ...keys2]))
    .map((key) => {
      if (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key])) {
        const status = getStatus(key, obj1, obj2);
        const value = getValue(status, key, obj1, obj2);
        return mkfile(key, status, value);
      }
      return mkdir(key, makeTree(obj1[key], obj2[key]));
    });
  return tree;
};

export default makeTree;
