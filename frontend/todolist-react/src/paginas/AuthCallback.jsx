import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {guardarToken} from '../servicios/auth';

function AuthCallback(){
    const navigate = useNavigate();

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if(token){
            guardarToken(token);
            window.location.href = '/tareas';
        }else{
            window.location.href = '/login';
        }
    }, [navigate]);

    return(
        <div style={{textAlign:'center', paddingTop:'3rem'}}>
            <p>procesando la autentitacacion</p>
        </div>
    );

}

export default AuthCallback;