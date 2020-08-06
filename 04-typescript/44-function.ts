const add = (n: number, m: number): number => n + m;
console.log(add(1, 3));

function subtr(n: number, m: number): number {
  return n - m;
}
console.log(subtr(5, 4));

const hello = ():void => {console.log('Hello!')};
console.log(hello());

const aloha = () => 'Aloha!';
type Greeting = ReturnType<typeof aloha>;
const chao = (): Greeting => 'Chao!';
console.log(chao());
