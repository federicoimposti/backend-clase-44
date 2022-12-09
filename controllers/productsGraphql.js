const fs = require('fs');
const logger = require('../logs/logger');
const Item = require('../models/Products.js');

require('../db/connection.js');
const { getProductsService, saveProductsService, deleteProductService, updateProductService } = require('../services/products.js');

const error = { error: 'Producto no encontrado' };

const getProducts = async () => {
    const products = await getProductsService();
    return products;
};

const saveProducts = async ({datos}) => {
    const products = await saveProductsService(datos);
    return products;
};

const deleteProduct = async ({ _id }) => {
    console.log(_id)
    const products = await deleteProductService(_id);
    return products;
};

const updateProduct = async (datosQuery) => {
    const { _id, datos } = datosQuery;
    const products = await updateProductService(_id, datos);
    return products;
};

class productsController {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    static async save(product) {
        try {
            const newProduct = new Item(product); 
            const data = await newProduct.save();
            return data; 
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el producto.', err);
        }
    }

    static getById(id) {
        try {
            if (!products) {
                return error;
            }

            const product = products.find(product => product.id === id);
            return product ? product : error;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    static async getAll() {
        try {
            const productos = await Item.find();
            return productos;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }

    // static getAllFaker() {
    //     return fakerProducts.fakerList();
    // }

    static deleteById(id) {
        try {
            if (!products) {
                return error;
            }

            const product = this.getById(id);
        
            if(product?.id){
                const productsFiltered = products.filter(product => product.id !== id);
                products = productsFiltered;
                return productsFiltered;
            } else {
                return error;
            }
            
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
        
    }

    static async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error ('Ocurrió un error eliminando los productos.', err);
        }
        
    }

    static update(id, newData) {
        try {
            const { title, price, thumbnail } = newData;
            const productId = id;

            const product = this.getById(productId);
        
            if(product?.id){
                products.forEach(product => {
                    const id = product.id;
                    if(productId === id){
                        product.title = title;
                        product.price = price;
                        product.thumbnail = thumbnail;
                    }
                });

                return product;
            } else {
                return error;
            }
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error ('Ocurrió un error actualizando el producto.', err);
        }
      };
}


module.exports = { productsController, getProducts, saveProducts, deleteProduct, updateProduct }