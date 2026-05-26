const jwt = require('jsonwebtoken');
const respuesta = require('../middlewares/respuesta');

exports.google_callback = (req, res) => {
  const usuario = req.user;
  const token = jwt.sign(
    {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      foto: usuario.foto
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
  const url_frontend = process.env.URL_FRONTEND || 'http://localhost:5173';
  res.redirect(`${url_frontend}/auth/callback?token=${token}`);
};

exports.obtener_perfil = (req, res) => {
  return respuesta.exito(
    res,
    200,
    'Perfil obtenido correctamente',
    req.usuario,
    { self: '/api/auth/perfil' }
  );
};

exports.logout = (req, res) => {
  return respuesta.exito(
    res,
    200,
    'Sesión cerrada. Elimina el token del lado del cliente.',
    null,
    { login: '/api/auth/google' }
  );
};