const { userDao } = require('../containers/daos');

require('../containers/daos/index');

const saveUserService = async (obj) => {
    const user = await userDao.save(obj);
    return user;
}

module.exports = { saveUserService }