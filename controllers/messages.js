const logger = require("../logs/logger");
const Message = require('../models/Messages.js');
const { getChatService, saveChatService } = require("../services/chat");

require('../db/connection.js');

const getChat = async () => {
    const chat = await getChatService();
    return chat;
};

const saveChat = async (obj) => {
    const chat = await saveChatService(obj);
    return chat;
};

class Messages {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    static async save(obj) {
        try {
            const newMensaje = new Message(obj); 
            const data = await newMensaje.save();
            return data; 
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    static async getAll() {
        try {
            const messages = await Message.find();
            return messages;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los Mensajes.', err);
        }
    }
}

module.exports = { Messages, getChat, saveChat }