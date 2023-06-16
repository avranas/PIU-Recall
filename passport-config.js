
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const passport = require('passport');
const User = require('./db/Models/User');

passport.use(
  new LocalStrategy({ usernameField: 'username' }, async function (
    username,
    password,
    done
  ) {
    try {
      console.log(username)
      console.log(password)
      console.log("----------")
      const user = await User.findOne({ where: { username: username } });
      if (!user) return done(null, false);
      const passwordIsCorrect = await bcrypt.compare(password, user.password);
      if (!passwordIsCorrect) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
// Is this the correct place for this?
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  console.log('deserializing');
  const user = await User.findOne({
    where: { id: id },
  });
  done(null, user);
});

module.exports = passport;