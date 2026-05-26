const crypto = require('crypto');   // viene con Node, no instalar
const Tarea = require('../modelos/tarea');
const respuesta = require('../middlewares/respuesta');

exports.obtener_tareas = async (req, res) => {
  const pagina = parseInt(req.query.page)  || 1;
  const por_pagina  = parseInt(req.query.limit) || 10;
  const saltar = (pagina - 1) * por_pagina;

  const [tareas, total] = await Promise.all([
    Tarea.find()
         .sort({ fecha_creacion: -1 })
         .skip(saltar) 
         .limit(por_pagina), 
    Tarea.countDocuments() 
  ]);

  const total_paginas = Math.ceil(total / por_pagina);
  const etag = '"' + crypto
    .createHash('md5')
    .update(JSON.stringify(tareas))
    .digest('hex') + '"';

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }

  res.set('ETag', etag);
  res.set('Cache-Control', 'private, must-revalidate');

  return respuesta.lista(
    res,
    200,
    'Tareas obtenidas correctamente',
    tareas,
    { total, pagina, por_pagina, total_paginas },
    {
      self: `/api/tareas?page=${pagina}&limit=${por_pagina}`,
      next: pagina < total_paginas ? `/api/tareas?page=${pagina + 1}&limit=${por_pagina}` : null,
      previous: pagina > 1  ? `/api/tareas?page=${pagina - 1}&limit=${por_pagina}` : null
    }
  );
};

exports.obtener_tarea = async (req, res) => {

  const tarea = await Tarea.findById(req.params.id);

  if (!tarea) {
    return respuesta.error(
      res,
      404,
      'Tarea no encontrada',
      { self: `/api/tareas/${req.params.id}` }
    );
  }

  return respuesta.exito(
    res,
    200,
    'Tarea obtenida correctamente',
    tarea,
    {
      self: `/api/tareas/${tarea._id}`,
      actualizar: `/api/tareas/${tarea._id}`,
      completar: `/api/tareas/${tarea._id}/completar`,
      eliminar: `/api/tareas/${tarea._id}`
    }
  );
};

exports.crear_tarea = async (req, res) => {

  if (!req.body.titulo || req.body.titulo.trim() === '') {
    return respuesta.error( res, 400, 'El título es obligatorio', { self: '/api/tareas' } );
  }

  const tarea_nueva = new Tarea({
    titulo: req.body.titulo.trim(),
    descripcion: req.body.descripcion || ''
  });

  const tarea_guardada = await tarea_nueva.save();
  return respuesta.exito(
    res,
    201,
    'Tarea creada correctamente',
    tarea_guardada,
    {
      self:`/api/tareas/${tarea_guardada._id}`,
      actualizar: `/api/tareas/${tarea_guardada._id}`,
      completar:`/api/tareas/${tarea_guardada._id}/completar`,
      eliminar:`/api/tareas/${tarea_guardada._id}`
    }
  );
};

exports.actualizar_tarea = async (req, res) => {

  if (!req.body.titulo && !req.body.descripcion) {
    return respuesta.error(
      res,
      400,
      'Debes enviar al menos el título o la descripción para actualizar',
      { self: `/api/tareas/${req.params.id}` }
    );
  }

  const campos_a_actualizar = {};
  if (req.body.titulo) campos_a_actualizar.titulo = req.body.titulo.trim();
  if (req.body.descripcion !== undefined) campos_a_actualizar.descripcion  = req.body.descripcion;

  const tarea_actualizada = await Tarea.findByIdAndUpdate(
    req.params.id,
    campos_a_actualizar,
    { returnDocument: 'after' }
  );

  if (!tarea_actualizada) {
    return respuesta.error(
      res,
      404,
      'Tarea no encontrada',
      { self: `/api/tareas/${req.params.id}` }
    );
  }

  return respuesta.exito(
    res,
    200,
    'Tarea actualizada correctamente',
    tarea_actualizada,
    {
      self: `/api/tareas/${tarea_actualizada._id}`,
      completar: `/api/tareas/${tarea_actualizada._id}/completar`,
      eliminar: `/api/tareas/${tarea_actualizada._id}`
    }
  );
};

exports.completar_tarea = async (req, res) => {

  if (typeof req.body.completada !== 'boolean') {
    return respuesta.error(
      res,
      400,
      'El campo completada debe ser true o false',
      { self: `/api/tareas/${req.params.id}/completar` }
    );
  }

  const tarea_actualizada = await Tarea.findByIdAndUpdate(
    req.params.id,
    { completada: req.body.completada },  // solo este campo
    { returnDocument: 'after' }
  );

  if (!tarea_actualizada) {
    return respuesta.error(
      res,
      404,
      'Tarea no encontrada',
      { self: `/api/tareas/${req.params.id}` }
    );
  }

  const mensaje = req.body.completada
    ? 'Tarea marcada como completada'
    : 'Tarea desmarcada';

  return respuesta.exito(
    res,
    200,
    mensaje,
    tarea_actualizada,
    {
      self: `/api/tareas/${tarea_actualizada._id}`,
      actualizar: `/api/tareas/${tarea_actualizada._id}`,
      eliminar: `/api/tareas/${tarea_actualizada._id}`
    }
  );
};

exports.eliminar_tarea = async (req, res) => {

  const tarea_eliminada = await Tarea.findByIdAndDelete(req.params.id);

  if (!tarea_eliminada) {
    return respuesta.error(
      res,
      404,
      'Tarea no encontrada',
      { self: `/api/tareas/${req.params.id}` }
    );
  }

  return respuesta.exito(
    res,
    200,
    'Tarea eliminada correctamente',
    { id: req.params.id },
    { lista: '/api/tareas' }
  );
};