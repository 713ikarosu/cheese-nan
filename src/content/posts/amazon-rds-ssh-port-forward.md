---
title: AmazonRDS(MySQL)にSSHポートフォワード接続(Mac)
published: 2019-05-07
tags: [AWS, MySQL, SSH, インフラ]
category: 技術
draft: false
---

職場のサーバーがAWSに移行したのをきっかけに、外部からRDSのMySQLにSSHポートフォワードで接続する方法を調べました。

## SSHポートフォワードとは

インターネットから特定のポート番号宛てのパケットを、あらかじめ設定したLAN内の機器に転送する仕組みです。

DBサーバーへのアクセスをWebサーバーのみに制限したうえで、Webサーバーを踏み台として外部からDBに接続する用途で使います。

## 試したこと

### うまくいかなかったもの

- **autossh**（CLI）：参考記事通りに試したが反応なし
- **Coccinella**（GUI）：同様にうまくいかず

### うまくいった方法

素直にSSHコマンドを使ったらうまくいきました。

```bash
ssh -f -N -L 3307:hogehoge.xxxxxxxxxxxxx.ap-northeast-1.rds.amazonaws.com:3306 -i /path/to/key.pem user@${InstanceIP}
```

## ハマったポイント

うまくいかなかった原因として、以下の2点が挙げられます。

1. SSHコマンドのオプション（`-i` など）の意味を理解していなかった
2. 公開鍵・秘密鍵認証についての知識不足

基本的なSSHの使い方をちゃんと理解してから取り組むべきでした。
