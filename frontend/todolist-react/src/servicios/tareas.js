import api from './api';

export const obtenerTareas = async(pagina=1, limite=10)=>{
    const respuesta = await api.get(`/api/tareas?page=${pagina}&limit=${limite}`);
    return respuesta.data;
};

export const obtenerTarea = async(id) => {
    const respuesta = await api.get(`/api/tareas/${id}`);
    return respuesta.data;
};

export const crearTarea = async (datos) => {
    const respuesta = await api.post('/api/tareas', datos);
    return respuesta.data;
};

export const editarTarea = async (id, datos) => {
    const respuesta = await api.put(`/api/tareas/${id}`, datos);
    return respuesta.data;
};

export const completarTarea = async (id, completada) => {
    const respuesta = await api.patch(`/api/tareas/${id}/completar`, { completada });
    return respuesta.data;
};

export const eliminarTarea = async (id) => {
    const respuesta = await api.delete(`/api/tareas/${id}`);
    return respuesta.data;
};