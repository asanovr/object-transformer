import {isObject} from './helpers';

type Transformed = Record<string, any>;

export const transform = (object:Transformed, transformer: (value: any, key: string|number, object:Transformed) => any):Transformed => {
  const newObject:Transformed = {}

  if (!isObject(object)) {
    return object;
  }

  if (isObject(object)) {
    for (const [key, value] of Object.entries(object)) {
      const newValue = transformer(value, key, object);

      if (newValue !== value) {
        if (newValue !== undefined) {
          newObject[key] = newValue;
        }

        continue;
      }

      if (isObject(value)) {
        newObject[key] = transform(value, transformer);
      }
    }
  }

  return newObject;
}
