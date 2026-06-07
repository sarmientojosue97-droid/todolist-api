import axios from 'axios';
import { obtenerToken, eliminarToken } from './auth';

const cache_etags = {};
const cache_datos = {};

const api = axios.create({
    baseURL: '',
    headers: {'Content-Type': 'application/json'}
});

api.interceptors.request.use((config) => {
    const token = obtenerToken();
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    const etag = cache_etags[config.url];
    if(etag){
        config.headers['If-None-Match'] = etag;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        const etag = response.headers['etag'];
        if(etag) {cache_etags[response.config.url] = etag;
            cache_datos[response.config.url] = response.data; 
        }
        return response;
    },

    (error) => {
        if(error.response?.status === 304){
            const datos_previos = cache_datos[error.config?.url];
            if(datos_previos){
                return Promise.resolve({ ...error.response, data: datos_previos });
            }
            return Promise.resolve(error.response);
        }

        if(error.response?.status === 401){
            eliminarToken();
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;