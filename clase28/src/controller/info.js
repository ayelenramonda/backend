import config from "../config/index.js";

export const info = (req, res) => {
	console.log('hola')
	res.json({
	argv: config.argv,
	platform: process.platform,
	version: process.version,
	rssMemoryUsage: process.memoryUsage().rss,
	execPath: process.execPath,
	pid: process.pid,
	cwd: process.cwd(),
});
}