import messagesModel from "./models/messages.model.js"

class MessageDaoMongo {
  constructor (){
    this.model = messagesModel
  }

  addMessage = async (newMessage) => {
    await this.model.create(newMessage)
    return await this.getMessages()
  }

  getMessages = async () => await this.model.find({})

  clearMessages = async() => await this.model.deleteMany({})
}

export default MessageDaoMongo;