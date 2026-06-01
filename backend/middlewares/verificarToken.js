const jwt = require('jsonwebtoken');
const respuesta = require('./respuesta');

const verificarToken = (req, res, next) => {

  let token = null;

  const header_auth = req.headers['authorization'];

  if (header_auth) {
    token = header_auth.split(' ')[1];
  }
  if(!token && req.query.token){
    token = req.query.token;
  }

  if (!token) {
    return respuesta.error(
      res,
      401,
      'Acceso denegado. No se proporcionó token de autenticación.',
      { login: '/api/auth/google' }
    );
  }

  try {
    const datos_usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = datos_usuario;
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return respuesta.error(
        res,
        401,
        'El token ha expirado. Por favor vuelve a iniciar sesión.',
        { login: '/api/auth/google' }
      );
    }
    return respuesta.error(
      res,
      401,
      'Token inválido.',
      { login: '/api/auth/google' }
    );
  }
};

module.exports = verificarToken;