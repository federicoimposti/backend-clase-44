const logger = require('../logs/logger');
const { saveUserService } = require('../services/user');

const saveUser = async (obj) => {
  try {
    const user = await saveUserService(obj);
    return user;
  } catch (e) {
    logger.error(`Error: ${err}`);
    throw new Error('Ocurrió un error al guardar el usuario.', err);
  }
};


module.exports = { saveUser };