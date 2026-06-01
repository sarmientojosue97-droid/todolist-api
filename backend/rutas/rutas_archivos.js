const express = require('express');
const router = express.Router();
const controlador = require('../controladores/controlador_archivo');
const verificarToken = require('../middlewares/verificarToken');

router.get('/', verificarToken, controlador.listar_archivos);

router.post('/subir',
  verificarToken,
  controlador.middleware_subida,
  controlador.subir_archivo
);

router.get('/:id/descargar', verificarToken, controlador.descargar_archivo);
router.delete('/:id', verificarToken, controlador.eliminar_archivo);

module.exports = router;