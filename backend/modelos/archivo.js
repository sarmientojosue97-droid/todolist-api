const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Esquema_Archivo = new Schema({
  nombre_original: {
    type: String,
    required: true
  },
  nombre_guardado: {
    type: String,
    required: true
  },
  tipo_mime: {
    type: String
  },
  tamanio: {
    type: Number
  },
  ruta: {
    type: String,
    required: true
  },
  fecha_subida: {
    type: Date,
    default: Date.now
  }
});

Esquema_Archivo.virtual('url_descarga').get(function () {
  return `/api/archivos/${this._id}/descargar`;
});

module.exports = mongoose.model('Archivo', Esquema_Archivo);