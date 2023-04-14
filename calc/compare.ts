import type {
  ToString,
  Digit,
  Sign,
  Base10,
  Digits,
  ToBase10,
} from "./common";

export type CompareLength<
  T extends unknown[],
  U extends unknown[]
> = T["length"] extends U["length"] ? "=" : "!=";

export type DigitCompareTable = [
  ["=", "<", "<", "<", "<", "<", "<", "<", "<", "<"],
  [">", "=", "<", "<", "<", "<", "<", "<", "<", "<"],
  [">", ">", "=", "<", "<", "<", "<", "<", "<", "<"],
  [">", ">", ">", "=", "<", "<", "<", "<", "<", "<"],
  [">", ">", ">", ">", "=", "<", "<", "<", "<", "<"],
  [">", ">", ">", ">", ">", "=", "<", "<", "<", "<"],
  [">", ">", ">", ">", ">", ">", "=", "<", "<", "<"],
  [">", ">", ">", ">", ">", ">", ">", "=", "<", "<"],
  [">", ">", ">", ">", ">", ">", ">", ">", "=", "<"],
  [">", ">", ">", ">", ">", ">", ">", ">", ">", "="]
];

export type DigitCompare<
  D1 extends Digit,
  D2 extends Digit
> = DigitCompareTable[D1][D2];

export type CompareDigitsWithEqualLength<
  T extends Digit[],
  U extends Digit[]
> = T extends [infer N1 extends Digit, ...infer R1 extends Digit[]]
  ? U extends [infer N2 extends Digit, ...infer R2 extends Digit[]]
    ? DigitCompare<N1, N2> extends "="
      ? CompareDigitsWithEqualLength<R1, R2>
      : DigitCompare<N1, N2>
    : "="
  : "=";
//"`
export type CompareDigits<
  T extends Digit[],
  U extends Digit[]
> =
  CompareLength<
    T,
    U
  > extends "="
  ? CompareDigitsWithEqualLength<T, U>
  : keyof U extends keyof T
    ? ">"
    : "<";

export type CompareBase10<
  T extends Base10,
  U extends Base10
> = Sign<T> extends Sign<U>
  ? Sign<T> extends ""
    ? CompareDigits<Digits<T>, Digits<U>>
    : CompareDigits<Digits<U>, Digits<T>>
  : Sign<T> extends "-"
  ? "<"
  : ">";

/**
 * Compare two numbers
 * @param T - First number
 * @param U - Second number
 * @returns "=" if T = U, ">" if T > U, "<" if T < U
 */
export type Compare<
  T extends Base10,
  U extends Base10
> = 
  T extends U
  ? "="
  : CompareBase10<T, U>;

export type CompareI<
  T extends number | bigint,
  U extends number | bigint
> =
  Compare<ToBase10<ToString<T>>, ToBase10<ToString<U>>>;

