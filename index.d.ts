declare type Transformed = Record<string, any>;
export declare const transform: (object: Transformed, transformer: (value: any, key: string | number, object: Transformed) => any) => Transformed;
export {};
