import type { AddDigits } from "./addition-digits";
import type {
  ToString,
  Sign,
  InvertSign,
  Normalize,
  Base10,
  CreateBase10,
  Digits,
  ToBase10,
} from "./common";
import type { CompareDigits } from "./compare";
import type { SubDigits } from "./substraction-digits";

type AddBase10<
  T extends Base10,
  U extends Base10
> = 
  Sign<T> extends Sign<U>
  ? CreateBase10<Sign<T>, AddDigits<Digits<T>, Digits<U>>>
  : CompareDigits<Digits<T>, Digits<U>> extends 1
    ? CreateBase10<Sign<T>, SubDigits<Digits<T>, Digits<U>>>
    : CreateBase10<InvertSign<T>, SubDigits<Digits<U>, Digits<T>>>;

export type AddI<
  T extends number | bigint,
  U extends number | bigint
> =
  Add<
    ToBase10<ToString<T>>,
    ToBase10<ToString<U>>
  >
export type Add<
  T extends Base10,
  U extends Base10
> =
  Normalize<AddBase10<T, U>>;
