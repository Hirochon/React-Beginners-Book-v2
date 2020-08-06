const hot = (ex, fn) => n => fn(n + ex);  // plusOneDoubleの引数nとhot第一引数を足して、hot第二引数の無名関数を適応させた処理

const plusOneDouble = hot(1, n => n*2);
console.log(plusOneDouble(4));  // 10
