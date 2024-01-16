import "dotenv/config";
import passport from "passport";
import GithubStrategy from "passport-github2";
import { UserClass } from "../daos/index.js";

const userService = new UserClass();

const initializePassport = () => {
  // Github
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/api/sessions/githubcallback`,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          //console.log(profile);
          let user = await userService.getUserByMail(profile._json.email);
          console.log(user);
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

  // guardar y recuperra credenciales del usuario de session

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userService.geUsertBy({ _id: id });
    done(null, user);
  });
};

export default initializePassport;
