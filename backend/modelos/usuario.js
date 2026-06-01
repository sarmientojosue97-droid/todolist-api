const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Esquema_Usuario = new Schema({
    google_id: {
      type: String,
      required: true,
      unique: true
    },

    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    foto: {
      type: String,
      default: ''
    },

    fecha_registro: {
      type: Date,
      default: Date.now
    }
});

Esquema_Usuario.virtual('url').get(function() {
  return `/api/auth/perfil/${this._id}`;
});

module.exports = mongoose.model('Usuario', Esquema_Usuario);