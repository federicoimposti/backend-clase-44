const { chatDao } = require('../containers/daos');

require('../containers/daos/index');

const getChatService = async () => {
    const chat = await chatDao.getAll();
    return chat;
}

const saveChatService = async (obj) => {
    const chat = await chatDao.save(obj);
    return chat;
}

module.exports = { getChatService, saveChatService }