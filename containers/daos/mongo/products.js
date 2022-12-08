const MongoContainer = require('../../mongo');
const Item = require('../../../models/Products');

class ProductsContainerMongo extends MongoContainer {
    constructor () {
      super(Item) 
    }
}

module.exports = { ProductsContainerMongo };