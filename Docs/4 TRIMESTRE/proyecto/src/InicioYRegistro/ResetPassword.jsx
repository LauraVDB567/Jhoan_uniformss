import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 

  useEffect(() => {
    console.log('Token obtenido del URL:', token); // Para depuración
    if (!token) {
      setErrorMessage('El token de recuperación es inválido.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/ResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,       
          newPassword: newPassword, 
        }),
      });

      const data = await response.json();

      console.log('Respuesta del backend:', data); 

      if (response.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate('/InicioYRegistro'); 
        }, 2000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Hubo un problema al intentar cambiar la contraseña.');
    }
  };

  return (
    <div className='body-recuperar1'>
      <div className='cuadro'>
        <div className="container">
          <h2>Restablecer Contraseña</h2>
          
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                className='put1'
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                className='put1'
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button className='boton1' type="submit">Restablecer Contraseña</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
