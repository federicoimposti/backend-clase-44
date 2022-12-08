const MongoContainer = require('../../mongo');
const Message = require('../../../models/Messages');

class ChatContainerMongo extends MongoContainer {
    constructor () {
      super(Message) 
    }
}

module.exports = { ChatContainerMongo };