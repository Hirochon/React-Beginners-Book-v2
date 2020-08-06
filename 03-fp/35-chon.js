// class Counter {
//   constructor(initialCount){
//     this.c = initialCount;
//   }

//   increment(){
//     return this.c++;
//   }
// }

// const counter = new Counter(1);
// console.log(counter.increment(), counter.increment(), counter.increment());

// クロージャ(親関数スコープの変数を参照する関数)

const counterMaker = (initialCount) => {
  let c = initialCount;
  const increment = () => c++;
  return increment;
}

const count = counterMaker(1);
console.log(count(), count(), count());