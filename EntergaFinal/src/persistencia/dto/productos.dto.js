export default class ProductosDTO {
	constructor({ id, title, price, thumbnail }) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}

export function asDto(prod) {
	if (Array.isArray(prod)) return prod.map((p) => new ProductosDTO(p));
	else return new ProductosDTO(prod);
}
