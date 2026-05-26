const passport = require('passport');
const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const Usuario = require('../modelos/usuario');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      let usuario = await Usuario.findOne({ google_id: profile.id });
      if (usuario) {
        return done(null, usuario);
      }
      usuario = new Usuario({
        google_id: profile.id,
        nombre: profile.displayName,
        email: profile.emails[0].value,
        foto: profile.photos[0]?.value || ''
      });

      await usuario.save();
      return done(null, usuario);

    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;