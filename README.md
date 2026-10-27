# チーズナンの裏

[チーズナンの裏](https://cheese-nan.pages.dev) は、Astro と Mizuki テーマで作った個人ブログを公開している。

## クレジット

このリポジトリは [Mizuki](https://github.com/matsuzaka-yuki/mizuki) テーマを改変して使っている。Mizuki は Apache License 2.0 で、著作権は Matsuzaka Yuki にある。改変したものを再配布するときは、次の表示を残して [LICENSE](LICENSE) を同梱する。

```text
Copyright Matsuzaka Yuki

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Mizuki は [Fuwari](https://github.com/saicaca/fuwari) を元にしている。Fuwari は MIT License で、著作権表示には Copyright (c) 2023 saicaca と書いてある。MIT が求める著作権表示と許諾文は [LICENSE.MIT](LICENSE.MIT) に残してある。

## セットアップ

依存を入れて、開発サーバーを起動する。

```bash
pnpm install
pnpm dev
```

ブラウザでは http://localhost:4321 を開く。本番用のビルドと型チェックは、次のコマンドで行う。

```bash
pnpm build
pnpm exec astro check
```

## 記事を書く

新しい記事は次のコマンドで作る。

```bash
pnpm new-post <slug> [title]
```

できたファイルの `draft` は `true` にしてあり、このままでは本番に出ない。公開するときは `draft` を `false` にする。書き方は [docs/WRITING.md](docs/WRITING.md) に書いてある。

## デプロイ

`main` に push すると、Cloudflare Pages がビルドして https://cheese-nan.pages.dev を更新する。
