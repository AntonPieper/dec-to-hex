import { Base10, CreateBase10, Digits } from "./common"

export type AbsoluteI<T extends number | bigint> =
  `${T}` extends `-${infer U extends number | bigint}` ? U : T;

export type Absolute<T extends Base10> =
  CreateBase10<"", Digits<T>>;
