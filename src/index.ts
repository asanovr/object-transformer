import {isObject} from './helpers';

type Transformed = Record<string, any>;

export const transform = (object:Transformed, transformer: (value: any, key: string|number, object:Transformed) => any) => {
  if (!isObject(object)) {
    return object;
  }

  if (isObject(object)) {
    for (const [key, value] of Object.entries(object)) {
      const newValue = transformer(value, key, object);

      if (newValue !== value) {
        object[key] = newValue;
        continue;
      }

      if (isObject(value)) {
        object[key] = transform(value, transformer);
      }
    }
  }

  return object;
}
