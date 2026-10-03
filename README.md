# lemmalog-opencode-plugin

> **Note: this repository was AI-generated** (assisted by an LLM, reviewed and shipped by a human).

OpenCode plugin that registers the **project-scoped [lemmalog](https://github.com/JordyZomer/lemmalog) MCP server**, giving each project its own persistent Datalog memory.

Upstream lemmalog registers the MCP only with Claude Code and Kimi; this plugin adds the OpenCode integration.

## What's here

| File | Purpose |
|---|---|
| `lemmalog-project.js` | The whole plugin: registers the `lemmalog` MCP server and derives its per-project snapshot path |

## Requirements

- OpenCode (v2 plugin API `ctx.mcp.transform`)
- `lemmalog-mcp` at `~/.local/bin/lemmalog-mcp`: build it from the
  [lemmalog](https://github.com/JordyZomer/lemmalog) repo with
  `cargo build --release --features mcp`, then copy or symlink
  `target/release/lemmalog-mcp` into `~/.local/bin`

## Install

```bash
mkdir -p ~/.config/opencode/plugins
cp lemmalog-project.js ~/.config/opencode/plugins/
```

OpenCode picks it up automatically: the `lemmalog_*` tools should appear (restart if they don't). Updating = copy the file again.
Uninstall: delete that file (snapshots under `~/.local/share/lemmalog/projects/` stay).

## License

MIT, same as the original [lemmalog](https://github.com/JordyZomer/lemmalog) repository.
