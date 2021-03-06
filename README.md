# ChongshengJp

このプロジェクトは私のポートフォリオ作成のために作られました。将来的には沖縄に来る中国人観光客をターゲットにした観光スポット共有サービスのようなものにしたいと思っています。

ChongShengとは中国語で冲绳と発音したときの読み方です。

フレームワークにはAngularを使用し、ホスティング、データベースにはFirebaseを使用しています。(Hosting, Cloud FireStore)

URL: https://chongsheng.jp

# トップページ

名護にドライブに行ったときの写真を背景にしています。特に意味はありません。
｢沖縄的｣というキーワードは｢沖縄の｣という意味で使っています。沖縄のいろんなスポットを共有するというイメージです。

｢POST｣のボタンをおすと投稿画面に遷移します。
ヘッダーの｢ChongSheng Spot｣を押すとトップページに遷移します。
ヘッダーの｢Posts｣を押すと投稿一覧画面に遷移します。

# 投稿画面

画面上部にログイン用のボタンが各サービスごとに表示されます。
ログインしないと投稿できませんが、最後の｢Continue as guest｣でゲストログインしても投稿は可能です。
ログインにはfirebaseのAuthenticationを使っています。

テキストを3文字以上と画像を添付することで投稿できます。

# 投稿一覧画面

添付した写真とテキストが表示されます。
｢LIKE｣ボタンでいいねをすることができます。
｢SHARE｣ボタンは未実装です。
｢next｣ボタンで次の3件を追加で表示できます。
(現状ではページ上部にスクロールされてしまいます。)

右下に表示されるキャラクターはサイトの使い方など説明してくれる感じを想定しています。

## インストール

```
git clone git@github.com:yhirochick/chongsheng-jp.git
cd chongsheng-jp
npm install
```
※Firebaseの認証情報を各自設定する必要があります。

## 開発サーバー

```
ng serve --open
```
ブラウザで `http://localhost:4200/` が開かれ、サイトが表示されます。
ファイルを編集すると自動でリロードされ、変更が反映されます。

## ビルド

```
ng build --prod && npm run ngswfix
```
ビルド後に追加のコマンドを実行しています。
サファリで画像がアップロードできない不具合を回避しています。→( https://github.com/yhirochick/chongsheng-jp/pull/3 )
