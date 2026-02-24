# CLAUDE.md

このファイルはClaude Codeがこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**cheese-nan** は [Mizuki](https://github.com/matsuzaka-yuki/mizuki) テーマをベースにした個人ブログです。Astro + Svelte + Tailwind CSS で構築された静的サイトです。

- サイトURL: https://cheese-nan.pages.dev/
- 言語: 日本語 (`ja`)
- デプロイ先: Cloudflare Pages

## 技術スタック

- **フレームワーク**: Astro 5.x
- **UIコンポーネント**: Svelte 5.x
- **CSSフレームワーク**: Tailwind CSS 4.x
- **言語**: TypeScript
- **パッケージマネージャー**: pnpm（必須）

## 主要コマンド

```bash
pnpm dev              # 開発サーバー起動 (localhost:4321)
pnpm build            # プロダクションビルド
pnpm preview          # ビルド済みサイトのプレビュー
pnpm check            # Astro型チェック
pnpm type-check       # TypeScript型チェック
pnpm format           # Prettierでコード整形
pnpm lint             # ESLintでコード検証
pnpm new-post <name>  # 新しいブログ記事作成
```

> **注意**: `pnpm build` は `node scripts/update-anime.mjs && astro build && pagefind --site dist && node scripts/compress-fonts.js` を実行するため時間がかかります。

## 重要なファイル・ディレクトリ

```
src/
├── config.ts          # ブログの全設定（必ずここを編集）
├── content/
│   ├── posts/         # ブログ記事（Markdown）
│   └── spec/          # 特殊ページ (about.md, friends.md など)
├── data/              # 静的データ（anime.ts, diary.ts, etc.）
├── pages/             # Astroページ
├── components/        # Astro/Svelteコンポーネント
├── layouts/           # レイアウトコンポーネント
├── styles/            # CSSスタイル
├── i18n/              # 多言語対応
├── plugins/           # カスタムrehype/remarkプラグイン
└── utils/             # ユーティリティ関数
```

## ブログ設定

主な設定は `src/config.ts` で管理されています：

- `siteConfig` - サイト基本設定（タイトル、言語、バナーなど）
- `navBarConfig` - ナビゲーションバーのリンク
- `profileConfig` - プロフィール情報
- `sidebarLayoutConfig` - サイドバーレイアウト
- `commentConfig` - コメント設定（Twikoo）
- `musicPlayerConfig` - 音楽プレイヤー設定

## 記事フロントマター

```yaml
---
title: タイトル
published: 2025-01-01
description: 記事の説明
image: ./cover.jpg
tags: [tag1, tag2]
category: カテゴリ
draft: false
pinned: false
comment: true
---
```

## 環境変数

`.env.example` を `.env` にコピーして必要な値を設定：

- `ENABLE_CONTENT_SYNC` - コンテンツ分離モードの有効化
- `CONTENT_REPO_URL` - コンテンツリポジトリのURL
- `BILI_SESSDATA` - Bilibili認証情報
- `INDEXNOW_KEY` / `INDEXNOW_HOST` - IndexNow SEO設定

> `.env` ファイルは絶対にコミットしないこと。

## 開発上の注意

1. **パッケージマネージャー**: `npm` や `yarn` ではなく必ず `pnpm` を使用
2. **コンポーネント追加**: 既存のパターンに従い、`.astro` または `.svelte` を適切に使い分ける
3. **スタイリング**: Tailwind CSS クラスを優先。カスタムCSSは `src/styles/` に配置
4. **型安全性**: `src/types/config.ts` に型定義があるので参照すること
5. **フォント最適化**: `enableCompress: true` の場合、開発環境ではブラウザデフォルトフォントで表示される（本番ビルド後に確認）
6. **OGP画像生成**: `generateOgImages: false` のままにしておくと開発ビルドが速い

## 特殊ページのデータ管理

データファイルは `src/data/` ディレクトリで管理：

- `anime.ts` - アニメ視聴履歴
- `diary.ts` - 日記エントリ
- `friends.ts` - フレンドリンク
- `projects.ts` - プロジェクト一覧
- `skills.ts` - スキル一覧
- `devices.ts` - 使用デバイス
- `timeline.ts` - タイムライン
