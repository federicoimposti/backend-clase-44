const { messages } = require('../../../db/memory');
const MemoryContainer = require('../../memory');

class ChatContainerMemory extends MemoryContainer {
    constructor () {
      super(messages) 
    }
}

module.exports = { ChatContainerMemory };