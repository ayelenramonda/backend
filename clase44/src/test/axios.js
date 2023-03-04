import axios from 'axios';

export const axiosGet = async () => {
	try {
		const response = await axios.get('http://localhost:8080/api/productos/list');
		console.log(response.data);
	} catch (error) {
		console.log(error.message);
	}
};

const data = {
	title: 'copas de vidrio',
	price: 5000,
	thumbnail: 'www.e.com',
	stock: 10
};

const urlPost = 'http://localhost:8080/api/productos';

export const axiosPost = async () => {
	try {
		const resp = await axios.post(urlPost, data);
		console.log(resp.data);
	} catch (err) {
		console.log(err);
	}
};

const urlDelete = 'http://localhost:8080/api/productos/63f34ba6be9298ce5657c36a';

export const axiosDelete = async () => {
	try {
		const resp = await axios.delete(urlDelete);
		console.log(resp.data);
	} catch (err) {
		console.log(err);
	}
};

//axiosGet();
axiosPost();
//axiosDelete();
