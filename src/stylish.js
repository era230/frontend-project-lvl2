import _ from 'lodash';

const defaultIndent = '    ';

const getIndent = (status) => {
  switch (status) {
    case 'added':
      return '  + ';
    case 'deleted':
      return '  - ';
    case 'unchanged':
    case 'changed':
      return defaultIndent;
    default:
      throw new Error('Unknown status');
  }
};

const getAddIndent = (depth) => {
  if (depth === 0) {
    return '';
  }
  const additionalIndent = defaultIndent.repeat(depth);
  return additionalIndent;
};

const getBracketIndent = (depth) => {
  const bracketIndent = defaultIndent.repeat(depth);
  return bracketIndent;
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
    `${getBracketIndent(depth)}}`,
  ].join('\n');
};

const formatTree = (coll) => {
  const iter = (data, depth) => {
    const lines = data.map((item) => {
      if (item.type === 'node-leaf') {
        if (item.status === 'changed') {
          return `${getAddIndent(depth)}  - ${item.name}: ${formatObject(item.value[0], depth + 1)}
${getAddIndent(depth)}  + ${item.name}: ${formatObject(item.value[1], depth + 1)}`;
        }
        return `${getAddIndent(depth)}${getIndent(item.status)}${item.name}: ${formatObject(item.value, depth + 1)}`;
      }
      return `${getAddIndent(depth)}${defaultIndent}${item.name}: ${iter(item.children, depth + 1)}`;
    });
    return [
      '{',
      ...lines,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(coll, 0);
};

export default formatTree;
