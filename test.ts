import { Expect, Equal } from "@type-challenges/utils"
import type { DecToHex } from "./decToHex"

// >>>--- test cases ---<<<
type A1 = DecToHex<0x173>;
type B1 = "173";
type C1 = Expect<Equal<A1, B1>>;

type A2 = DecToHex<0x1afaf41c>;
type B2 = "1afaf41c";
type C2 = Expect<Equal<A2, B2>>;

type A3 = DecToHex<0x164>;
type B3 = "164";
type C3 = Expect<Equal<A3, B3>>;

type A4 = DecToHex<-0x999fffaa>;
type B4 = "-999fffaa";
type C4 = Expect<Equal<A4, B4>>;

type A5 = DecToHex<never>;
type B5 = never;
type C5 = Expect<Equal<A5, B5>>;

type A6 = DecToHex<number>;
type B6 = string;
type C6 = Expect<Equal<A5, B5>>;
