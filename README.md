# メモ書き
## Reactに登場するメモ化を一通りさらう
- React.memo
- React.useMemo
- React.useCallback

## React.memo
コンポーネント単位でメモ化する
コンポーネントに渡す引数(props)が変更されなければメモ化されたコンポーネントを返す

## React.useMemo
値をメモ化する
CPUバウンドな処理の結果をメモ化するとよさそう

## React.useCallback
（コールバック）関数そのものをメモ化する
内部実装的にはuseMemo

## 問.メモ化をなぜするのか
### 答.再描画が悪だからである

上に登場するメソッドはすべて再描画を避けるために容易されている

Reactの考え方は、データドリブンな宣言的UIを実現する手段としてのライブラリを提供することである。

そのため、宣言されたUIの元となるデータが書き換わるとUIも変更される（必要がある）

UIの変更には、Reactで管理されるメモリ上の仮想DOMからブラウザの実DOMに反映するという処理があり、ここが場合によってボトルネックとなる

また、Reactは上記メソッドを用いない場合、親コンポーネントの再描画が走ると、子コンポーネントも再描画処理されるため、子コンポーネントに再描画の必要がなかったとしても無駄に再描画されることがある

これを避けるため、コンポーネントに渡される引数が変わらない限り、メモ化されたDOMを返すことでコンポーネントの再描画処理を省こうとしているのがReact.memoの存在意義である

またReact上で管理される値(useState)が変わらない限り、同じ値を返すのがuseMemoである

さらに、React上で管理される値(useState)が変わらない限り処理をせず、変わったときにのみ処理をする関数を返すのがuseCallbackである

例えば次のようなケースではクリック毎にonClickに渡すためのコールバックが生成される
```tsx
<button onClick={()=>{
    console.log("AAA");
}}>
    押(推)して!!!
</button>
```

コールバック関数そのものは参照型であるため、同じ内容の処理であったとしても同じ関数とはみなされない(Javaで Object == Object が成り立たないのと同じ)

そのため、クリックごとに渡された値が異なるという判定になり、再描画の対象となってしまう

そこでクリック毎にコールバックを渡さないようにするために次のようにすることが考えられる
```tsx

const handleClick = ()=>{
    console.log("AAA");
} 

<button onClick={handleClick}>
    押(推)して!!!
</button>
```

このようにすると、クリックごとにonClickごとにコールバックが生成されなくなる

ただし、コンポーネント全体を再描画する必要がある場合はコールバックもすべて生成されなおす

これらの再生成を可能な限り減らすには、必要のない箇所を別コンポーネントとして切り出して、切り出したコンポーネントをメモ化することである

