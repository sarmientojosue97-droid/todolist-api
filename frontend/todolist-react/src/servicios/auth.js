const CLAVE_TOKEN = 'todolist_token';

export const guardarToken = (token) => {
    localStorage.setItem(CLAVE_TOKEN, token);
};

export const obtenerToken = () => {
    return localStorage.getItem(CLAVE_TOKEN);
};

export const eliminarToken = () => {
    localStorage.removeItem(CLAVE_TOKEN);
}; 

export const estaAutenticado = () => {
    const token = obtenerToken();
    if(!token) return false;
    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    }catch{
        return false;
    }
};

export const obtenerUsuario = () => {
    const token = obtenerToken();
    if(!token) return null;
    try{
        return JSON.parse(atob(token.split('.')[1]));
    }catch{
        return null;
    }
};

export const loginConGoogle = () => {
    window.location.href = 'http://localhost:4000/api/auth/google';
};

export const logout = () => {
    eliminarToken();
    window.location.href = '/login';
};