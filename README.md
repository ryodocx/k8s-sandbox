K8sで遊んだメモ

```
$ kubectl version --short 
Client Version: v1.20.4
Server Version: v1.20.4

$ cat .tool-versions 
kubectl 1.20.4
helm 3.5.4
helmfile 0.138.7
k6 0.31.1
```

### Memo
* [PipeCD](./docs/pipecd.md)
* [Argo](./docs/spinnaker.md)
* [Spinnaker](./docs/argo.md)

---

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
export TARGETURL=http://example.com
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
ls helmfile-config/secrets/* | xargs -n 1 sops -e -i
```

* 関連ファイル
    * `./.sops.yaml`
    * `./helmfile-config/secrets/*`

#### [Helmfile](https://github.com/roboll/helmfile)
* デプロイ用

```bash
# deploy
helmfile sync -f path/to/helmfile
```

* 関連ファイル
    * `./helmfile-*.yaml`
    * `./helmfile-config/*`

* インテグレーション: https://github.com/roboll/helmfile#integrations
	* ArgoCD連携
		* `helmfile template` + ArgoCDで連携できる
		* 監視等のインフラはhelmfile, アプリはArgoCDの住み分けを想定している模様
	* HelmChartバージョンの自動更新: https://github.com/renovatebot/renovate

* plain manifestのデプロイ
	* https://github.com/roboll/helmfile/pull/1172

#### [go-getter](https://github.com/hashicorp/go-getter)
* helmfile等のURLフォーマットはgo-getterに則る: https://github.com/hashicorp/go-getter#url-format
