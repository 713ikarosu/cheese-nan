# 記事の書き方

チーズナンの裏の記事は `src/content/posts/` の Markdown です。公開名や著者名は `src/config.ts` で、記事には書きません。

## 新しい記事を作る

プロジェクトのルートで実行します。

```bash
pnpm new-post <slug> [title]
```

例:

```bash
pnpm new-post site-renewal サイトを作り直した
```

`src/content/posts/<slug>.md` ができます。

- `slug` は英小文字、数字、ハイフンだけです。URL は `/posts/<slug>/` になります。末尾の `.md` は外します。
- 日付は Asia/Tokyo のその日です。
- `draft` は `true` です。`tags` と `category` は空です。
- タイトルを省略すると、slug がタイトルになります。

フロントマターは次の形です。

```yaml
---
title: "サイトを作り直した"
published: 2026-10-25
description: ""
image: ""
tags: []
category: ""
draft: true
pinned: false
comment: true
---
```

| フィールド | 意味 |
| --- | --- |
| `title` | 記事のタイトル |
| `published` | 日付。`YYYY-MM-DD` |
| `description` | 一覧や meta に使う短い説明。空でもよい |
| `image` | カバー画像。記事ファイルからの相対パス。無ければ `""` |
| `tags` | タグ。無ければ `[]` |
| `category` | カテゴリ。無ければ `""`。空だと一覧では「未分類」と出ます |
| `draft` | `true` のあいだは本番に出ない |
| `pinned` | `true` で一覧の上に固定する |
| `comment` | 記事ごとのコメント。サイト全体のコメントがオフなら表示されない |

VS Code では Markdown で `frontmatter` と打つと、同じ形を挿入できます。スニペットの日付はエディタのローカル日付です。日本時間で入れるときは `pnpm new-post` を使います。

## 下書きを見る

```bash
pnpm dev
```

http://localhost:4321 を開きます。下書きもホーム、http://localhost:4321/archive/ 、http://localhost:4321/posts/<slug>/ に出ます。

`pnpm build` と、その結果を配信する本番では出ません。ページを作らないので、一覧、RSS、Atom、サイトマップ、サイト内検索にも入りません。`draft: true` のまま main にマージしても公開されません。

本番と同じ条件で確認するときは `pnpm build` のあと `pnpm preview` です。ここには下書きは出ません。

## 画像

カバーは、記事と同じ場所に置いて `image` に相対パスを書きます。

```yaml
image: ./cover.webp
```

本文中は次です。

```markdown
![図の説明](./figure.webp)
```

ファイルが `src/content/posts/my-post.md` なら、画像は `src/content/posts/cover.webp` のように隣に置きます。画像が複数あるときは、フォルダにまとめた方が散らかりません。

```text
src/content/posts/my-post/index.md
src/content/posts/my-post/cover.webp
src/content/posts/my-post/figure.webp
```

この場合の URL は `/posts/my-post/` のままです。`pnpm new-post` は単一の `.md` を作るので、フォルダにするときは自分で移します。

サイト全体で使うファイルは `public/` に置きます。`public/images/photo.webp` は本文から `/images/photo.webp` で参照します。こちらはビルド時の画像最適化を通りません。記事の図は、記事の隣に置く方にします。

## 公開する

1. 本文と `description` を整える。
2. frontmatter の `draft` を `false` にする。
3. 変更を main に入れる。

Cloudflare Pages が main をビルドして、https://cheese-nan.pages.dev/ を更新します。下書きのままでは、このデプロイにも含まれません。
