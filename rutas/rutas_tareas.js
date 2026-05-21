const express = require('express');
const router = express.Router();

const controlador = require('../controladores/controlador_tarea');

router.get('/', controlador.obtener_tareas);
router.get('/', controlador.crear_tarea);

router.get('/:id', controlador.obtener_tarea);
router.put('/:id', controlador.actualizar_tarea);
router.delete('/:id', controlador.eliminar_tarea);

module.exports = router;