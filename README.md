
npm run devstart

http://localhost:4000/api/tareas


GET:
URL: http://localhost:4000/

GET:
URL: http://localhost:4000/api/tareas

[
 {
 "_id": "6507abc123def456",
 "titulo": "Estudiar para el parcial",
 "completada": false,
 ...
 }
]

POST:
URL: http://localhost:4000/api/tareas

{
 "titulo": "Estudiar para el parcial",
 "descripcion": "Repasar los temas de Express y Mongoose"
}


PUT:
URL: http://localhost:4000/api/tareas/   id

{
 "titulo": "Estudiar para el parcial",
 "descripcion": "Repasar Express, Mongoose y Promises",
 "completada": true
 }


DELETE
URL: http://localhost:4000/api/tareas/6507abc123def456
{
 "mensaje": "Tarea eliminada correctamente",
 "id": "6507abc123def456"
}