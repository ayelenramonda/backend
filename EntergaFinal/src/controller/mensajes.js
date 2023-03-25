import { saveMensaje, getAllMensajes, getByIdMsg } from '../services/mensajes.services.js';

export const saveMsgController = async (req, res) => {
	const { body } = req;
	try {
		const msg = await saveMensaje(body);
		console.log(msg + 'controller');
		res.send(msg);
	} catch (error) {
		console.log(error);
	}
};

export const getAllControllerMsg = async (req, res) => {
	try {
		const msg = await getAllMensajes();
		console.log(msg);
		return msg;
	} catch (error) {
		console.log(error);
	}
};

export const getByIdCMsg = async (req, res) => {
	try {
		const { id } = req.params;
		let mesg = await getByIdMsg(id);
		console.log(mesg);
		return mesg;
	} catch (error) {
		console.log(error);
	}
};
