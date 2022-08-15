import _ from 'lodash';

const defaultIndent = '    ';

const getIndent = (status) => {
  switch (status) {
    case 'added':
      return '  + ';
    case 'removed':
      return '  - ';
    case 'unchanged':
    case 'updated':
      return defaultIndent;
    default:
      throw new Error('Unknown status');
  }
};

const getAddIndent = (depth) => {
  const additionalIndent = defaultIndent.repeat(depth);
  return additionalIndent;
};

const formatObject = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const lines = Object.keys(data)
    .map((key) => `${getAddIndent(depth)}${defaultIndent}${key}: ${formatObject(data[key], depth + 1)}`);
  return [
    '{',
    ...lines,
    `${getAddIndent(depth)}}`,
  ].join('\n');
};

const formatTree = (data) => {
  const iter = (tree, depth) => {
    const lines = tree.map((item) => {
      switch (item.status) {
        case 'nested':
          return `${getAddIndent(depth)}${defaultIndent}${item.name}: ${iter(item.children, depth + 1)}`;
        case 'updated':
          return `${getAddIndent(depth)}  - ${item.name}: ${formatObject(item.value[0], depth + 1)}
${getAddIndent(depth)}  + ${item.name}: ${formatObject(item.value[1], depth + 1)}`;
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${getAddIndent(depth)}${getIndent(item.status)}${item.name}: ${formatObject(item.value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: ${item.status}`);
      }
    });
    return [
      '{',
      ...lines,
      `${getAddIndent(depth)}}`,
    ].join('\n');
  };
  return iter(data, 0);
};

export default formatTree;
