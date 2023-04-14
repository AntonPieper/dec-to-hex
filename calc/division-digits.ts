import { Base10Digits, Digit, TrimZeros } from "./common";
import { CompareDigits } from "./compare";
import { AddDigits } from "./addition-digits";
import { SubDigits } from "./substraction-digits";
export type CreateDivModResult<Quotient, Remainder> = {
  Quotient: Quotient;
  Remainder: Remainder
};
export type DivModDigitsResult<
  Quotient extends Digit[] = Digit[],
  Remainder extends Digit[] = Digit[]
> = CreateDivModResult<Quotient, Remainder>;
export type DivModDigitResult<
  Quotient extends Digit = Digit,
  Remainder extends Digit[] = Digit[]
> = CreateDivModResult<Quotient, Remainder>;
export type Rest<T extends Digit[]> =
  T extends [
    Digit,
    ...infer R extends Digit[]
  ]
  ? R
  : never;

type TruncateWith<
  T extends Digit[],
  U extends Digit[],
  Acc extends Digit[] = []
> =
  U extends []
  ? [T, Acc]
  : T extends [
      infer D extends Digit, ...infer DR extends Digit[]
    ]
    ? TruncateWith<DR, Rest<U>, [...Acc, D]>
    : [T, Acc];

type DivModByDigit<
  D extends Digit[],
  M extends Digit[],
  Mul extends Digit[] = ["0"],
  IterTable extends Digit[] = Base10Digits,
  NextMul extends Digit[] = AddDigits<M, Mul>,
  Comp = CompareDigits<D, NextMul>
> =
  IterTable extends [
    infer Iteration extends Digit,
    ...infer Next extends Digit[]
  ]
  ? Comp extends "="
  ? DivModDigitResult<Next[0], ["0"]>
  : Comp extends ">"
  ? DivModByDigit<D, M, NextMul, Next>
  : DivModDigitResult<Iteration, SubDigits<D, Mul>>
  : never;

/**
 * compute the long division of a number by a divisor
 * @param A the Numerator Cut after M digits
 * @param D the Numerator Cut with M first digits
 * @param M the Divisor
 * @param Q the Quotient
 * @see https://en.wikipedia.org/wiki/Long_division#Algorithm_for_arbitrary_base
 */
export type DivModBase10Algorithm<
  A extends Digit[],
  D extends Digit[],
  M extends Digit[],
  Q extends Digit[] = []
> =
  DivModByDigit<D, M> extends
    DivModDigitResult<infer B, infer R>
  ? A extends [
      infer A1 extends Digit,
      ...infer AR extends Digit[]
    ]
    ? DivModBase10Algorithm<
        AR,
        TrimZeros<[...R, A1]>,
        M,
        [...Q, B]
      >
    : DivModDigitsResult<[...Q, B], R>
  : never;

export type DivModDigits<
  N extends Digit[],
  M extends Digit[]
> =
  TruncateWith<
    N,
    M
  > extends [
    infer A extends Digit[],
    infer D extends Digit[]
  ]
  ? DivModBase10Algorithm<A, D, M>
  : never;

export type DivDigits<
  N extends Digit[],
  M extends Digit[]
> =
  DivModDigits<N, M>["Quotient"];
export type ModDigits<
  N extends Digit[],
  M extends Digit[]
> = DivModDigits<N, M>["Remainder"]
