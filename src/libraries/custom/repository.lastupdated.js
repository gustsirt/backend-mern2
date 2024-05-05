import LastUpdateDTO from './lastupdate.dto.js';
import CustomRepository from './repository.js';

class CustomRepositoryLU extends CustomRepository {
  constructor(dao) {
    super(dao);
  }

  update      = async (eid, elementUpdate)  => {
    const elementToUpdate = (new LastUpdateDTO(elementUpdate)).things;
    return await this.dao.update({_id: eid}, elementToUpdate)
  }
  
}

export default CustomRepositoryLU