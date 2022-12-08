const bcrypt = require('bcrypt');
const { users } = require('../../../db/memory');
const MemoryContainer = require('../../memory');


class UserContainerMemory extends MemoryContainer {
    constructor () {
      super(users) 
    }

    async save(user) {
      try {
        const users = await this.list();
        const userExist = users.find(user => user.email === user.email); 
        if (userExist) {
          return;
        } else {
          const hashPass = await bcrypt.hash(user.password, 8)
          user.password = hashPass;
          const data = await super.save(user); 
          console.log(users);          
          return data;
        }      
      } catch (error) {
        console.log(error);
      }
    }
}

module.exports = { UserContainerMemory };