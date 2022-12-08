const logger = require('../logs/logger');

require('../db/connection');

module.exports = class MemoryContainer {
    constructor(memory) {
      this.memory = memory;    
    }

    async save(obj) {
        try {
            const items = await this.getAll();
            obj.timestamp = Date.now();

            if (!items || !items.length) {
                obj.id = 1;
                this.memory.push(obj);

                return this.memory;
            }

            const lastItem = items.slice(-1);
            obj.id = parseInt(lastItem[0]?.id) + 1;
            
            const addItem = [...items, obj];
            this.memory = addItem;
            return addItem;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getAll() {
        try {
            const items = this.memory;
            return items ? items : null;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }
}