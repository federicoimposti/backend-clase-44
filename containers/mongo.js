const logger = require('../logs/logger');

require('../db/connection');

module.exports = class MongoContainer {
    constructor(schema) {
      this.schema = schema;    
    }

    async getAll() {
        try {
            const allItems = await this.schema.find();
            return allItems;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los registros.', err);
        }
    }

    async save(element) {
        try {
            const elementNew = new this.schema(element); 
            const data = await elementNew.save();
            return data; 
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el elemento.', err);
        }
    }

    async deleteById(id) {
        try {
            const item = await this.schema.findOneAndDelete({ _id: id });

            if (!item) {
                return;
            }

            return item;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error eliminando el elemento.', err);
        }
    }

    async update(id, newData) {
        try {
            const item = await this.schema.findOneAndUpdate({ _id: id }, newData);
            return item;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error ('Ocurrió un error actualizando el elemento.', err);
        }
    };
}