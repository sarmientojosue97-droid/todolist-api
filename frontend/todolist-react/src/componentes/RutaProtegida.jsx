import { Navigate } from "react-router-dom";
import {estaAutenticado} from '../servicios/auth';

function RutaProtegida({children}){
    if(!estaAutenticado()){
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default RutaProtegida;