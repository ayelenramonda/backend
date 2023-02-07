import { createProduct, getAll, getByIdPro, deleteProduct } from "../persistence/persistence.js";

export async function newProduct(producto){
    const prod = await createProduct(producto)
    return prod;
};

export async function getAllProducts() {
    const products = await getAll();
    return products;
};

export async function getByIdProduct() {
    const products = await getByIdPro();
    return products;
};

export async function deleteOneProduct() {
    const products = await deleteProduct();
    return products;
};