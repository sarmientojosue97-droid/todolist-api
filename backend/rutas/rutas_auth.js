const express = require('express');
const router = express.Router();
const passport = require('passport');
const controlador = require('../controladores/controlador_auth');
const verificarToken = require('../middlewares/verificarToken');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.URL_FRONTEND}/login?error=true`, session: false }),
  controlador.google_callback 
);

router.get('/perfil',
  verificarToken,
  controlador.obtener_perfil
);

router.get('/logout',
  verificarToken,
  controlador.logout
);

module.exports = router;