import { useState } from 'react';
import { completarTarea, eliminarTarea } from '../servicios/tareas';

function TarjetaTarea({ tarea, onActualizar, onEditar }) {
    const [cargando, setCargando] = useState(false);

    const toggleCompletar = async () => {
        setCargando(true);
        try {
            await completarTarea(tarea._id, !tarea.completada);
            onActualizar(); 
        } catch (error) {
            console.error('Error al actualizar:', error);
        } finally {
            setCargando(false);
        }
    };

  const handleEliminar = async () => {
    if (!confirm(`Eliminar "${tarea.titulo}"?`)) return;
        setCargando(true);
    try {
        await eliminarTarea(tarea._id);
        onActualizar();
    } catch (error) {
        console.error('Error al eliminar:', error);
    } finally {
        setCargando(false);
    }
  };

  return (
    <div className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>

        <button
            className={`tarea-checkbox ${tarea.completada ? 'marcado' : ''}`}
            onClick={toggleCompletar}
            disabled={cargando}
            title={tarea.completada ? 'Desmarcar' : 'Completar'}
        >
            {tarea.completada && 'v'}
        </button>

        <div className="tarea-cuerpo">
            
            <div className={`tarea-titulo ${tarea.completada ? 'tachado' : ''}`}>
                {tarea.titulo}
            </div>

            {tarea.descripcion && (<div className="tarea-desc">{tarea.descripcion}</div>)}

            <div className="tarea-acciones">

                <span style={{ fontSize: '0.78rem' }}>
                    {tarea.completada ? 'Completada' : 'Pendiente'}
                </span>

                <button  onClick={() => onEditar(tarea)} disabled={cargando}>
                    Editar
                </button>

                <button  onClick={handleEliminar} disabled={cargando}>
                    Eliminar
                </button>

            </div>
        </div>
    </div>
  );
}

export default TarjetaTarea;