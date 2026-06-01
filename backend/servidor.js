require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');

const rutas_tareas = require('./rutas/rutas_tareas');
const rutas_archivos = require('./rutas/rutas_archivos');
const rutas_auth = require('./rutas/rutas_auth');   // ← NUEVO

const app = express();

mongoose.connect(process.env.MONGODB_URI);
const bd = mongoose.connection;
bd.on('error', console.error.bind(console, ' Error MongoDB:'));
bd.once('open', () => console.log(' Conectado a MongoDB'));

app.use(cors({
  origin: process.env.URL_FRONTEND || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'sesion_temporal_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200).json({
    metadata: { status: 200, mensaje: 'API TODO List v2 con Auth' },
    data: {
      version: '2.0',
      auth: 'Google OAuth + JWT',
      endpoints: {
        auth: '/api/auth/google',
        tareas: '/api/tareas',
        archivos: '/api/archivos'
      }
    },
    links: {
      login: '/api/auth/google',
      tareas: '/api/tareas',
      archivos: '/api/archivos'
    }
  });
});

app.use('/api/auth', rutas_auth);
app.use('/api/tareas', rutas_tareas);
app.use('/api/archivos', rutas_archivos);

app.use((req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(404).json({
    metadata: { status: 404, mensaje: `Ruta ${req.originalUrl} no encontrada` },
    data:  null,
    links: { inicio: '/', login: '/api/auth/google' }
  });
});


const PUERTO = process.env.PORT || 4000;
app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
  console.log(`Login: http://localhost:${PUERTO}/api/auth/google`);
  console.log(`Tareas: http://localhost:${PUERTO}/api/tareas`);
  console.log(`Archivos: http://localhost:${PUERTO}/api/archivos`);
});