import { ProductosModel } from '../models/productos.js';

export const getAll = async (ctx, next) => {
	try {
		ctx.body = {
			status: 'success',
			data: await ProductosModel.find({})
		};
		ctx.status = 200;
	} catch (error) {
		console.log(error);
	}
};

export const save = async (ctx, next) => {
	try {
		console.log(ctx.request);
		const data = ctx.request.body;

		const result = await ProductosModel.create(data);

		ctx.body = {
			status: 'success',
			data: result
		};
		ctx.status = 201;
	} catch (error) {
		console.log(error);
	}
};

export const getById = async (ctx, next) => {
	try {
		const { id } = ctx.params;
		ctx.body = {
			status: 'success',
			data: await ProductosModel.findById(id)
		};
		ctx.status = 200;
	} catch (error) {
		console.log(error);
	}
};

export const updateProduct = async (ctx, next) => {
	try {
		const { id } = ctx.params;

		const data = ctx.request.body;

		await ProductosModel.findByIdAndUpdate(id, data);

		ctx.body = {
			status: 'success',
			data: data
		};
		ctx.status = 200;
	} catch (error) {
		console.log(error);
	}
};

export const removeProduct = async (ctx, next) => {
	try {
		const { id } = ctx.params;
		await ProductosModel.findByIdAndDelete(id);

		ctx.status = 200;
		ctx.body = {
			status: 'success',
			message: `Product deleted with id: ${id}`
		};
	} catch (error) {
		console.log(error);
	}
};
