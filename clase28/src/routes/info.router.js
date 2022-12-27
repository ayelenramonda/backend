import express from "express";
import config from '../config/index.js'

const info = (req, res) => {
	console.log('hola')
// 	res.json({
// 	argv: config.argv,
// 	platform: process.platform,
// 	version: process.version,
// 	rssMemoryUsage: process.memoryUsage().rss,
// 	execPath: process.execPath,
// 	pid: process.pid,
// 	cwd: process.cwd(),
// });
}

const routes = express.Router();
routes.get('/info', info)


export default routes;


