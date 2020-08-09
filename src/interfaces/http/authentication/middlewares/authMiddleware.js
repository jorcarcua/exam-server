const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const AuthMiddleware = ({ config, checkCredentials, findUser }) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const result = await checkCredentials(username, password);
        done(null, result);
      } catch (error) {
        done(error, null);
      }
    })
  );

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.JWT_SECRET;
  opts.algorithms = [config.JWT_ALGORITHM];

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      const user = await findUser({ _id: jwtPayload.sub });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
  );

  return passport.initialize();
};

module.exports = AuthMiddleware;
