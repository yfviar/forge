import * as pty from "node-pty";
import type { PtyProcess, PtySpawnFn, PtySpawnOptions } from "./pty-adapter.js";

function buildCommand(command: string, args: string[]): { command: string; args: string[] } {
  if (process.platform !== "win32") return { command, args };

  // On Windows, wrap through cmd.exe to set console code page to UTF-8 (65001)
  // before executing the actual command. This prevents GBK/CP936 encoding issues
  // that occur when ConPTY misinterprets UTF-8 output from the spawned process.
  const fullCmd = [command, ...args]
    .map(a => a.includes(" ") ? `"${a}"` : a)
    .join(" ");
  return {
    command: process.env.ComSpec || "cmd.exe",
    args: ["/d", "/c", `chcp 65001 >nul && ${fullCmd}`],
  };
}

export const spawn: PtySpawnFn = (
  command: string,
  args: string[],
  options: PtySpawnOptions,
): PtyProcess => {
  const { command: finalCmd, args: finalArgs } = buildCommand(command, args);
  const proc = pty.spawn(finalCmd, finalArgs, {
    name: options.name ?? "xterm-256color",
    cols: options.cols,
    rows: options.rows,
    cwd: options.cwd,
    env: options.env,
  });

  return {
    get pid() {
      return proc.pid;
    },
    onData(cb) {
      proc.onData(cb);
    },
    onExit(cb) {
      proc.onExit(cb);
    },
    write(data) {
      proc.write(data);
    },
    resize(cols, rows) {
      proc.resize(cols, rows);
    },
    kill() {
      proc.kill();
    },
  };
};
