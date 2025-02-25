import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './InicioYRegistro/Principal.jsx';
import InicioYRegistro from './InicioYRegistro/InicioYRegistro.jsx';
import Terminosycondiciones from './InicioYRegistro/Terminos y condiciones.jsx';
import Carrito from'./InicioYRegistro/carrito.jsx';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/InicioYRegistro" element={<InicioYRegistro />} />
          <Route path="/Terminosycondiciones" element={<Terminosycondiciones />} />
          <Route path="/carrito" element={<Carrito />} />
        

        </Routes>
      </div>
    </Router>
  );
}

export default App;
