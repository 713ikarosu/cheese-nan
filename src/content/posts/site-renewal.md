---
title: サイトを作り直した
published: 2026-10-25
description: はてなブログのチーズナンの裏を Mizuki テーマの Astro サイトに作り直した
image: ""
tags: []
category: ""
draft: true
pinned: false
comment: true
---

はてなブログの「チーズナンの裏」を Astro の [Mizuki](https://github.com/matsuzaka-yuki/mizuki) テーマで作り直した。置き場所は Cloudflare Pages で main に入ると https://cheese-nan.pages.dev/ が更新される。リポジトリの名前は cheese-nan のままにしてある。

やりたいことは日本語で雑にチャットへ書いてて Grok Bot がそれを受け取ってクラウドのコーディングエージェントに PR を作らせてた。自分は中身を見てよければマージしたし [#8](https://github.com/713ikarosu/cheese-nan/pull/8) と [#9](https://github.com/713ikarosu/cheese-nan/pull/9) と [#10](https://github.com/713ikarosu/cheese-nan/pull/10) が入ってる。

## きっかけ

Astro の Mizuki テーマがおしゃでかっこかわよくて使ってみたかったし Mizuki に移行した別のブログ記事を読んだのもきっかけになってる。哲学的なことや自分が考えたことを書いておきたいしアウトプットしたい。

## やってみて

テーマを自分用に直すのは色とか構成とか細かい修正がめんどくさくて放置してたけど Grok Bot とやり取りして終わらせた。ただ細かいスタイルの崩れはたくさんあった。コードを一行も書かずに終わったのはすごいと思ったし全体の構成を整えるところから細かいスタイルの直しまで一通り終わってて進んでる感じはした。かかったのは2、3日で酒飲む合間のラリーだった。

## 気づいたこと

Grok Bot は文脈を読んでおしゃれなポエムを勝手に足してきたし全体の最適化は考えずに変更して直してないところも残した。だから人間のレビューはまだ要るし穴も残ってる。全体の最適化を考えさせるのは難しかったしプロンプトのコツは特にない。フロントエンドエンジニアなのにコード書いてなくてデザインセンスがゼロだからめっちゃ楽だった。デザインセンスがない人でも Astro のテンプレートと生成AIでそれなりの見た目にするのは全然ありだと思った。

## これから

やったことや考えたことをアウトプットしていきたいけどまだ決めてないし続かないかもしれない。

[#8](https://github.com/713ikarosu/cheese-nan/pull/8) ではテーマの見本記事と架空の経歴を外してはてなから移した記事だけ残した。表示名はいったん「ナンでもメモ」にしてて著者の表示は hirekatsu だけで実名は出してない。テーマに入ってたアニメの画像と Zen Maru Gothic と萝莉体は外して本文のフォントは Zen Kaku Gothic New にしてる。sitemap と AI クローラも許可する robots.txt、各ページの title と canonical、RSS と Atom を公開 URL に合わせた。`public/_headers` に CSP とかのレスポンスヘッダーを入れてて Search Console の確認タグは値を空のまま用意してある。

[#9](https://github.com/713ikarosu/cheese-nan/pull/9) で初期表示を暗い記録用の画面にしてバナーと壁紙は出さないようにした。アクセントの色相は 42 で鈍い茶色に固定しててコードの等幅フォントは JetBrains Mono にしてそこにない文字は Zen Kaku Gothic New で出す。公開名は `src/config.ts` の `SITE_TITLE` だけ「チーズナンの裏」に戻した。ロゴは自作の印で文字は画像に入れてない。このときホームの一文は「// 焦げ目だけ、残す。」にしてた。

[#10](https://github.com/713ikarosu/cheese-nan/pull/10) でその一文とフッターの「// EOF」とサイドバーの「// LOG」はやめて普通の文にした。タグラインは「タフな日々」にしてる。ライトモードのモバイルメニューで文字が白くて読めないのも直した。原因は `Layout.astro` が Tailwind を二度読んでて後から読んだ方が `dark:` を OS の配色として出してた。OS がダークだとサイトをライトにしても白文字になってた。`@import` を `@apply` 用の `@reference` に変えてメニューの背景と文字とアイコンもライトとダークの両方で読める色に固定した。

CodeRabbit はスターが 10 未満のリポジトリは自動でレビューしないと #8 と #10 に書いてた。#9 は `@coderabbitai review` とコメントしてレビューを走らせた。

次は Google Search Console に https://cheese-nan.pages.dev を登録して確認用の値を `googleSiteVerification` に入れる。作ったものページはまだ記入例のカードのままだから実在の作品に差し替える。音楽プレイヤーは止めたままにしてて Spotify の埋め込みを置くかは後で考える。
