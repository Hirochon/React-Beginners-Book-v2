// 辞書型の型付け
const john: {name: string, age: number} = {name: 'John', age: 25};
console.log(john);

// interfaceを使うと二度も書かなくて良い！
interface User {
    name: string;
    age?: number;
}
const jane: User = {name: 'Jane', age: 27};
const jack: User = {name: 'Jack'};
console.log(jane, jack)

// typeはinterfaceで定義したものを継承する感じ！
type Person = User;
const rick: Person = {name: 'Rick', age: 31};
console.log(rick);

interface Foo {hoge?: number, fuga: string};
interface Bar {hugo: number};
interface Buz {piyo: string};

// 本来の使い方は↓こんなやつ
type FooBar1 = Foo&Bar; // {hoge: number, fuga: string}
type FooBar2 = Foo|Bar; // {hoge?: number, fuga: string} or {hoge: number}
type FooBuz1 = Foo&Buz; // {hoge?: number, fuga: string, piyo: string}
type FooBuz2 = Foo|Buz; // {hoge?: number, fuga: string} or {piyo: string}
type BarFooBuz = Bar & (Foo|Buz);   // {hoge: number, fuga: string} or {hoge: number, piyo: string}

// 一方でinterfaceではこんな挙動も見られる
interface User2 {name: string}
interface User2 {age: number}
interface User2 {gender: 'm' | 'f'}
const user: User2 = {name: 'jane', age: 27, gender: 'f'};
