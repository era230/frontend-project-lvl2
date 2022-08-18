import _ from 'lodash';

const defaultIndent = '    ';

const getAddIndent = (depth) => defaultIndent.repeat(depth);

const formatObject = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const lines = Object.keys(data).map(
    (key) => `${getAddIndent(depth)}${defaultIndent}${key}: ${formatObject(
      data[key],
      depth + 1,
    )}`,
  );
  return ['{', ...lines, `${getAddIndent(depth)}}`].join('\n');
};

const formatTree = (data) => {
  const iter = (tree, depth) => {
    const addIndent = getAddIndent(depth);
    const lines = tree.map((item) => {
      switch (item.status) {
        case 'nested':
          return `${addIndent}${defaultIndent}${item.name}: ${iter(item.children, depth + 1)}`;
        case 'updated':
          return `${addIndent}  - ${item.name}: ${formatObject(
            item.value1,
            depth + 1,
          )}
${addIndent}  + ${item.name}: ${formatObject(item.value2, depth + 1)}`;
        case 'added':
          return `${addIndent}  + ${item.name}: ${formatObject(item.value, depth + 1)}`;
        case 'removed':
          return `${addIndent}  - ${item.name}: ${formatObject(item.value, depth + 1)}`;
        case 'unchanged':
          return `${addIndent}${defaultIndent}${item.name}: ${formatObject(item.value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: ${item.status}`);
      }
    });
    return ['{', ...lines, `${addIndent}}`].join('\n');
  };
  return iter(data, 0);
};

export default formatTree;
