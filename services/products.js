const { productsDao } = require('../containers/daos');

require('../containers/daos/index');

const getProductsService = async () => {
    const products = await productsDao.getAll();
    return products;
}

const saveProductsService = async (obj) => {
    const products = await productsDao.save(obj);
    return products;
}

const deleteProductService = async (obj) => {
    const products = await productsDao.deleteById(obj);
    return products;
};

const updateProductService = async (id, newData) => {
    const products = await productsDao.update(id, newData);
    return products;
};


module.exports = { getProductsService, saveProductsService, deleteProductService, updateProductService }