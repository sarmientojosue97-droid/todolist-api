
import { useState } from 'react';
import { crearTarea, editarTarea } from '../servicios/tareas';

function FormularioTarea({ tareaExistente, onGuardar, onCancelar }) {
    const [titulo, setTitulo] = useState(tareaExistente?.titulo || '');
    const [descripcion, setDescripcion] = useState(tareaExistente?.descripcion || '');
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);
    const modoEditar = !!tareaExistente;

    const handleGuardar = async () => {
        
        if (!titulo.trim()) {
            setError('El titulo es obligatorio');
            return;
        }

        setGuardando(true);

        setError(null);

        try {
        if (modoEditar) {
            await editarTarea(tareaExistente._id, { titulo: titulo.trim(), descripcion });
        } else {
            await crearTarea({ titulo: titulo.trim(), descripcion });
        }
        onGuardar();
        } catch (err) {
            const msg = err.response?.data?.metadata?.mensaje || 'Error al guardar';
            setError(msg);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div>
            
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>
                {modoEditar ? 'editar tarea' : 'Nueva tarea'}
            </h3>

            {error && (
                <div className="mensaje-error" style={{ marginBottom: '0.75rem' }}>
                    {error}
                </div>
            )}

            <div className="campo">
                <label>Titulo</label>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Que tienes que hacer?" autoFocus/>
            </div>

            <div className="campo">
                <label>Descripcion (opcional)</label>
                <textarea value={descripcion}  onChange={(e) => setDescripcion(e.target.value)}  placeholder="Detalles adicionales..." rows={3}/>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                
                <button  onClick={onCancelar} disabled={guardando}>
                    Cancelar
                </button>

                <button onClick={handleGuardar} disabled={guardando}>
                    {guardando ? 'guardando.' : (modoEditar ? 'Guardar cambios' : 'Crear tarea')}
                </button>

            </div>
        </div>
    );
}

export default FormularioTarea;