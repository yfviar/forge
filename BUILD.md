# Forge 本地构建与发布

基于 [forge v0.9.0](https://github.com/ferodrigop/forge) 源码，做了以下修改以适配 Windows 离线环境。

## 修改清单

| 文件 | 改动 | 原因 |
|------|------|------|
| `src/cli.ts:3` | 新增 `import { pathToFileURL } from "node:url"` | Windows 路径兼容 |
| `src/cli.ts:82-83` | 传入 `vendorDir` 给 DashboardServer | 启用本地 vendor 静态文件服务 |
| `src/cli.ts:539-542` | `isDirectExecution` 改用 `pathToFileURL` | **修复 Windows Bug**：反斜杠路径导致 `main()` 从不执行 |
| `scripts/build-npm.ts` | 构建时自动复制 vendor 到 dist | 离线 Dashboard 打包 |
| `src/dashboard/frontend/vendor/` | 8 个前端库文件 | 替代被墙的 jsdelivr CDN |
| `src/core/terminal-session.ts:381-395` | `buildPtyEnv` 注入 UTF-8 环境变量 | **修复中文乱码（第 1 层）**：强制 LANG/LC_ALL/PYTHONUTF8/JAVA_TOOL_OPTIONS |
| `src/core/node-pty-adapter.ts` | Windows 上用 `chcp 65001` 切换控制台代码页为 UTF-8 | **修复中文乱码（第 2 层 · 根因）**：ConPTY 默认用系统代码页 GBK 解释 UTF-8 输出 |
| `src/dashboard/frontend/components/split-pane.ts:49` | xterm.js 加 `wordWrap: true` | **软换行**：长日志行自动折行，无需横向滚动 |

## 前置依赖

- Node.js >= 18
- Bun（构建工具）：`npm install -g bun`

## 构建

```bash
cd forge-source

# 首次：安装依赖（跳过 postinstall 的 chmod）
npm install --ignore-scripts

# 构建
bun run build
```

构建产物在 `dist/` 目录，包含所有 vendor 静态文件。

## 发布到本地全局

```bash
# 1. 打包
npm pack

# 2. 安装到全局（跳过 postinstall）
npm install -g ./forge-terminal-mcp-0.9.0.tgz --ignore-scripts
```

安装后 `forge` 命令指向全局 node_modules 中的独立副本，不依赖源码目录。

## 日常使用

```bash
# 启动（后台 Daemon + Web Dashboard）
forge start -d --dashboard --port 3141 --shell powershell

# 查看状态
forge status

# 停止
forge stop

# 浏览器打开 Dashboard
# http://127.0.0.1:3141
```

## opencode MCP 配置

```json
{
  "mcp": {
    "forge": {
      "type": "remote",
      "url": "http://127.0.0.1:3141/mcp",
      "enabled": true
    }
  }
}
```
