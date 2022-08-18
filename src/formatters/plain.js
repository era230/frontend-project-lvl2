import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return data;
};

const formatPlain = (data) => {
  const iter = (tree, names, depth) => {
    const lines = tree.map((item) => {
      const resultNames = [...names, item.name];
      const resultName = resultNames.join('.');
      switch (item.status) {
        case 'nested':
          return iter(item.children, resultNames, depth + 1);
        case 'added':
          return `Property '${resultName}' was added with value: ${getValue(item.value)}`;
        case 'removed':
          return `Property '${resultName}' was removed`;
        case 'updated':
          return `Property '${resultName}' was updated. From ${getValue(
            item.value1,
          )} to ${getValue(item.value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown status: ${item.status}`);
      }
    });
    return lines.filter((item) => item !== null).join('\n');
  };
  return iter(data, [], 0);
};

export default formatPlain;
