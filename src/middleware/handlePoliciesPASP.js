import passport from "passport";
import UsersController from "../controller/users.controller.js";

const uControl = new UsersController();

// ? AUTH JWT BEARER - PASSPORT

/* export const handleAuth = (policies) => {
  // Policies => ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)
        console.log(1111,user);
        if (user) {
          req.user = await uControl.getDataUserById(user.id)
        }

        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.sendUserError('Invalid token')

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.sendUserError('User not authorized')
        next();
      })(req, res, next);      
    } catch (error) {
      next(error)
    }
  };
}; */

// ? TRATANDO DE USAR AUTH JWT SIN PASSPORT
import  jwt from "jsonwebtoken";
import configObject from "../config/index.js";
const JWT_PRIVATE_KEY = configObject.jwt_code;
export const handleAuth = (policies) => {
  return async (req, res, next) => {
    try {
      console.log('00000');
      if(policies[0] === 'PUBLIC') return next();
      console.log(req.headers);
      const authHeader = req.headers.Authorization;
      if (!authHeader) return res.sendUserUnAuthorized("No authenticaded")
      console.log("111 "); // llega
      const token = authHeader.split(" ")[1];
      const decodedUser = await verifyToken(token, JWT_PRIVATE_KEY); // Valida el token

      console.log("1212 ", decodedUser); // llega
      if (!decodedUser) return res.sendUserUnAuthorized("Unauthorized");

      console.log("2222 ",decodedUser);
      req.user = await uControl.getDataUserById(decodedUser.id)
      //console.log("3333 ", req.user );

      if(req.user.role.toUpperCase() === 'ADMIN') return next();

      if(!policies.includes(req.user.role.toUpperCase())) return res.sendUserForbidden('User not authorized')
      //console.log("3444 ")
      next();
    } catch (error) {
      next(error)
    }
  };
};

export const verifyToken = async (token, secretKey) => {
  try {
    const decodedUser = await jwt.verify(token, secretKey);
    return decodedUser;
  } catch (error) {
    return null;
  }
};

// ? AUTH JWT COKKIES - PASSPORT
/* export const handleAuthFront = (policies) => {
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)

        if (user) {
          req.user = await uControl.getDataUserById(user.id)
          //console.log(req.user);
        }

        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.clearCookie('token').render("login", {title: "Login", answer: 'Usuario no logueado' })

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.render('error', {title: 'Ha ocurrido un error', answer: 'User not authorized', ...req.user})

        next();
      })(req, res, next);      
    } catch (error) {
      next(error)
    }
  };
}; */

// ? AUTH JWT COKKIES - PASSPORT
/* export const handleAuth = async (policies) => {
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)

        if (user) {
          req.user = await uControl.getDataUserById(user.id)
        }

        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.sendUserError('Invalid token')

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.sendUserError('User not authorized')
        next();
      })(req, res, next);      
    } catch (error) {
      next(error)
    }
  };
}; */
