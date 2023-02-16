export default class ProductosDTO {
	constructor({ id, title, price }) {
		this.id = id;
		this.title = title;
		this.price = price;
	}
}

export function asDto(prod) {
	if (Array.isArray(prod)) return prod.map((p) => new ProductosDTO(p));
	else return new ProductosDTO(prod);
}
