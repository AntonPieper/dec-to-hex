import {
  DivMod,
  DivModResult
} from './calc/division'
import {
  Base10,
  Digits,
  FromBase10,
  ToBase10,
  ToString
} from './calc/common';

export type DecToHex<T extends number> = 
  number extends T
  ? string
  : T extends never
    ? never
    : `${T}` extends `-${infer S}`
      ? `-${_DecToHex<ToBase10<S>>}`
    : _DecToHex<ToBase10<ToString<T>>>;

type _10 = ToBase10<"16">;
type HexMap = [
  "0", "1", "2", "3",
  "4", "5", "6", "7",
  "8", "9", "a", "b",
  "c", "d", "e", "f"
];
type _DecToHex<
  T extends Base10,
  Acc extends string = ""
> =
  DivMod<T, _10> extends
    DivModResult<
      infer Quotient,
      infer Remainder
    >
  ? Digits<Quotient> extends ["0"]
    ? `${ToIndex<Remainder>}${Acc}`
    : _DecToHex<
        Quotient,
        `${ToIndex<Remainder>}${Acc}`
      >
  : never;

type ToIndex<T extends Base10> =
  FromBase10<T> extends
    `${infer K extends number}`
  ? HexMap[K]
  : "";

