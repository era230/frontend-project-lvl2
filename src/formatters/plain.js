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

const formatPlain = (data, names = [], depth = 0) => {
  const lines = data.map((item) => {
    const resultNames = [...names, item.name];
    switch (item.status) {
      case 'nested':
        return formatPlain(item.children, resultNames, depth + 1);
      case 'added':
        return `Property '${resultNames.join('.')}' was added with value: ${getValue(item.value)}`;
      case 'removed':
        return `Property '${resultNames.join('.')}' was removed`;
      case 'updated':
        return `Property '${resultNames.join('.')}' was updated. From ${getValue(item.value[0])} to ${getValue(item.value[1])}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown status: ${item.status}`);
    }
  });
  return lines.filter((item) => item !== null)
    .join('\n');
};

export default formatPlain;
