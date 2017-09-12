import crypto from 'crypto-js';
import deepClone from './deep-clone';

const hashObject = (obj) => {
  if (obj === undefined || obj === null) return obj;
  const hash = crypto.SHA256(JSON.stringify(obj));
  return hash.toString(crypto.enc.Hex);
};

const sortArrays = (array) => {
  array.sort((obj1, obj2) => {
    const hash1 = hashObject(obj1);
    const hash2 = hashObject(obj2);
    if (hash1 < hash2) { return -1; }
    if (hash1 > hash2) { return 1; }
    return 0;
  });
  return array;
};

const unifyObject = (obj) => {
  if (obj === undefined || obj === null) return obj;
  switch (obj.constructor) {
    case Array: {
      const newObj = obj.map(el => unifyObject(el));
      return sortArrays(newObj);
    }
    case Object: {
      const newObj = {};
      Object.keys(obj)
        .sort()
        .forEach((field) => {
          newObj[field] = unifyObject(obj[field]);
        });
      return newObj;
    }
    default: return obj;
  }
};

const deepEqual = (first, second) => hashObject(unifyObject(deepClone(first)))
  === hashObject(unifyObject(deepClone(second)));

export {
  deepEqual,
  hashObject,
  sortArrays,
  unifyObject,
};
