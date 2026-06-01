import Cargando from './componentes/Cargando';
import MensajeError from  './componentes/MensajeError';
import './App.css';

const TAREAS_EJEMPLO = [
  {
    _id:1, titulo:'probando React', descripcion:'estudiando', completada:true,
  },
  {
    _id:2, titulo:'basura v0 para probrar', descripcion:'dormir', completada:true,
  },
  {
    _id:3, titulo:'conectar a la base', descripcion:'nada intesante', completada:false,
  },
];

function App() {
  return (
    <div style={{ padding: '1.5rem', maxWidth: '860px' }}>

      <div className="pagina-header">
        <h1 style={{ fontSize: '1.3rem', fontWeight: 600 }}>
          probando react
        </h1>
        <button >Nueva tarea</button>
      </div>

      <Cargando mensaje="cargando tareas" />

      <MensajeError
        mensaje="solo son datos estaticos para ver"
        onReintentar={() => alert('mas adelante funcionara')}
      />

      {TAREAS_EJEMPLO.map(tarea => (
        <div
          key={tarea._id}
          className={`tarea-item ${tarea.completada ? 'completada' : ''}`}
        >
          <div className={`tarea-checkbox ${tarea.completada ? 'marcado' : ''}`}>
            {tarea.completada && 'v'}
          </div>

          <div className="tarea-cuerpo">
            <div className={`tarea-titulo ${tarea.completada ? 'tachado' : ''}`}>
              {tarea.titulo}
            </div>
            {tarea.descripcion && (
              <div className="tarea-desc">{tarea.descripcion}</div>
            )}
            <div className="tarea-acciones">
              <span style={{ fontSize: '0.78rem' }}>
                {tarea.completada ? 'Completada' : 'Pendiente'}
              </span>
              <button >Editar</button>
              <button>Eliminar</button>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;