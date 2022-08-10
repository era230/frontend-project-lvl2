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

const formatPlain = (data, prefixNames = [], depth = 0) => {
  const lines = data.map((item) => {
    while (prefixNames.length !== depth) {
      prefixNames.pop();
    }
    if (item.type === 'nested') {
      prefixNames.push(`${item.name}.`);
      return formatPlain(item.children, prefixNames, depth + 1);
    }
    const prefixName = prefixNames.join('');
    switch (item.status) {
      case 'added':
        return `Property '${prefixName}${item.name}' was added with value: ${getValue(item.value)}`;
      case 'removed':
        return `Property '${prefixName}${item.name}' was removed`;
      case 'updated':
        return `Property '${prefixName}${item.name}' was updated. From ${getValue(item.value[0])} to ${getValue(item.value[1])}`;
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
