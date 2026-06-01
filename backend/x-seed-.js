const mongoose = require('mongoose');
require('dotenv').config();

const Tarea = require('./modelos/tarea');

async function poblar() {
  console.log('Conectando a MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(' Conectado');

  await Tarea.deleteMany({});
  console.log(' Datos anteriores eliminados');

  const tareas_prueba = [];

  for (let i = 1; i <= 25; i++) {
    tareas_prueba.push({
      titulo:      `Tarea de prueba número ${i}`,
      descripcion: `Esta es la descripción de la tarea ${i}. Sirve para probar la paginación y el caché.`,
      completada:  i % 3 === 0,
      fecha_creacion: new Date(Date.now() - (i * 60000))
    });
  }

  await Tarea.insertMany(tareas_prueba);
  console.log(` ${tareas_prueba.length} tareas de prueba insertadas`);
  console.log('');
  console.log('Ahora puedes probar:');
  console.log('  GET /api/tareas → devuelve las primeras 10');
  console.log('  GET /api/tareas?page=2 → devuelve las siguientes 10');
  console.log('  GET /api/tareas?page=3 → devuelve las últimas 5');
  console.log('  GET /api/tareas (segunda vez sin cambios) → 304 Not Modified');

  mongoose.connection.close();
}

poblar().catch(console.error);