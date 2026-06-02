import axios from 'axios';
import { obtenerToken, eliminarToken } from './auth';

const cache_etags = {};

const api = axios.create({
    baseURL: 'http://localhost:4000',
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
        if(etag) cache_etags[response.config.url] = etag;
        return response;
    },

    (error) => {
        if(error.response?.status === 304){
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