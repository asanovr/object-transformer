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
  const transformed = transform(object, () => {
    return undefined;
  });

  console.log(transformed);

  expect(transformed.test).toBe(undefined);
});

test('change value', () => {
  const object = {test: 'test'};
  const transformed = transform(object, value => value.toUpperCase());

  expect(transformed.test).toBe('TEST');
});

test('the original object should not change', () => {
  const object = {test: 'test'};
  const transformed = transform(object, value => value.toUpperCase());

  expect(transformed.test).not.toBe(object.test);
});

test('change deep value', () => {
  const object = {test: {deepValue: 'test'}};
  const transformed = transform(object, value => typeof value === 'string' ? value.toUpperCase() : value);

  expect(transformed.test.deepValue).toBe('TEST');
});

test('change very deep value', () => {
  const object = {test: {deepObject: {value: 'deepObjectValue'}}};
  const transformed = transform(object, value => typeof value === 'string' ? value.toUpperCase() : value);

  expect(transformed.test.deepObject.value).toBe('DEEPOBJECTVALUE');
});
