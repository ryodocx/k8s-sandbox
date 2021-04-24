memo

#### helm-charts
* HelmChart群をリポジトリ https://ryodocx.github.io/k8s-sandbox にホスティング
    * [helm/chart-releaser](https://github.com/helm/chart-releaser) + GitHub Pages
* helmfile, CDツールから参照
* 関連ファイル
    * `./helm-charts/*`
    * `./.github/workflows/release.yml`

#### [k6](https://github.com/k6io/k6)
* ダウンタイム検証用

```bash
export K6_OUT=datadog
export DD_API_KEY=***
export TAEGETURL=http://example.com
docker-compose up -d
k6 run ./k6-scripts/simple.js
```

* 関連ファイル
    * `./k6-scripts/*`
    * `./docker-compose.yaml`
    * `.github/workflows/release.yml`

#### [sops](https://github.com/mozilla/sops)
* [helm-secret](https://github.com/jkroepke/helm-secrets)の暗号化エンジン
* 検証用に[age](https://github.com/FiloSottile/age)を使用: https://github.com/mozilla/sops#encrypting-using-age
* age-keygen: 暗号化キーを作成
* キーを保存するべき場所がドキュメントと一致しないので注意
    * Linuxの場合: ❌ `$XDG_CONFIG_HOME/sops/keys.txt` ⭕ `~/.config/sops/age/keys.txt`

```bash
# 新規暗号化ファイル作成
sops path/to/file

# in-place複合
sops -d -i path/to/file

# secretsの一括暗号化
ls helmfile-config/secrets/*/* | xargs -n 1 sops -e -i
```

* 関連ファイル
    * `./.gitattributes`
    * `./.sops.yaml`

#### [Helmfile](https://github.com/roboll/helmfile)
