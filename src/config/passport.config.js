import "dotenv/config";
import passport from "passport";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { UserClass } from "../daos/index.js";
const JWT_PRIVATE_KEY = process.env.SECRET_CODE;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const userService = new UserClass();

const initializePassport = () => {
  // JWT
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["token"];
    }
    return token;
  };

  passport.use("jwt", new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          //console.log(jwt_payload); // resultado token
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  // Github
  passport.use("github",new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/api/sessions/githubcallback`,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          //console.log(profile);
          let user = await userService.getUserByMail(profile._json.email);
          //console.log(user);
          if (!user) {
            // para registrar en caso de que no exista
            let userNew = {
              first_name: profile.username,
              last_name: profile.username,
              email: profile._json.email,
              password: " ",
            };
            let result = await userService.createUser(userNew);
            return done(null, result);
          }
          done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
  // passsport.use("nombre", instancia clase strategia --> (obj conf , callback))
  // funcion done(error, usuario, {message: "mensaje error"})
};

export default initializePassport;
