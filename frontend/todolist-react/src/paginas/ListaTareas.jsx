import { useState, useEffect, useCallback } from 'react';
import { obtenerTareas } from '../servicios/tareas';
import TarjetaTarea from '../componentes/TarjetaTarea';
import Paginacion from '../componentes/Paginacion';
import Cargando from '../componentes/Cargando';
import MensajeError from '../componentes/MensajeError';
import FormularioTarea from './FormularioTarea';

function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [metadata, setMetadata] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [tareaEditando, setTareaEditando] = useState(null);

    const cargarTareas = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            const json = await obtenerTareas(pagina, 10);
            setTareas(json.data);
            setMetadata(json.metadata);
        } catch {
            setError('Error al cargar las tareas. Esta corriendo el servidor?');
        } finally {
            setCargando(false);
        }
    }, [pagina]);

    useEffect(() => { cargarTareas(); }, [cargarTareas]);

    const abrirCrear = () => { setTareaEditando(null); setMostrarForm(true); };
    const abrirEditar = (tarea) => { setTareaEditando(tarea); setMostrarForm(true); };
    const cerrarForm = () => { setMostrarForm(false); setTareaEditando(null); };
    const alGuardar = () => { cerrarForm(); cargarTareas(); };

    return (
        <div>
            <div className="pagina-header">
                <h1 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Tareas</h1>
                <button  onClick={abrirCrear}>+ Nueva tarea</button>
            </div>

            {mostrarForm && (
                <div className="tarjeta">
                    <FormularioTarea
                        tareaExistente={tareaEditando}
                        onGuardar={alGuardar}
                        onCancelar={cerrarForm}
                    />
                </div>
            )}

            {cargando && <Cargando mensaje="cargando tareas" />}

            {error && <MensajeError mensaje={error} onReintentar={cargarTareas} />}

            {!cargando && !error && tareas.length === 0 && (
                <div className="mensaje-vacio">

                    <p>No tienes tareas todavia.</p>
                    <button className="btbrn btn-primario" onClick={abrirCrear} style={{ marginTop: '1rem' }}>
                        Crear tu primera tarea
                    </button>

                </div>
            )}

            {!cargando && !error && tareas.map(tarea => (
                <TarjetaTarea key={tarea._id} tarea={tarea} onActualizar={cargarTareas} onEditar={abrirEditar} /> 
            ))}

            {metadata && ( <Paginacion metadata={metadata} onCambiarPagina={(nueva) => setPagina(nueva)}/>)}

        </div>
    );
}

export default ListaTareas;