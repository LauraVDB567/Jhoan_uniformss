import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './InicioYRegistro/Principal.jsx';
import InicioYRegistro from './InicioYRegistro/InicioYRegistro.jsx';
import Terminosycondiciones from './InicioYRegistro/Terminos y condiciones.jsx';
import Recover from './InicioYRegistro/RecoverPassword.jsx';
import Reset from './InicioYRegistro/ResetPassword.jsx';
import Carrito from './InicioYRegistro/carrito.jsx';
import Crud from "./InicioYRegistro/crud.jsx";
import Devolucion from "./InicioYRegistro/devolucion.jsx";
import Factura from './InicioYRegistro/factura.jsx'; 
import VerMas from './InicioYRegistro/vermas.jsx';
import Solicitud from './InicioYRegistro/solicitud.jsx';
import ModificarUsuario from "./InicioYRegistro/ModificarFactura";
import Privacidad from "./InicioYRegistro/privacidad.js"
import Notificacion from "./InicioYRegistro/notificaciones.jsx"
import DevolucionesGrafica from "./InicioYRegistro/devolucionesGrafica.jsx";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/InicioYRegistro" element={<InicioYRegistro />} />
          <Route path="/Terminosycondiciones" element={<Terminosycondiciones />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/crud" element={<Privacidad><Crud /></Privacidad>}/>
          <Route path="/solicitud" element={<Solicitud />} />
          <Route path="/factura" element={<Factura />} />
          <Route path="/vermas" element={<VerMas />} />
          <Route path="/RecoverPassword" element={<Recover />} />
          <Route path="/ResetPassword" element={<Reset />} />
          <Route path="/devolucion" element={<Devolucion/>} />
          <Route path="/modificar-usuario/:id" element={<ModificarUsuario />} />
          <Route path="/notificaciones" element={<Notificacion />} />
          <Route path="/devoluciones-grafica" element={<DevolucionesGrafica />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
