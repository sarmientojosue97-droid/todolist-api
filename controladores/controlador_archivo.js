const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Archivo = require('../modelos/archivo');
const respuesta = require('../middlewares/respuesta');

const carpeta_uploads = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(carpeta_uploads)) {
  fs.mkdirSync(carpeta_uploads, { recursive: true });
  console.log('Carpeta uploads/ creada automáticamente');
}

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpeta_uploads);
  },
  filename: (req, file, cb) => {
    const nombre_unico = Date.now() + '-' + file.originalname;
    cb(null, nombre_unico);
  }
});

const subir = multer({ storage: almacenamiento });
exports.middleware_subida = subir.single('archivo');

exports.listar_archivos = async (req, res) => {
  const archivos = await Archivo.find().sort({ fecha_subida: -1 });
  return respuesta.lista(
    res, 200, 'Archivos obtenidos correctamente',
    archivos,
    { total: archivos.length, pagina: 1, por_pagina: archivos.length, total_paginas: 1 },
    { self: '/api/archivos' }
  );
};

exports.subir_archivo = async (req, res) => {
  if (!req.file) {
    return respuesta.error(
      res, 400,
      'No se recibió ningún archivo. Asegúrate de usar form-data con el campo "archivo"',
      { self: '/api/archivos/subir' }
    );
  }

  const archivo_existente = await Archivo.findOne({nombre_original: req.file.originalname});

  if(archivo_existente){
    if(fs.existsSync(req.file.path)){
      fs.unlinkSync(req.file.path);
    }
    return respuesta.error(res, 409, `Ya existe un archivo llamado "${req.file.originalname}"`,
    {
      self: '/api/archivos/subir',
      existente: `/api/archivos/${archivo_existente._id}`
    });
  }

  console.log('Archivo recibido:', req.file);

  const archivo_nuevo = new Archivo({
    nombre_original: req.file.originalname,
    nombre_guardado: req.file.filename, 
    tipo_mime: req.file.mimetype,
    tamanio: req.file.size,
    ruta: req.file.path 
  });

  const archivo_guardado = await archivo_nuevo.save();

  return respuesta.exito(
    res, 201, 'Archivo subido correctamente',
    archivo_guardado,
    {
      self: `/api/archivos/${archivo_guardado._id}`,
      descargar: `/api/archivos/${archivo_guardado._id}/descargar`,
      eliminar: `/api/archivos/${archivo_guardado._id}`
    }
  );
};

exports.descargar_archivo = async (req, res) => {
  const archivo = await Archivo.findById(req.params.id);
  if (!archivo) {
    return respuesta.error(res, 404, 'Archivo no encontrado',
      { self: `/api/archivos/${req.params.id}` });
  }

  const ruta_completa = path.resolve(archivo.ruta);
  if (!fs.existsSync(ruta_completa)) {
    return respuesta.error(res, 404,
      'El archivo existe en la BD pero no se encontró en el servidor',
      { self: `/api/archivos/${req.params.id}` });
  }
  res.download(ruta_completa, archivo.nombre_original);
};

exports.eliminar_archivo = async (req, res) => {
  const archivo = await Archivo.findById(req.params.id);
  if (!archivo) {
    return respuesta.error(res, 404, 'Archivo no encontrado',
      { self: `/api/archivos/${req.params.id}` });
  }

  const ruta_completa = path.resolve(archivo.ruta);
  if (fs.existsSync(ruta_completa)) {
    fs.unlinkSync(ruta_completa);
  }

  await Archivo.findByIdAndDelete(req.params.id);

  return respuesta.exito(res, 200, 'Archivo eliminado correctamente',
    { id: req.params.id, nombre: archivo.nombre_original },
    { lista: '/api/archivos' }
  );
};