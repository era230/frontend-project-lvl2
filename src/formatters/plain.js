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

const formatPlain = (coll) => {
  const iter = (data, prefixNames, depth) => {
    const lines = data.map((item) => {
      while (prefixNames.length !== depth) {
        prefixNames.pop();
      }
      if (item.type === 'node-leaf') {
        const prefixName = prefixNames.join('');
        if (item.status === 'added') {
          return `Property '${prefixName}${item.name}' was added with value: ${getValue(item.value)}`;
        }
        if (item.status === 'removed') {
          return `Property '${prefixName}${item.name}' was removed`;
        }
        if (item.status === 'updated') {
          return `Property '${prefixName}${item.name}' was updated. From ${getValue(item.value[0])} to ${getValue(item.value[1])}`;
        }
        if (item.status === 'un-updated') {
          return null;
        }
      }
      prefixNames.push(`${item.name}.`);
      return iter(item.children, prefixNames, depth + 1);
    });
    return lines.filter((item) => item !== null)
      .join('\n');
  };
  return iter(coll, [], 0);
};

export default formatPlain;
