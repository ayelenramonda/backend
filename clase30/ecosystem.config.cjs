module.exports = {
	apps: [
	  {
		name: "app1",
		script: "./src/index.js",
		watch: true,
		autorestart: true,
		exec_mode: "fork",
		args: "--puerto=8081 --modo=cluster",
	  },
	  {
		name: "app2",
		script: "./src/index.js",
		watch: true,
		autorestart: true,
		exec_mode: "cluster",
		instances: "max",
		args: "--puerto=8082 ",
	  },
	  {
		name: "app3",
		script: "./src/index.js",
		watch: true,
		autorestart: true,
		exec_mode: "cluster",
		instances: "max",
		args: "--puerto=8083",
	  },
	  {
		name: "app4",
		script: "./src/index.js",
		watch: true,
		autorestart: true,
  
		args: "--puerto=8084 --modo=cluster",
	  },
	],
  };