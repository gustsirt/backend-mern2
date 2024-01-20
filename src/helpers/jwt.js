import "dotenv/config";
import jwt from "jsonwebtoken";
import { resError } from "./index.js";
const JWT_PRIVATE_KEY = process.env.SECRETCODE;

export const createToken = (user) =>
  jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: "1d" });

  // middelware
export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) resError(res, 401, "No authenticaded", "jwt-authToken")
  
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_PRIVATE_KEY, (err, userDecode) => {
    if (err) resError(res, 401, "Unauthorized", "jwt-authToken")
    req.user = userDecode;
    next();
  });

  //renderPage(res,"register","Nuevo Registro",{control: {answer: error.message }});
};
