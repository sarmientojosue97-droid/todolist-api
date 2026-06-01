const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Esquema_Tarea = new Schema({
    titulo: {
        type: String,
        required: true,
        maxLength: 200
    },
    descripcion:{
        type: String,
        default: ''
    },
    completada: {
        type: Boolean,
        default: false
    },
    fecha_creacion:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tarea', Esquema_Tarea);