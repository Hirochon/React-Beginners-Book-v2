# Reduxでアプリの状態を管理する

## Fluxアーキテクチャ
Action → Dispatcher → Store → View → Action → Dis.......

Storeとは: アプリケーション全体で保持するべき情報を蓄えたもの。Viewから適宜参照することができる。

Viewとは: 下記Actionを発行するもの

Actionとは: 何らかのイベントが起こった時に『何をどうしたいか』という意図を表現したもの

Dispatcherとは: 投げられたActionを処理し、Storeの中身を書き換える

Storeが書換われば、参照していたViewにも速やかに反映される。これによってデーターフローが常に単方向になることが保証され、どんな複雑なシステムでも《破綻しにくく予測可能なもの》にすることができる。


## Reduxの登場
Reduxの三原則
- Single source of truth (信頼できる唯一の情報源)
- State is read-only (状態は読み取り専用)
- Change are made with pure functions (変更は純粋関数にて行われる)

### Single source of truth
アプリケーションの状態が唯一つのStoreオブジェクトによるツリー構造で表現されること。
⇔複数のStoreが存在すると、Store間のデータのやり取りが面倒になる。ひとつのオブジェクトに集約されることで、デバッグやテストもやりやすくなる。(分かりやすい例えで言うと、どこで定義されているかわからない複数のグローバル変数に依存したアプリケーション…やばい。)

### State is read-only
ViewやイベントのコールバックがStoreの状態を直接書き換えることが許されないということ。Storeの変更のためには必ずActionを発行する必要がある。変更がActionだけに集約されることで、予期せぬところから書き換えを防いでる。そしてReduxのActionはプレーンオブジェクトなので、ログも簡単に取ることができる。

### Change are made with pure functions
状態の変更はReducerという、あらかじめ定義された純粋関数によって行われる。簡易化すると以下式で表現される関数となる

```tsx: reducer.tsx
// 古い状態を引数にとり、新しい状態を返す関数
(prevState, action) => newState
```

Actionが同じなら、必ず新旧の状態の差分も同じであることが保証される。
Viewから発行されたActionはDispatcherで割り振られてReducerに渡される。ReducerはそのActionと現在のStateを受け取って、新しいStateを返す。
