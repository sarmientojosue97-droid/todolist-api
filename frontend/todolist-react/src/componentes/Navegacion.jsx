import { NavLink } from "react-router-dom";
import {logout, obtenerUsuario} from '../servicios/auth';

function Navegacion(){
    const usuario = obtenerUsuario();

    return(
        
        <nav className="nav-lateral">

            <NavLink to="/tareas" className={({ isActive }) => `nav-link ${isActive ? 'activo' : ''}`}>
                Tareas
            </NavLink>

            <NavLink to="/drive" className={({ isActive }) => `nav-link ${isActive ? 'activo' : ''}`}>
                Drive
            </NavLink>

            {usuario && (
                <div style={{padding: '1rem', borderTop: '1px solid #ccc', marginTop: '1rem', fontSize: '0.8rem'}}>
                {usuario.foto && (
                    <img 
                        src={usuario.foto} 
                        alt="perfil"
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'block',
                            marginBottom: 4
                        }}
                    />
                )}

                <div style={{ marginBottom: 2 }}>
                    {usuario.nombre}
                </div>

                <div style={{ marginBottom: 8, wordBreak: 'break-all' }}>
                    {usuario.email}
                </div>

                <button onClick={logout} style={{ width: '100%', fontSize: '0.8rem' }}>
                    Cerrar sesion
                </button>
                </div>
            )}
            </nav>
    );    
}

export default Navegacion;