import { createHash } from "node:crypto"
import { mkdirSync, realpathSync } from "node:fs"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"

// Registers the project-scoped lemmalog MCP server: the snapshot path is
// derived from the project directory, so every project gets its own memory.
export default {
  id: "lemmalog-project",
  async setup(ctx) {
    await ctx.mcp.transform((editor) => {
      if (editor.get("lemmalog")) return
      let root = ctx.location.directory
      try { root = realpathSync(root) } catch {}
      const hash = createHash("sha256").update(root).digest("hex").slice(0, 20)
      const name = (basename(root) || "/").replace(/[^A-Za-z0-9._-]/gu, "_").slice(0, 64)
      const memory = join(homedir(), ".local", "share", "lemmalog", "projects", `${name}-${hash}`, "memory.snapshot")
      mkdirSync(dirname(memory), { recursive: true, mode: 0o700 })
      editor.set("lemmalog", {
        type: "local",
        command: [join(homedir(), ".local", "bin", "lemmalog-mcp")],
        environment: { LEMMALOG_MCP_PATH: memory },
      })
    })
  },
}
