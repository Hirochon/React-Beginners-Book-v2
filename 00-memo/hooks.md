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


