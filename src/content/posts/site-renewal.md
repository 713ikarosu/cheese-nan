---
title: サイトを作り直した
published: 2026-10-25
description: はてなブログのチーズナンの裏を、Mizuki テーマの Astro サイトに作り直したときのメモです。
image: ""
tags: []
category: ""
draft: true
pinned: false
comment: true
---

はてなブログの「チーズナンの裏」を、Astro の [Mizuki](https://github.com/matsuzaka-yuki/mizuki) テーマで作り直しました。置き場所は Cloudflare Pages で、main に入ると https://cheese-nan.pages.dev/ が更新されます。リポジトリの名前は cheese-nan のままです。

やりたいことは、日本語で雑にチャットへ書いていました。Grok Bot がそれを受け取って、クラウドのコーディングエージェントに PR を作らせます。自分は中身を見て、よければマージしました。入っているのは [#8](https://github.com/713ikarosu/cheese-nan/pull/8)、[#9](https://github.com/713ikarosu/cheese-nan/pull/9)、[#10](https://github.com/713ikarosu/cheese-nan/pull/10) です。

<!-- TODO: ここに自分の感想を書く。見た目の印象や、作業していて残しておきたいことを、後から足す。 -->

[#8](https://github.com/713ikarosu/cheese-nan/pull/8) では、テーマの見本記事と架空の経歴を外して、はてなから移した記事だけを残しました。表示名はいったん「ナンでもメモ」にしています。著者の表示は hirekatsu だけで、実名は出していません。テーマに入っていたアニメの画像と、Zen Maru Gothic、萝莉体は外しました。本文のフォントは Zen Kaku Gothic New です。sitemap、AI クローラも許可する robots.txt、各ページの title と canonical、RSS と Atom を、公開 URL に合わせました。`public/_headers` に CSP などのレスポンスヘッダーを入れています。Search Console の確認タグは、値を空のまま用意してあります。

[#9](https://github.com/713ikarosu/cheese-nan/pull/9) で、初期表示を暗い記録用の画面にして、バナーと壁紙は出さないようにしました。アクセントの色相は 42 で、鈍い茶色に固定しています。コードの等幅フォントは JetBrains Mono です。そこに含まれない文字は Zen Kaku Gothic New で出します。公開名は `src/config.ts` の `SITE_TITLE` だけを「チーズナンの裏」に戻しました。ロゴは自作の印で、文字は画像に入れていません。このときホームの一文は「// 焦げ目だけ、残す。」でした。

[#10](https://github.com/713ikarosu/cheese-nan/pull/10) で、その一文やフッターの「// EOF」、サイドバーの「// LOG」はやめて、普通の文にしました。タグラインは「タフな日々」です。ライトモードのモバイルメニューで、文字が白くて読めない件も直しています。原因は `Layout.astro` が Tailwind を二度読んでいたことです。後から読んだ方が `dark:` を OS の配色として出していたので、OS がダークだと、サイトをライトにしても白文字になりました。`@import` を、`@apply` 用の `@reference` に変えています。メニューの背景と文字とアイコンも、ライトとダークの両方で読める色に固定しました。

CodeRabbit は、スターが 10 未満のリポジトリは自動でレビューしない、と #8 と #10 に書いていました。#9 は `@coderabbitai review` とコメントして、レビューを走らせました。

次は、Google Search Console に https://cheese-nan.pages.dev を登録して、確認用の値を `googleSiteVerification` に入れることです。作ったものページは、まだ記入例のカードのままなので、実在の作品に差し替えます。音楽プレイヤーは止めたままにしてあります。Spotify の埋め込みを置くかどうかは、後で考えます。
