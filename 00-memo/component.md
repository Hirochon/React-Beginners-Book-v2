# コンポーネント

## Reactの基本思想
- 仮想DOM
    最終的な差分だけ元のDOMに書き戻すようにして、オーバーヘッドを最小限にする仕組み
- コンポーネント指向
    Webアプリケーションを構築するための再利用可能なカプセル化された独自のHTMLタグをWeb標準の技術だけで作成できる技術
- 単方向データフロー
    データは必ず親コンポーネントから子コンポーネントへ一方通行で渡される

## Propsをコンポーネントに受け渡す
Propsとは…関数に対する引数のようなもの。**マウント時のタグの中では、そのタグの属性値**として表現される。
コンポーネント自身の定義の中では、それがクラスコンポーネントの場合だと**propsという名前のメンバー変数**。関数コンポーネントの場合は**その関数の引数として表現される**。

import {Character as Player} from './CharacterList';で名前を変えて定義もできる

Component<CharacterListProps>とは…ジェネリクス
- CharacterListクラスに対する型引数で、渡すことでコンポーネントのPropsの型を指定している。
- Componentクラスの型引数にはデフォルト値として{}という空オブジェクトが設定されている。
    → これによって、そのコンポーネントをタグとしてマウントする時に、schoolとcharacter属性値をそれぞれの適正な型で記述しないとVSCodeに怒られるw

```tsx: CL.tsx
    render() {
    const { school, characters } = this.props;
```

    - 上記ではpropsからschoolとcharactersの要素をローカル変数として抽出している。

## コンポーネント内部の状態を規定するLocal State
```tsx: local.tsx
class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  }

  decrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  }
```

引数に{}とAppStateがあるけど、一つ目はProps,２つめはLocal State型。
コンストラクタでthis.stateに向けて初期化のオブジェクトを渡している。
大事なナノは`this.state`に値を設定していること。
incremant()メソッドとdecrement()メソッドでその値を変化させている。
→ setState()メソッドを必ず使って値を更新している

**`<Button onClick={this.decrement}>`というButton子コンポーネントへ自身の状態を変更する`decrement`という関数を行動時に発火されるイベントを渡しておく。これで子コンポーネントのイベント時に親が変わる。**
→ `increment()`はLocalStateのcounterを1加算する関数で、それが子コンポーネントのButtonにPropsとして渡されて、コンポーネント内部でそのフォームボタンにクリックイベントが仕込まれている。

## コンポーネントのライフサイクル
『コンポーネントのライフサイクル』とは『初期化されて、マウントされ、レンダリングされ、何らかの処理を行われて、再レンダリングされて、最後にアンマウントされるまでの過程』を示す。

### ライフサイクルには4つのフェーズがある
1. Mounting…コンポーネントが生成されDOMノードに挿入されるフェーズ
2. Updating…変更を検知してコンポーネントが再レンダリングされるフェーズ
3. Unmounting…コンポーネントがDOMノードから削除されるフェーズ
4. Error Handling…そのコンポーネント自身および子コンポーネントのエラーを補足する

### コンポーネントが再レンダリングされるのは基本的に２つの場合のみ
1. コンポーネントに渡されているPropsに変更があった時
2. 自身のLocal Stateの値にへんこうがあった時
※ 任意の条件で再レンダリングを阻止する方法もある。

先ほどのカウントアプリではボタンを押したタイミングでLocal Stateに規定されたcountの値が変更されたから、コンポーネントが再レンダリングされた。

そんでライフサイクルの各フェーズに介入して、任意の処理を差し込むことができるメソッドがReactには用意されている。それがライフサイクルメソッドという。

### ライフサイクルメソッドについて

