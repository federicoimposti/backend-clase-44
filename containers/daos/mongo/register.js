const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const MongoContainer = require('../../mongo');

class UserContainerMongo extends MongoContainer {
    constructor () {
      super(User) 
    }

    async save(user) {
        const newUser = new User(user); 
        try {
          const userExist = await User.findOne({email: user.email});
          if (userExist) { 
            return false; 
          } else { 
            const hashPass = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashPass; 
            await newUser.save();
            return newUser; 
          } 
        } catch (error) {
          console.log(error);
        }
    }
}

module.exports = { UserContainerMongo };