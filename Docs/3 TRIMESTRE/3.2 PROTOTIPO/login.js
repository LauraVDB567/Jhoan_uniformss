import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {
    const validUsername = 'Luisa';
    const validPassword = 'twicebestgg';
    const userRole = 'administrador'; 

    if (username === validUsername && password === validPassword) {
      setMessage('¡Bienvenido al sistema, Felicitaciones!');
      if (userRole === 'administrador') {
        navigate('/crud'); 
      } else {
        navigate('/principal'); 
      }
    } else {
      setMessage('Usuario o clave incorrectos.');
    }
  };

  return (
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <h2>Inicio Sesión</h2>
      <div>
        <label>
          <input
            type="text" placeholder='Usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          <input
            type="password" placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <br />
      <button onClick={handleLogin}>Ingresar</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;