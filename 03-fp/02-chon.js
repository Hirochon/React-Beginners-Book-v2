const arr = [1,2,3,4,5,6,7,8];

console.log(arr.map(n => n*2)); // [2, 4, 6, 8, 10, 12, 14, 16] 対象の配列の要素を加工→配列の作成
console.log(arr.filter(n => n%3 === 0));  // [3, 6] 条件に合うリスト作成
console.log(arr.find(n => n > 4));  // 5 条件に適合した要素を1つだけ取り出す。なかったらundefinedを返す。
console.log(arr.every(n => n !== 0)); // true 全ての要素が条件を満たすかどうか。boolean.
console.log(arr.some(n => n > 8));  // false 条件を満たす要素が一つでもあるかどうか。boolean.
console.log(arr.includes(5)); // true 指定した要素が含まれるかどうか。boolean.
console.log(arr.reduce((n, m) => n+m)); // 36 配列の要素を与えた式で畳み込んだ値を返す。
console.log(arr.sort((n, m) => n > m ? -1 : 1)) // [8, 7, 6, 5, 4, 3, 2, 1] 各要素を与えられた比較関数(戻り値が-1の時は前に移動、０の時は移動しない、１の時は後ろに移動)によって並び替えた新しい配列を返す。
