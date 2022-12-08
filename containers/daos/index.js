const dotenv = require("dotenv");
dotenv.config();

const minimist = require('minimist');

const optionsMinimist = {alias: { ps: 'pers' }};
const argv = minimist(process.argv.slice(2), optionsMinimist);

const { ProductsContainerMemory } = require('./memory/products');
const { ChatContainerMemory } = require('./memory/chat');
const { UserContainerMemory } = require('./memory/register');
const { ProductsContainerMongo } = require('./mongo/products');
const { ChatContainerMongo } = require('./mongo/chat');
const { UserContainerMongo } = require('./mongo/register');

const PERS = argv.pers || 'mongodb';

let instance = null;

let productsDao;
let chatDao;
let userDao;

class DaosFactory {
    create(PERS) {
        switch (PERS) {
            case 'memory':
                productsDao = new ProductsContainerMemory();
                chatDao = new ChatContainerMemory();
                userDao = new UserContainerMemory();
            break;
        
            case 'mongodb':
                productsDao = new ProductsContainerMongo();
                chatDao = new ChatContainerMongo();
                userDao = new UserContainerMongo();
            break;
        
            default:
                break;
        }
    }

    static getInstance() {
        if(!instance) {
            instance = new DaosFactory(PERS);
        }

        return instance;
    }
}

const daosInstance = DaosFactory.getInstance();
const daosInstance2 = DaosFactory.getInstance();

console.log('Singleton instance validation check -> ', daosInstance === daosInstance2);

daosInstance.create(PERS);

module.exports = { productsDao, chatDao, userDao };