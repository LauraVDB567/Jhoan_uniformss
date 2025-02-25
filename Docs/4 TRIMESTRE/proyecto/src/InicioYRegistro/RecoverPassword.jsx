import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './syle/recover.css'

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      setMessage('Error al enviar el correo. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recover-password-body">
      <nav className="navbar navbar-expand-lg navbar-light bg-light recover-password-navbar fixed-top">
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
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

      <div className="recover-password-container mt-5 pt-5">
        <h1 className="recover-password-text">Recuperación de Contraseña</h1>
        <div className="recover-password-underline"></div>
        <form onSubmit={handleSubmit} className="recover-password-form">
          <div className="recover-password-input">
            <input
              type="email"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="recover-password-submit-container">
            <button type="submit" className="recover-password-submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Recuperar Contraseña'}
            </button>
          </div>
        </form>
        {message && <p className="recover-password-error">{message}</p>}
      </div>
    </div>
  );
}

export default RecoverPassword;
