import { ProductosModel } from '../persistencia/daos/daoMongoDB/schema/schema.productos.js';
import { app } from '../index.js';
import mongoose from 'mongoose';
import request from 'supertest';

const url = 'http://localhost:8080/';
describe('Tests productos', () => {
	jest.setTimeout(60000);
	beforeEach(async () => {
		await mongoose.connection.collections['productos'].drop();
	});

	it('guardar producto', async () => {
		const doc = {
			title: 'detergente',
			price: 1600,
			thumbnail: 'www.google.com',
			stock: 20000
		};
		await ProductosModel.create(doc);
		const response = await request(app).post('/api/productos/');
		// expect(response.statusCode).toBe(200);
		// expect(response.body.title).toBe(doc.title);
		// expect(response.body.price).toBe(doc.price);
	});

	it('traer productos', async () => {
		const doc = {
			title: 'detergente',
			price: 1500,
			thumbnail: 'www.google.com',
			stock: 20000
		};
		await ProductosModel.create(doc);
		const response = await request(app).get('/api/productos/list');
		// 	// expect(response.statusCode).toBe(200);
		// 	// expect(response.body).toHaveLength(1);
		// 	// expect(response.body[0].title).toBe(doc.title);
		// 	// expect(response.body).toBeInstanceOf(Array);
	});

	it('delete producto', async () => {
		const doc = {
			title: 'detergente',
			price: 1500,
			thumbnail: 'www.google.com',
			stock: 20000
		};
		const responseCreate = await ProductosModel.create(doc);
		const response = await request(app).delete(`/api/productos/${responseCreate._id}`);
	});
});
