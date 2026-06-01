const express = require('express');
const router = express.Router();
const controlador = require('../controladores/controlador_tarea');
const verificarToken = require('../middlewares/verificarToken'); // ← NUEVO

router.get('/', verificarToken, controlador.obtener_tareas);
router.post('/', verificarToken, controlador.crear_tarea);

router.get('/:id', verificarToken, controlador.obtener_tarea);
router.put('/:id', verificarToken, controlador.actualizar_tarea);
router.patch('/:id/completar', verificarToken, controlador.completar_tarea);
router.delete('/:id', verificarToken, controlador.eliminar_tarea);

module.exports = router;