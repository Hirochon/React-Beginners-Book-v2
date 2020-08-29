# Hooksで関数コンポーネントを強化

## Hooksの誕生以前の話
最近までは既存のコンポーネントに機能を追加するには、おおまかに2つのやり方があった。ひとつが**HOC(Higher Order Component)**。日本語では高階コンポーネントと呼ばれる関数を使う方法。

HOCは高階関数の親戚みたいなもので、コンポーネントを引数にとり、戻り地としてコンポーネントを返す関数のことを指す。

```tsx: hoc.tsx
import React, { Component, FC } from 'react';

const Hello: FC = () => <div>Hello!</div>;

const logProps = (WrappedComponent: FC) => {
    return class extends Component {
        componentDidMount() {
            console.log('Component is rendered.');
        }
        render() {
            return <WrappedComponent />;
        }
    };
};
export default logProps(Hello);
```

`logprops()`がHOCで、Helloコンポーネントを引数にとって、マウント時に『Component is rendered.』というテキストを出力する機能が付与されている。


## StateHookでLocalStateの管理
クラスコンポーネントのLocalStateに相当するものを関数コンポーネントでも使えるようにする機能を使って、いかのれいがかける。

```tsx: localstate.tsx
const [count, setCount] = useState(0);
setCount(100);
setCount(prevCount => prevCount + 1);
```

`useState()`は戻り値としてstate変数とそのセッター関数を返す。だから上のプログラムのように分割代入で受け取る。`useState()`の引数には、そのstate変数の初期値を設定する。もちのろんstate変数とセッター関数の名前は好きに設定できる

### クラスコンポーネントの`this.setState()`と違うところ
`this.setState({count: 0})`や`this.setState(prevCount => ({count: prevCount + 1}))`のようにオブジェクトを扱う必要があったけど、StateHookの場合はその必要がない。


## Effect Hookでライフサイクルを扱う
クラスコンポーネントのライフサイクルメソッド`componentDidMount()`,`componentDidUpdate()`,`componentWillUnmount()`に相当する機能を実現したもの。主に副作用(データの取得、手動でのDOMの改変、ログの記録)を扱うHooks。使い方は下記。

```tsx: effecthook.tsx
useEffect(() => {
    doSomething();

    return clearSomething()
}, [watchVar]);
```

`useEffect()`は第1引数に引数なしの関数を設定する。その渡した関数の中身、ここでは`dosomething()`がコンポーネントのレンダリング直前に実行されることになる。(≒`componentDidMount()`や`componentDidUpdate()`といったメソッド内に書くのと同じ)
関数は必ずしも戻り値を必要としないが、戻り値を設定すると、コンポーネントのアンマウント直前に実行されることになる。(≒`componentWillUnmount()`と同じ)

`useEffect()`の第２引数では配列を指定する必要がある(省略可)。その配列の中に任意の変数を入れておくと、その値が前回のレンダリング時と変わらなければ、第１引数で渡された関数の中身の副作用実行がキャンセルされることになる。

→　`useEffect()文`が記述されたコンポーネントでは、初回のレンダリング直後に`dosomething()`が実行され、再レンダリング時には`watchVar`という変数の中身が変わっている時、`dosomething()`が実行されるけど、`watchVar`が変わってなければ`dosomething()`は実行されない。
そしてアンマウント時には`clearSomething()`が実行される。

もし第２引数を省略すると、問答無用でレンダリングの際に`dosomething()`を実行する。
もし空の配列を渡すと、`dosomething()`は初回のレンダリングしか行わない。


## Custom Hookで独自のHookを作る
Custom Hookを使って、『見た目だけを整えた**Presentational Component**』を作り、それをimportしてきて、Custom Hookで『必要な機能を追加して**Container Component**』にすることが簡単にできる。

## その他のHooks
### Hooksを使う際の注意点をおさらい
- Hooksを呼べるのは関数コンポーネントかCustom Hookの中のみ。クラスコンポーネントやReactモジュールの管轄外での使用は不可。
- Hooks文を記述するのはその関数のトップレベルで行う。条件分岐やループ、ネストした関数内に記述するのは不可。
- Custom Hookの関数名は、useXxxのように必ず『use』で始める。
