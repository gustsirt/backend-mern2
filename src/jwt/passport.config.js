import configObject from "../config/index.js";
import passport from "passport";
import jwt from "passport-jwt";
import GithubStrategy from "passport-github2";
import { UserClass } from "../dao/index.js";

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
        secretOrKey: configObject.jwt_code,
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
        clientID: configObject.gh_client_id,
        clientSecret: configObject.gh_client_secret,
        callbackURL: `http://localhost:${configObject.port}/api/sessions/githubcallback`,
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
