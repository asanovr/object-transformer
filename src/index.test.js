import {transform} from './index.ts';
import {isObject} from './helpers';

test('isObject', () => {
  const result1 = isObject({});
  const result2 = isObject([]);
  const result3 = isObject(1);
  const result4 = isObject(undefined);
  const result5 = isObject(null);

  expect(result1).toBe(true);
  expect(result2).toBe(true);
  expect(result3).toBe(false);
  expect(result4).toBe(false);
  expect(result5).toBe(false);
});

test('undefined', () => {
  const transformed = transform(undefined);

  expect(transformed).toBe(undefined);
});

test('not an object', () => {
  const transformed = transform(1, value => value);

  expect(transformed).toBe(1);
});


test('delete value', () => {
  const object = {test: 1};

 transform(object, (value, key, object) => {
   delete object[key];
 });

  expect(object.test).toBe(undefined);
});

test('change value', () => {
  const object = {test: 'test'};
  transform(object, value => value.toUpperCase());

  expect(object.test).toBe('TEST');
});

test('change deep value', () => {
  const object = {test: {deepValue: 'test'}};
  transform(object, value => typeof value === 'string' ? value.toUpperCase() : value);

  expect(object.test.deepValue).toBe('TEST');
});

test('change very deep value', () => {
  const object = {test: {deepObject: {value: 'deepObjectValue'}}};
  transform(object, value => typeof value === 'string' ? value.toUpperCase() : value);

  expect(object.test.deepObject.value).toBe('DEEPOBJECTVALUE');
});


test('same as original', () => {
  const object = {
    name: 'Test',
    date: new Date,
    blob: new Blob(),
    arrayOfObjects: [
      {name: 'Test'},
      {name: 'Test'},
      {name: 'Test'},
    ],
    test: {
      deepObject: {
        value: 'deepObjectValue'
      }
    }
  };

  const simpleClone = {
    ...object
  }

  transform({...object}, value => value);

  expect(simpleClone).toStrictEqual(object);
});
