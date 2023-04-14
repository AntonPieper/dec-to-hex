export type ToNumber<T extends string> = T extends `${infer N extends
  | number
  | bigint}`
  ? N
  : never;

export type ToString<T extends number | bigint> = `${T}`;

export type Base10Digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export type Digit = Base10Digits[number];

export type Base10 = { sign: "-" | ""; digits: Digit[] };
export type CreateBase10<S extends "-" | "", N extends Digit[]> = {
  sign: S;
  digits: N;
};

export type ToDigits<
  T extends string,
  Acc extends Digit[] = []
> = T extends `${infer N extends Digit}${infer R}`
  ? ToDigits<R, [...Acc, N]>
  : Acc;

export type ToBase10<T extends string> =
  T extends `-${infer R}`
  ? CreateBase10<"-", ToDigits<R>>
  : CreateBase10<"", ToDigits<T>>;

export type FromDigits<T, Acc extends string = ""> = T extends [
  infer N extends Digit,
  ...infer R
]
  ? FromDigits<R, `${Acc}${N}`>
  : Acc;

export type Sign<T extends Base10> = T["sign"];
export type InvertSign<T extends Base10> = Sign<T> extends "-" ? "" : "-";
export type MulSign<S1 extends "-" | "", S2 extends "-" | ""> = S1 extends "-"
  ? S2 extends "-"
    ? ""
    : "-"
  : S2 extends "-"
  ? "-"
  : "";

export type Digits<T extends Base10> = T["digits"];

export type FromBase10<T extends Base10> = `${Sign<T>}${FromDigits<
  Digits<T>
>}`;

export type TrimZeros<T extends Digit[]> = T extends ["0"]
  ? ["0"]
  : T extends ["0", ...infer R extends Digit[]]
  ? TrimZeros<R>
  : T;

export type Normalize<
  T extends Base10,
  Trim extends Digit[] = TrimZeros<Digits<T>>
> = Trim extends ["0"]
  ? CreateBase10<"", Trim>
  : CreateBase10<Sign<T>, Trim>;
