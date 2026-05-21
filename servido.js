const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const rutas_tareas = require('./rutas/rutas_tareas');
const app = express();

const uri_mongodb = process.env.MONGODB_URI;
mongoose.connect(uri_mongodb);

const conexion_bd = mongoose.connection;
conexion_bd.on('error', console.error.bind(console, 'error mongoDB'));
conexion_bd.once('open', () => {
    console.log('conectado a la base de datos en mongoDB');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({mensaje: 'funcionando BIEN '});
});

app.use('/api/tareas', rutas_tareas);

app.use((req, res) => {
    res.status(404).json({error: 'ruta no encontrada'});
});

const PUERTO = process.env.PORT || 4000;
app.listen.log(PUERTO, () => {
    console.log('corriendo en htpp://localhost:${PUERTO}');
    console.log('api: http://localhost:${PUERTO}/api/tareas')
});