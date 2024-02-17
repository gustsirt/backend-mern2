import CustomError from "../../utils/errors.js";
import { renderPage } from "../../helpers/responses.js";

// AUTORIZACION TOKEN - SIN PASSPORT
// ------------------------------------------------------------------------------------
/*export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) resError(res, 401, "No authenticaded", "jwt-authToken")
  
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_PRIVATE_KEY, (err, userDecode) => {
    if (err) resError(res, 401, "Unauthorized", "jwt-authToken")
    req.user = userDecode;
    next();
  });

  //renderPage(res,"register","Nuevo Registro",{control: {answer: error.message }});
};*/

// TOKEN COOKIES
// ------------------------------------------------------------------------------------
// authorization( ['USER', 'USER_PREMUIM'] )

export const authorizationJwt = (roleArray) => {
  return (req, res, next) => {
    try {
      if(!req.user) throw new CustomError('Unauthorized', 401)
      if(!roleArray.includes(req.user.role.toUpperCase())) throw new CustomError('Not permissions', 403)
      next()
    } catch (error) {
      if (error instanceof CustomError) {
        renderPage(res,"login","Inicio",{control: {answer: error.message }});
      } else {
        renderPage(res,"login","Inicio",{control: {answer: 'Ocurrio un error, vuelva a intentarlo'}});
      }
    }
  };
};

export default authorizationJwt
