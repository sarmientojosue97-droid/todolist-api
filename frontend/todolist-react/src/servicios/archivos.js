import api from './api';

export const listarArchivos = async () => {
    const respuesta = await api.get('/api/archivos');
    return respuesta.data;
};

export const subirArchivo = async (archivo, onProgreso) => {
    const formulario = new FormData();
    formulario.append('archivo', archivo);

    const token = localStorage.getItem('todolist_token');

    const respuesta = await api.post('/api/archivos/subir', formulario, {
        headers: {
        'Content-Type':  'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : ''
        },
        onUploadProgress: (evento) => {
        if (onProgreso) {
            const porcentaje = Math.round((evento.loaded * 100) / evento.total);
            onProgreso(porcentaje);
        }
        }
    });
    return respuesta.data;
};


export const descargarArchivo = (id) => {
    const token = localStorage.getItem('todolist_token');
    window.open(
        `http://localhost:4000/api/archivos/${id}/descargar?token=${token}`,
        '_blank'
    );
};

export const eliminarArchivo = async (id) => {
    const respuesta = await api.delete(`/api/archivos/${id}`);
    return respuesta.data;
};