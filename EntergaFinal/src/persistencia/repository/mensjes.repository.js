import { asDto } from '../dto/mensajes.dto.js';
import { getDaoMsg } from '../daos/factory.js';

export default class MensajesRepository {
	constructor() {
		this.dao = getDaoMsg();
	}

	async getAllMsg() {
		try {
			const mensajes = await this.dao.getAllMsg();
			const dtoMsg = asDto(mensajes);

			return dtoMsg;
		} catch (err) {
			console.log(err);
		}
	}

	async saveMsg(data) {
		try {
			const newMessage = await this.dao.saveMsg(data);
			console.log(newMessage);
			return newMessage;
		} catch (err) {
			return { error: 'No se pudo ingresar el mensaje' };
		}
	}

	async getByIdMsg(id) {
		const getMsg = await this.dao.getByIdMsg(id);
		return getMsg;
	}
}
