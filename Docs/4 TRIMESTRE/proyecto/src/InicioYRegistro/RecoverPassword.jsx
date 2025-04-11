import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './syle/recover.css';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Por favor, introduce un correo electrónico.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/recover-password', { email });
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage('Error al enviar el correo. Intenta de nuevo.');
      setIsError(true); 
    }}
    

  return (
    <div className="recover-password-body">
      <nav className="navbar navbar-expand-lg navbar-light bg-light principal-navbar-asww fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">
            <p>Sistema De Información Jhoan Uniforms</p>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
               <li className="nav-item">
                           <Link className="nav-link principal-nav-link" to="/carrito">Carrito de compras</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link principal-nav-link" to="/">Principal</Link>
                            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Terminosycondiciones">Términos y Condiciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/InicioYRegistro">Registrarse</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/devolucion">Devolución</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="recover-password-container">
        <div className="recover-header">
          <h1 className="recover-text">Recuperación de Contraseña</h1>
          <div className="recover-underline"></div>
        </div>
        <form onSubmit={handleSubmit} className="recover-inputs">
          <div className="recover-input">
            <input
              type="email"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="recover-submit-container">
            <button type="submit" className="recover-submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Recuperar Contraseña'}
            </button>
          </div>
        </form>
        {message && (
  <p className={`registro-error-message ${isError ? 'error' : 'success'}`}>
    {message}
  </p>
)}

      </div>
    </div>
  );
}

export default RecoverPassword;
