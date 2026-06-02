import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navegacion from './componentes/Navegacion';
import RutaProtegida from './componentes/RutaProtegida';
import Login from './paginas/Login';
import AuthCallback from './paginas/AuthCallback';
import ListaTareas from './paginas/ListaTareas';
import Drive from './paginas/Drive';
import './App.css';

function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/auth/callback' element={<AuthCallback />} />

        <Route path='/*' element={

          <RutaProtegida>
            <div className='layout'>
              <Navegacion/>
              <main className='contenido-principal'>
                <Routes>
                  <Route path='/tareas' element={<ListaTareas />}/>
                  <Route path='/drive' element={<Drive />}/>
                  <Route path='*' element={<Navigate to='/tareas'/>}/>
                </Routes>
              </main>
            </div>
          </RutaProtegida>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;