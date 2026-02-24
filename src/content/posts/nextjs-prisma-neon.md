---
title: Next.js x Prisma x Neon で DB 接続してみた
published: 2024-06-16
tags: [Next.js, Prisma, Neon, DB]
category: 技術
draft: false
---

個人開発で作っていたサイトでDBを使いたかったので **Neon** を使ってみました。PlanetScaleが無料じゃなくなったらしいので、無料枠があるというNeonを使ってみようと思いました。

https://neon.tech/

## 環境

- Next.js 14.2.3
- Prisma 5.15.0
- Prisma Client 5.15.0

## Neonのサインアップ

公式ページからGithubアカウントで簡単にSign upできた！

## ブランチの作成、セットアップ

ボタン一つで開発用ブランチの作成ができた。

各ツールや言語によっての設定情報もコピペできるようになっててうれしい

## Prismaからマイグレーション

あとはスキーマファイルを用意して、ローカルから簡単にマイグレーションできました。

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

以下のコマンドでマイグレーション。

```bash
npx prisma migrate dev --name init
```

あとはダッシュボードから簡単に中身を確認したりできます。

ブランチの切り替え忘れに注意

## 所感

無料枠もあるし、設定めちゃ簡単なので個人開発などでサクッと試したい場合にはすごくいいなと思いました！
