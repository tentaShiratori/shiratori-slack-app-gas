# shiratori-slack-app

## エンドポイントの作成からデプロイまで

1. プロジェクトの作成

```sh
mkdir sample
cd sample
clasp create --title Sample --type webapp
```

生成される`.clasp.json`の`rootDir`は`.`に変更する

2. プロジェクトの初期設定

`packge.json`の`lib`のインストール元は適宜変更すること

```sh
echo '{
  "scripts": {
    "build": "node ./build.js"
  },
  "dependencies": {
    "lib": "file:../lib"
  }
}' > package.json
echo '{
  "compilerOptions": {
    "lib": ["esnext"],
    "experimentalDecorators": true
  }
}' > tsconfig.json
echo '*.ts
**/node_modules/**' > .claspignore
echo 'import { createResponse } from "lib/response";

function doGet(e: GoogleAppsScript.Events.DoGet) {
  return createResponse(`hello world`);
}

declare const global: any;
global.doGet = doGet;' > main.ts
bun install
```

3. buildとpush

```sh
bunx bundler main.ts
clasp push
```

5. デプロイ(初回)
6. ブラウザを開いてデプロイ（初回はCLIではlibraryのデプロイしかできない）

```sh
clasp open
```

7. 設定をpullする

```sh
clasp pull
```

8. デプロイ（２回目以降）
   "Manifest file has been updated. Do you want to push and overwrite" と出ることがあるが無視していい

```sh
clasp deployments
clasp deploy --deploymentId id
```

## ハンドラの登録

buildにesbuildを使っている関係で`doGet`や`doPost`を扱う時に癖がある。

具体的には`global`に代入する必要がある

```ts
import { createResponse } from "lib/response";

function doGet(e: GoogleAppsScript.Events.DoGet) {
  return createResponse(`${foo} ${bar}`);
}

declare const global: any;
global.doGet = doGet;
```
