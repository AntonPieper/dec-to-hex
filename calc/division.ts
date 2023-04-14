import {
  Normalize,
  Sign,
  MulSign,
  CreateBase10,
  Base10,
  Digits,
  ToBase10,
  ToString,
} from "./common";
import type {
  DivDigits,
  DivModDigits,
  CreateDivModResult,
  DivModDigitsResult,
  ModDigits
} from "./division-digits";

export type DivModResult<
  Quotient extends Base10 = Base10,
  Remainder extends Base10 = Base10
> = CreateDivModResult<Quotient, Remainder>;

export type DivBase10<
  T extends Base10,
  U extends Base10
> =
  CreateBase10<
    MulSign<Sign<T>, Sign<U>>,
    DivDigits<Digits<T>, Digits<U>>
  >;

export type Div<
  T extends Base10,
  U extends Base10
> =
  Normalize<
    DivBase10<T, U>
  >;

export type DivI<
  T extends number | bigint,
  U extends number | bigint
> =
  Div<
    ToBase10<ToString<T>>,
    ToBase10<ToString<U>>
  >;

export type ModBase10<
  T extends Base10,
  U extends Base10
> =
  CreateBase10<
    Sign<T>,
    ModDigits<Digits<T>, Digits<U>>
  >;

export type Mod<
  T extends Base10,
  U extends Base10
> =
  Normalize<
    ModBase10<T, U>
  >;

export type ModI<
  T extends number | bigint,
  U extends number | bigint
> =
  Mod<
    ToBase10<ToString<T>>,
    ToBase10<ToString<U>>
  >;

export type DivMod<
  T extends Base10,
  U extends Base10
> =
  DivModDigits<Digits<T>, Digits<U>> extends
  DivModDigitsResult<
    infer Quotient,
    infer Remainder
  >
  ? {
    Quotient:
      Normalize<
        CreateBase10<
          MulSign<Sign<T>, Sign<U>>,
          Quotient
        >
      >,
    Remainder:
      Normalize<
        CreateBase10<
          Sign<T>,
          Remainder
        >
      >
  }
  : never;

export type DivModI<
  T extends number | bigint,
  U extends number | bigint
> =
  DivMod<
    ToBase10<ToString<T>>,
    ToBase10<ToString<U>>
  >;

