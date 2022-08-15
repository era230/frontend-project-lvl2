import _ from 'lodash';

const defaultIndent = '    ';

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
          return `${getAddIndent(depth)}  + ${item.name}: ${formatObject(item.value, depth + 1)}`;
        case 'removed':
          return `${getAddIndent(depth)}  - ${item.name}: ${formatObject(item.value, depth + 1)}`;
        case 'unchanged':
          return `${getAddIndent(depth)}${defaultIndent}${item.name}: ${formatObject(item.value, depth + 1)}`;
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
