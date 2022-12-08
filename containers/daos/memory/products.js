const { products } = require('../../../db/memory');
const MemoryContainer = require('../../memory');

class ProductsContainerMemory extends MemoryContainer {
    constructor () {
      super(products) 
    }
}

module.exports = { ProductsContainerMemory };