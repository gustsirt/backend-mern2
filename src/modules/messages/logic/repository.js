import CustomRepositoryLU from "../../../libraries/custom/repository.lastupdated.js";

class MessageRepository extends CustomRepositoryLU {
  constructor(dao) {
    super(dao);
  }
}

import MessageDaoMongo from "../data/dao.mongo.js";
export const messagesService = new MessageRepository  (new MessageDaoMongo())
export default messagesService