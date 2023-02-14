export default class ProductosDTO {
	constructor({ title, price }) {
		this.title = title;
		this.price = price;
	}
}

export function asDto(prod) {
	if (Array.isArray(prod)) return prod.map((p) => new ProductosDTO(p));
	else return new ProductosDTO(prod);
}
