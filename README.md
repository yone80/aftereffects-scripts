After Effects Scripts
====================
AE CC 2018

一部 #include を使用

#### splitText.jsx
選択したテキストレイヤーを文字ごとに別のテキストレイヤーに分割
#### shiftLayers.jsx
最初に選択したレイヤーのインポイントからタイムラインカーソルの位置までの距離をオフセットとして、選択したレイヤーのインポイントをずらす


#### makePivot.jsx
選択したレイヤーのアンカーポイントにヌルレイヤーを親レイヤーとして追加
#### transferTransformToPivot.jsx
選択したレイヤーのアンカーポイントにヌルレイヤーを親レイヤーとして追加、位置・回転のキーフレームをそのヌルレイヤーにコピー、選択したレイヤーの位置・回転はリセット


#### copyPosition.jsx
最後に選択したレイヤーの位置(World)を他の選択したレイヤーにコピー
#### shiftPosition.jsx
最後に選択したレイヤーの位置(World)を他の選択したレイヤーにコピー、キーフレームがある場合まとめて同じ距離だけ移動


#### alongMotionPath.jsx
最後に選択したレイヤーのモーションパスに沿うエクスプレッションを他の選択したレイヤーに適用

#### cropSolidToMask.jsx
選択した平面レイヤーのオリジナルを全マスクを含むサイズに変更


### ScriptUI Panels
#### Property Controller.jsx
選択したレイヤーの指定したプロパティをまとめて変更 - [Demo](http://www.screencast.com/t/E4PBqe7o) - [説明画像](https://app.box.com/s/f9b86sfpyfmx519ob6ns)
#### Selection Rack.jsx
レイヤー選択範囲を "shift+click" で一時的に保存、click で呼び出し - [Demo](http://www.screencast.com/t/gzkCADn5TakM)
