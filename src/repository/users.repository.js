import LastUpdateDTO from '../dto/lastupdate.dto.js';
import CustomRepository from '../libraries/custom/repository.js';
import configObject from '../config/env.js';
import { createHash, isValidPassword } from '../utils/passwords.js';
import createToken from '../utils/createToken.js';
import sendEmailwithLayout from '../utils/sendMail.js';
import CustomError from '../services/errors/errors.js';

class UsersRepository extends CustomRepository {
  constructor(dao) {
    super(dao);
    this.admins = configObject.uadmins || []
    this.admin_pass = configObject.uadmin_pass
  }

  // get         = async (filter)               => await this.dao.get        (filter)
  // getPaginate = async (filter, options)      => await this.dao.getPaginate(filter, options)
  // getBy       = async (filter)               => await this.dao.getBy      (filter)
  // create      = async (newElement)           => await this.dao.create     (newElement)
  // update      = async (eid, elementUpdate)   => await this.dao.update     ({_id: eid}, elementUpdate)
  // delete      = async (filter)               => await this.dao.delete     (filter)

  register = async (userData) => {
    userData.password = createHash(userData.password)
    const userFound = await this.dao.getBy({email: userData.email});
    if (userFound) throw new CustomError(`Ya existe un usuario con ese email. pruebe con otro`)
    return await this.dao.create(userData)
  }
  login = async(userData) => {
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
    await this.dao.update({_id: userFound._id}, {lastconnection: Date()})
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
    return await this.service.update({_id: uid}, {password})
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
    return {
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
      lastupdated: newUser.lastupdated,
      lastconnection: newUser.lastconnection
    }
  }

  adddocument = async (uid, uploadedFiles) => {
    const user = await this.dao.getBy({_id: uid})
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    uploadedFiles.forEach(file => {
      const typeName = file.originalname.includes('perfil')
      ? 'profiles'
      : file.originalname.includes('producto') 
      ? 'products'
      : 'documents';
      
      user.documents.push({
        name: String(file.originalname),
        type: typeName,
        reference: String(file.path)
      });
    });
    await user.save()

    return this.simplifiqueUser(user)
  }

  simplifiqueUser = user => {
    console.log(user);
    return {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      cart: user.cart,
      lastupdated: user.lastupdated,
      lastconnection: user.lastconnection,
      documents: user.documents
    };
  }
  // getDataUserById = async id => {
  //   const user = await this.dao.getBy({_id: id});

  //   return {
  //     id: id,
  //     name: user?.first_name,
  //     lname: user?.last_name,
  //     email: user?.email,
  //     role: user?.role,
  //     cart: user?.cart,
  //     lastupdated: user?.lastupdated,
  //     ...this.handleAccess(user?.role)
  //   };
  // }
  // // AUXILIARY
  // handleAccess = role => {
  //   const access = {}
  //     if (role === 'user_premium') access.accessPremium = true;
  //   return access
  // }
}

export default UsersRepository