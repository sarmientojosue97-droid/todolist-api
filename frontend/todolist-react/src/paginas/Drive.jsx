
import { useState, useEffect, useRef } from 'react';
import { listarArchivos, subirArchivo, descargarArchivo, eliminarArchivo} from '../servicios/archivos';
import Cargando from '../componentes/Cargando';
import MensajeError from '../componentes/MensajeError';

function formatearTamanio(bytes) {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function obtenerExtension(nombre) {
    if (!nombre) return 'FILE';
    const partes = nombre.split('.');
    return partes.length > 1 ? partes[partes.length - 1].toUpperCase() : 'FILE';
}

function Drive() {
    const [archivos, setArchivos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const inputRef = useRef(null);

    const cargarArchivos = async () => {
        setCargando(true);
        setError(null);
        try {
        const json = await listarArchivos();
        setArchivos(json.data || []);
        } catch {
        setError('Error al cargar los archivos');
        } finally {
        setCargando(false);
        }
    };

    useEffect(() => { cargarArchivos(); }, []);

    const handleSubir = async (archivo) => {
        if (!archivo) return; 
            setSubiendo(true);
            setProgreso(0);
        try {
            await subirArchivo(archivo, (pct) => setProgreso(pct));
            await cargarArchivos();
        } catch {
            setError('Error al subir el archivo');
        } finally {
            setSubiendo(false);
            setProgreso(0);
        }
    };

    const handleEliminar = async (id, nombre) => {
        if (!confirm(`Eliminar "${nombre}"?`)) return;
        try {
            await eliminarArchivo(id);
            cargarArchivos();
        } catch {
            setError('Error al eliminar el archivo');
        }
    };

    return (
        <div>
            <div className="pagina-header">
                <h1 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Drive</h1>
            </div>

            <div
                className="zona-subida"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                e.preventDefault();
                handleSubir(e.dataTransfer.files[0]);
                }}
            >
                <p>Haz clic para subir un archivo o arrastralo aqui</p>
                <input ref={inputRef} type="file" onChange={(e) => handleSubir(e.target.files[0])} disabled={subiendo}/>

            </div>

            {subiendo && (
                <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#555' }}>
                    Subiendo... {progreso}%
                    <div className="progreso-barra">
                        <div className="progreso-relleno" style={{ width: `${progreso}%` }} />
                    </div>
                </div>
            )}

            {error    && <MensajeError mensaje={error} onReintentar={cargarArchivos} />}
            {cargando && <Cargando mensaje="Cargando archivos..." />}

            {!cargando && !error && archivos.length === 0 && (
                <div className="mensaje-vacio"><p>Tu Drive esta vacio.</p></div>
            )}

            {!cargando && archivos.map(archivo => (
                <div key={archivo._id} className="archivo-item">

                    <div className="archivo-ext">
                        {obtenerExtension(archivo.nombre_original)}
                    </div>

                    <div className="archivo-info">
                        <div className="archivo-nombre">{archivo.nombre_original}</div>
                        <div className="archivo-meta">
                            {formatearTamanio(archivo.tamanio)}
                            {' '}·{' '}
                            {new Date(archivo.fecha_subida).toLocaleDateString('es-ES')}
                        </div>
                    </div>

                    <div className="archivo-acciones">
                        <button  onClick={() => descargarArchivo(archivo._id)}>
                            Descargar
                        </button>
                        <button onClick={() => handleEliminar(archivo._id, archivo.nombre_original)}>
                            Eliminar
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Drive;