const { Router } =  require('express')
const ProductosRouter = require('./productos')

// const { formatMessages } = require('../utils/messages');
// const { getWsServer } = require('../services/socket');

const routes = Router()
routes.use('/productos', ProductosRouter )

// routes.get('/saludar', (req, res) => {
// 	const { message } = req.query;
  
// 	if (!message)
// 	  return res.status(400).json({
// 		msg: 'Missing message',
// 	  });
  
// 	const data = {
// 	  username: 'CHATBOT-BOTI',
// 	  text: message,
// 	};
// 	//envio notificacion por ws a todos
// 	const wsServer = getWsServer();
// 	console.log(wsServer);
// 	wsServer.emit('message', formatMessages(data));
// 	res.json({ msg: 'OK' });  //hasta ac es el endpoint normal
//   });



module.exports = routes