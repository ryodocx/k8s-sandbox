[PipeCD](https://pipecd.dev)

* ✅control-plain稼働
* ➡piped稼働

---

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
