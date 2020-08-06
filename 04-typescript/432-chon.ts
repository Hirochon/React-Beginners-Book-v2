const obj = {a: 1, b: 2};
console.log(obj);   // {a: 1, b: 2}

obj.b = 5;  // 変数自体の再代入は出来ないけれど、各要素の上書きや追加はできちゃう！
console.log(obj);   // {a: 1, b: 5}

const arr1: ReadonlyArray<string> = ['foo', 'bar'];
const arr2: readonly string[] = ['foo', 'bar']; // ↑の書き方と結果は同じ

// arr1[0] = 'buz';    // 書いた時点で怒られる
// arr2[1] = 'buz';    // 書いた時点で怒られる

const obj1: Readonly<{foo: number}> = {foo: 2};

// obj1.foo = 8;   // 書いた時点で怒られる

// 下記のように変更したオブジェクトが必要な場合はスプレッド構文を使おう！被っている部分は書き換わる
const obj2 = {red: 'ff0000', green: '00ff00'};
const newObj = {...obj2, green: '00ee00', blue: '0000ff'};
console.log(newObj);
