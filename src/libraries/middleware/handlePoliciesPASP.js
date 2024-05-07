import passport from "passport";
import usersService from "../../modules/users/logic/users.repository.js";
import SimplifiqueUser from "../../modules/users/logic/simplifiqueUser.dto.js";

// ? AUTH JWT BEARER - PASSPORT

export const handleAuth = (policies) => {
  // Policies => ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)
        if (user) {
          const newuser = new SimplifiqueUser(await usersService.getBy({_id: user.id}))
          req.user = newuser
        }
        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.sendUserUnAuthorized('Invalid token')

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.sendUserForbidden('User not authorized')
        next();
      })(req, res, next);      
    } catch (error) {
      next(error)
    }
  };
};