---
title: Gitの謎エラー - Xcodeのせいかも編
published: 2019-04-25
tags: [Git, Mac, Xcode, Homebrew]
category: 技術
draft: false
---

Macでgitを使おうとしたら謎のエラーが出たので調べた記録です。

## エラー内容

```
xcrun: error: active developer path ("/Applications/Xcode.app/Contents/Developer") does not exist
```

## 原因（推測）

Macのストレージ節約のためにXcodeを削除していた可能性があります。正確な原因は不明。

## 対処法

### Step 1: brew doctor を実行

複数のwarningが出ました。

- 非推奨のtapが存在する
- デベロッパーツールが未インストール
- Cellar内にリンクされていないkegがある
- シンボリックリンクが壊れている
- PATHの設定に問題がある

### Step 2: Command Line Developer Tools をインストール

```bash
xcode-select --install
```

GUIのダイアログが表示され、スタンドアローン版のCommand Line Developer Toolsのインストールが開始されました。

（インストール中につき、続きは後日…）
