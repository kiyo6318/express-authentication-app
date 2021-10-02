# ログイン認証システム

## 機能一覧

- ユーザーアカウントを作成する
- ログイン画面からログインする
- ログインに成功した場合にログイン後の画面を表示する
- 悪意のある別サイトからの、ユーザーアカウント作成の POST 処理で、ユーザーアカウントを作成出来ない
- ログインしていない状態で、ログイン後の画面の URL を入力した場合、ログイン画面を表示し、ログイン成功後、入力した URL の画面を表示する

## 実装出来なかった機能

- パスワードを失念した場合の対応

## 使用技術

- Express
- express-session
- sequelzie
- MySQL
- Redis
- bcrypt
- ejs
