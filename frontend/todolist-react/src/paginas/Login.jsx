import { loginConGoogle } from '../servicios/auth';

function Login() {


    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ padding: '2rem', textAlign: 'center', width: '320px'}}>
                
                <h1 style={{marginBottom: '0.5rem' }}>
                    Todo List y Drive
                </h1>

                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Inicia sesion para continuar
                </p>

                <button
                    onClick={loginConGoogle}
                    style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        background: '#fff',
                        fontSize: '0.9rem',
                    }}
                >
                    Continuar con Google
                </button>
            </div>
        </div>
    );
}

export default Login;