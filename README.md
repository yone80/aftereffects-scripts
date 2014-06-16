After Effects Scripts
====================
After Effects CC でしか動作確認してないので他の環境で動くかは不明


一部 #include を使うようにしたので、よくわからんって人は build フォルダに入っているバイナリ化したのを(.jsxbin)を使ってください 
#### addCamera.jsx
コンポジションにリグ付きのカメラ(28mm)を追加
#### copyPosition.jsx
最後に選択したレイヤーの位置(World)を他の選択したレイヤーにコピー
#### copyRotation.jsx
最後に選択したレイヤーの回転(World)を他の選択したレイヤーにコピー
#### decomposeText.jsx
選択したテキストレイヤーを文字ごとに別のテキストレイヤーに分割
#### linkTransform.jsx
最後に選択したレイヤーの位置・回転・スケールにリンクするエクスプレッションを他の選択したレイヤーに適用
#### makePivot.jsx
選択したレイヤーのアンカーポイントにヌルレイヤーを親レイヤーとして追加
#### railMotionPath.jsx
最後に選択したレイヤーのモーションパスに沿うエクスプレッションを他の選択したレイヤーに適用
#### shiftLayers.jsx
最初に選択したレイヤーのインポイントからタイムラインカーソルの位置までの距離をオフセットとして、選択したレイヤーのインポイントをずらす
#### shiftPosition.jsx
最後に選択したレイヤーの位置(World)を他の選択したレイヤーにコピー、キーフレームがある場合まとめて同じ距離だけ移動
#### transferTransform.jsx
選択したレイヤーのアンカーポイントにヌルレイヤーを親レイヤーとして追加、位置・回転・スケールのキーフレームもそのヌルレイヤーにコピー、選択したレイヤーの位置・回転・スケールはリセット
### ScriptUI Panels
#### Property Controller.jsx
選択したレイヤーの指定したプロパティをまとめて変更 - [Demo](http://www.screencast.com/t/E4PBqe7o) - [説明画像](https://app.box.com/s/f9b86sfpyfmx519ob6ns)
#### Selection Rack.jsx
レイヤー選択範囲を "shift+click" で一時的に保存、click で呼び出し - [Demo](http://www.screencast.com/t/gzkCADn5TakM)
