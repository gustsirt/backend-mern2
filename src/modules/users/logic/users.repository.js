import configObject from '../../../config/env.js';
import CustomRepository from '../../../libraries/custom/repository.js';
import SimplifiqueUser from './simplifiqueUser.dto.js';
import { createHash, isValidPassword } from '../../../libraries/passwords.js';
import createToken from '../../../libraries/createToken.js';
import sendEmailwithLayout from '../../../libraries/mail/sendMail.js';
import CustomError from '../../../services/errors/errors.js';
import dayjs from 'dayjs';

class UsersRepository extends CustomRepository {
  constructor(dao) {
    super(dao);
    this.admins = configObject.uadmins || []
    this.admin_pass = configObject.uadmin_pass
  }

  register = async (userData) => {
    userData.password = createHash(userData.password)
    const userFound = await this.dao.getBy({email: userData.email});
    if (userFound) throw new CustomError(`Ya existe un usuario con ese email. pruebe con otro`)
    return await this.dao.create(userData)
  }

  login = async (userData) => {
    // Admin Verification
    if (this.admins.includes(userData.email)) {
      if (isValidPassword(userData.password, {password: this.admin_pass})) {
        const token = createToken({id: 0, role: "admin"})
        return {name: "Admin", token}
      } else {
        throw new CustomError(`Email o contraseña equivocado`);
      }
    }
    // User Verification
    const userFound = await this.dao.getBy({email: userData.email});
    if (!userFound || !isValidPassword(userData.password, userFound)) {
      throw new CustomError(`Email o contraseña equivocado`);
    }

    const token = createToken({id: userFound._id, role: userFound.role})
    await this.dao.update({_id: userFound._id}, {lastconnection: new Date()})
    return {name: userFound.first_name, token}
    
  }

  logout = async () => {}

  userRecovery = async (email) => {    
    const userFound = await this.dao.getBy({email});
    const token = createToken({id: userFound._id, role: userFound.role}, '1h')

    // enviar mail de recuperación
    const user = { name: userFound.first_name, email: userFound.email}
    const subject   = 'Recuperar Contraseña'
    const options = {
      user,
      url: `${configObject.cors_origin}/#/recoverypassword`,
      token
    }
    return await sendEmailwithLayout(options, subject, "recoveryUser")
  }
  
  updatePassword = async (uid, password) => {
    password = createHash(password)
    return await this.dao.update({_id: uid}, {password})
  }
  update      = async (eid, elementUpdate)  => {
    const elementToUpdate = (new LastUpdateDTO(elementUpdate)).things;
    return await this.dao.update({_id: eid}, elementToUpdate)
  }

  switchRole = async (uid, role) => {
    const user = await this.dao.getBy({_id: uid});
    if (!user) throw new CustomError('Usuario no encontrado');

    if (user.role == 'user') {
      user.role = role;
      user.lastupdated = new Date();
    } else {
      user.role = 'user'
      user.lastupdated = new Date();
    }
    const newUser = await this.dao.update({_id: uid}, user);
    return new SimplifiqueUser(newUser)
  }

  delete = async (hs = 3) => {
    const timelimit = dayjs().subtract(hs, 'hour').toDate();

    const result = await this.dao.deleteMany({
      lastconnection: { $lt: timelimit },
    });

    return result
  }
}

import UserDaoMongo from '../data/dao.mongo.js';
const usersService = new UsersRepository(new UserDaoMongo())
export default usersService