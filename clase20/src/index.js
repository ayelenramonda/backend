import { initMongoDB } from './db/database.js';
import config from './config'
import server from './services/server'


const init = async () => {
	await initMongoDB();
	const puerto = 8080;
  
	server.listen(puerto, () => console.log(`SERVER OK ON PORT ${puerto}`));
  }
  
  init();