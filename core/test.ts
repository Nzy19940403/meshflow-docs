type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) 
  ? I 
  : never;

// 第二步：实现打平逻辑
type DeepFlatten<T> = UnionToIntersection<{
  [K in keyof T & string]: T[K] extends object
    ? {
        // 关键点：利用 'as' 进行键名重映射 (Key Remapping)
        // 将子层的键 P 重新映射为 'K.P'
        [P in keyof DeepFlatten<T[K]> as `${K}.${P & string}`]: DeepFlatten<T[K]>[P]
      }
    : { [P in K]: T[K] } // 叶子节点，直接保持原样
}[keyof T & string]>;


type Schema = {
    user: {
      name: string;
      age: number;
    };
    id: number;
  };
  
  type Flat =  DeepFlatten<Schema> ;