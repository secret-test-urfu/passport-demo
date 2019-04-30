import passport from 'passport';
import passportLocal from 'passport-local';

import { UserDeserializer, UserSerializer } from 'server/lib/passport/serialization';
import { LocalStrategyVerifier } from 'server/lib/passport/verification';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser(new UserSerializer().serialize);
passport.deserializeUser(new UserDeserializer().deserialize);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    new LocalStrategyVerifier().verify
  )
);

export { passport };
