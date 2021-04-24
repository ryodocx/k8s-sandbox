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
#### [PipeCD](https://pipecd.dev)
* 😥設定をUIで実施する部分がある
* 🔥piped -> control-plainにgRPC接続できていない模様

@piped
```
stopping due to signal	{"signal": "terminated"}
failed to create api client	{"error": "context canceled"}
github.com/pipe-cd/pipe/pkg/app/piped/cmd/piped.(*piped).createAPIClient
	pkg/app/piped/cmd/piped/piped.go:401
github.com/pipe-cd/pipe/pkg/app/piped/cmd/piped.(*piped).run
	pkg/app/piped/cmd/piped/piped.go:154
github.com/pipe-cd/pipe/pkg/cli.runWithContext
	pkg/cli/cmd.go:90
github.com/pipe-cd/pipe/pkg/cli.WithContext.func1
	pkg/cli/cmd.go:47
github.com/spf13/cobra.(*Command).execute
	external/com_github_spf13_cobra/command.go:842
github.com/spf13/cobra.(*Command).ExecuteC
	external/com_github_spf13_cobra/command.go:950
github.com/spf13/cobra.(*Command).Execute
	external/com_github_spf13_cobra/command.go:887
github.com/pipe-cd/pipe/pkg/cli.(*App).Run
	pkg/cli/app.go:60
main.main
	cmd/piped/main.go:32
runtime.main
	GOROOT/src/runtime/proc.go:225
failed to create gRPC client to control plane	{"error": "context canceled"}
github.com/pipe-cd/pipe/pkg/app/piped/cmd/piped.(*piped).run
	pkg/app/piped/cmd/piped/piped.go:156
github.com/pipe-cd/pipe/pkg/cli.runWithContext
	pkg/cli/cmd.go:90
github.com/pipe-cd/pipe/pkg/cli.WithContext.func1
	pkg/cli/cmd.go:47
github.com/spf13/cobra.(*Command).execute
	external/com_github_spf13_cobra/command.go:842
github.com/spf13/cobra.(*Command).ExecuteC
	external/com_github_spf13_cobra/command.go:950
github.com/spf13/cobra.(*Command).Execute
	external/com_github_spf13_cobra/command.go:887
github.com/pipe-cd/pipe/pkg/cli.(*App).Run
	pkg/cli/app.go:60
main.main
	cmd/piped/main.go:32
runtime.main
	GOROOT/src/runtime/proc.go:225
```

#### [Spinnaker](https://spinnaker.io)

#### [Argo](https://argoproj.github.io/)

---

### Usage

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
    * `./.gitattributes`
    * `./.sops.yaml`
    * `./helmfile-config/secrets/*`

#### [Helmfile](https://github.com/roboll/helmfile)
* デプロイ用

```bash
# deploy
helmfile sync
```

* 関連ファイル
    * `./helmfile.yaml`
    * `./helmfile-config/*`
