const deepClone = (obj) => {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (obj.constructor === Array) {
    return obj.map(el => deepClone(el));
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((key) => {
      newObj[key] = deepClone(obj[key]);
    });
    return newObj;
  }
  return obj;
};
  
export default deepClone;