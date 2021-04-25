K8sで遊んだメモ

```
$ kubectl version --short 
Client Version: v1.20.4
Server Version: v1.20.4

$ cat .tool-versions 
kubectl 1.20.4
k6 0.31.1
helmfile 0.138.7
helm 3.5.4

$ kustomize version --short
{kustomize/v3.9.3  2021-02-07T17:02:13Z  }
```

### Memo
* [PipeCD](./docs/pipecd.md): CD
* [Argo](./docs/argo.md)
    * Argo Workflows: CI
    * Argo CD: CD
    * Argo Rollouts: Progressive Deployment ※SMI互換
    * Argo Events: ???
* [Spinnaker](./docs/spinnaker.md): CD
* [Flagger](./docs/flagger.md): Progressive Deployment ※SMI互換
* [Open Service Mesh](https://openservicemesh.io/): ServiceMesh ※SMI互換

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
helmfile -f path/to/helmfile sync
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

#### [kustomize](https://github.com/kubernetes-sigs/kustomize)
* helmfileからplain-manifestを参照する際に使用
* 関連ファイル
    * `./kustomize/*`
* ❗ kustomize v4系列ではオプションに互換性がないのでhelmfile 0.138.7と組み合わせる場合はv3が必要
* ❗ kustomizeから`resources`で呼び出すファイルは、localに存在する必要がある(kusomize互換ディレクトリはgo-getter式のURLで指定可能?)

```bash
#プラグイン用ディレクトリ作成
mkdir -p $HOME/.config/kustomize/plugin
```
