import deepClone from '../src/deep-clone';

describe('deep-clone', () => {
  test('should clone object into an identical one', () => {
    const obj = {
      array: [
        {
          num: 0,
          object: {
            subNum: 1,
          },
          str: 'ahihi',
        },
        {
          num: 1,
          object: {
            subNum: 2,
          },
          str: 'ahihi1',
        },
      ],
    };
    expect(deepClone(obj)).toEqual(obj);
  });
  test('should not modify original object if the clone is changed', () => {
    const obj = {
      array: [
        {
          num: 0,
          object: {
            subNum: 1,
          },
          str: 'ahihi',
        },
        {
          num: 1,
          object: {
            subNum: 2,
          },
          str: 'ahihi1',
        },
      ],
    };
    const newObj = deepClone(obj);
    newObj.newKey = 'newValue';
    expect(obj).toEqual({
      array: [
        {
          num: 0,
          object: {
            subNum: 1,
          },
          str: 'ahihi',
        },
        {
          num: 1,
          object: {
            subNum: 2,
          },
          str: 'ahihi1',
        },
      ],
    });
  });
  test('should return the same object if the input is null or undefined', () => {
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });
  test('should return the same object if the input is primitive type', () => {
    expect(deepClone(1)).toBe(1);
  });
});
