import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Por favor, ingresa un correo electrónico');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5004/api/recover-password', { email });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error al enviar el correo de recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='body'>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Recuperar Contraseña'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordRecovery;
