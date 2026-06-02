import { Link } from "react-router-dom";

function Inicio() {
    return (
        <div style={{ textAlign: 'center', paddingTop: '3rem' }}>

            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                bienvenido
            </h1>

            <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>
                crear nontas y guardar cosas
            </p>

            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center',flexWrap: 'wrap'}}>
                
                <Link to="/tareas" style={{ fontSize: '1rem', padding: '0.65rem 1.5rem' }}>
                    Tareas
                </Link>

                <Link to="/drive" style={{ fontSize: '1rem', padding: '0.65rem 1.5rem' }}>
                    Almacenamiento
                </Link>

            </div>
            
        </div>
    );
}

export default Inicio;