import { args } from "../config/index.js"
import os from "os";

export const info = (req, res) => {
	console.log('hola')
	res.json({
	args: args,
	platform: process.platform,
	version: process.version,
	rssMemoryUsage: process.memoryUsage().rss,
	execPath: process.execPath,
	pid: process.pid,
	cwd: process.cwd(),
	CPUsNumbers: os.cpus().length,
});
}