import {
  deepEqual,
  hashObject,
  sortArrays,
  unifyObject,
} from '../src/deep-compare';

describe('deep-compare', () => {
  test('should return true if two objects are the same', () => {
    const obj1 = {
      transactions: [
        {
          _id: '7zQbBy4NTNKZZzh9D',
          description: 'Com chien',
          date: 1487582666607,
          amount: 2000,
          categories: [
            {
              type: 'dining',
              desc: 'breakfast',
            },
            {
              desc: 'dinner',
              type: 'dining',
            },
          ],
        },
        {
          _id: 'X2j6GJadCKwCnrwXw',
          description: ['Com thịt bo', 'com chien'],
          date: {
            time: 1487147938333,
            month: ['12', '23'],
          },
          amount: 5000,
        },
      ],
    };
    const obj2 = {
      transactions: [
        {
          _id: 'X2j6GJadCKwCnrwXw',
          description: ['com chien', 'Com thịt bo'],
          date: {
            time: 1487147938333,
            month: ['12', '23'],
          },
          amount: 5000,
        },
        {
          _id: '7zQbBy4NTNKZZzh9D',
          description: 'Com chien',
          date: 1487582666607,
          categories: [
            {
              desc: 'dinner',
              type: 'dining',
            },
            {
              type: 'dining',
              desc: 'breakfast',
            },
          ],
          amount: 2000,
        },
      ],
    };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('should return false if two objects are different', () => {
    const obj1 = {
      transactions: [
        {
          _id: '7zQbBy4NTNKZZzh9D',
          description: 'Com chien',
          date: 1487582666607,
          categories: [
            {
              desc: 'dinner',
              type: 'dining',
            },
            {
              type: 'dining',
              desc: 'breakfast',
            },
          ],
          amount: 2000,
        },
        {
          _id: 'X2j6GJadCKwCnrwXw',
          description: ['Com thịt bo', 'com chien'],
          date: {
            time: 1487147938333,
            month: ['12', '32'],
          },
          amount: 5000,
        },
      ],
    };
    const obj2 = {
      transactions: [
        {
          _id: 'X2j6GJadCKwCnrwXw',
          description: ['com chien', 'Com thịt bo'],
          date: {
            time: 1487147938333,
            month: ['12', '23'],
          },
          amount: 5000,
        },
        {
          categories: [
            {
              type: 'dining',
              desc: 'breakfast',
            },
            {
              desc: 'dinner',
              type: 'dining',
            },
          ],
          _id: '7zQbBy4NTNKZZzh9D',
          description: 'Com chien',
          date: 1487582666607,
          amount: 2000,
        },
      ],
    };
    // console.log(JSON.stringify(unifyObject(obj1), null, 2));
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  describe('hash object', () => {
    test('should return the hash string', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(hashObject(obj)).toEqual('e6a3385fb77c287a712e7f406a451727f0625041823ecf23bea7ef39b2e39805');
    });
    test('should return null for null', () => {
      expect(hashObject(null)).toEqual(null);
    });
    test('should return undefined for undefined', () => {
      expect(hashObject(undefined)).toEqual(undefined);
    });
  });

  describe('sort array of unified objects', () => {
    test('should sort by hash', () => {
      const obj1 = { a: 1 };
      // obj1 hash: 015abd7f5cc57a2dd94b7590f04ad8084273905ee33ec5cebeae62276a97f862
      const obj2 = { a: 2 };
      // obj2 hash: 7e8059f495589fcd981232cc11d00b00da3802c01d688fa1cf1f6bed6e5bb33c
      const obj3 = { a: 3 };
      // obj3 hash: 70778ce01ad8d1a82c80a3500bee476f34651238edeb936c4a7b0161b1395169
      const obj4 = { a: 3 };

      const array = [
        obj1,
        obj2,
        obj3,
        obj4,
      ];
      expect(sortArrays(array)).toEqual([obj1, obj3, obj4, obj2]);
    });
  });

  describe('unify object', () => {
    test('should turn 2 objects with same content into same object', () => {
      const obj1 = {
        transactions: [
          {
            _id: '7zQbBy4NTNKZZzh9D',
            description: 'Com chien',
            date: 1487582666607,
            amount: 2000,
          },
          {
            _id: 'X2j6GJadCKwCnrwXw',
            description: ['Com thịt bo', 'com chien'],
            date: {
              time: 1487147938333,
              month: ['12', '23'],
            },
            amount: 5000,
          },
        ],
      };
      const obj2 = {
        transactions: [
          {
            _id: 'X2j6GJadCKwCnrwXw',
            description: ['com chien', 'Com thịt bo'],
            date: {
              time: 1487147938333,
              month: ['12', '23'],
            },
            amount: 5000,
          },
          {
            _id: '7zQbBy4NTNKZZzh9D',
            description: 'Com chien',
            date: 1487582666607,
            amount: 2000,
          },
        ],
      };
      expect(unifyObject(obj1)).toEqual(unifyObject(obj2));
    });
    test('should return null for null', () => {
      expect(unifyObject(null)).toEqual(null);
    });
    test('should return undefined for undefined', () => {
      expect(unifyObject(undefined)).toEqual(undefined);
    });
  });
});
