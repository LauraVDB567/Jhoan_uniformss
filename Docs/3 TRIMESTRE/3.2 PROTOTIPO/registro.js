import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterForm.css';

const Registro = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      setFormError('Todos los campos son obligatorios');
      return;
    }

    // Clear error and success messages
    setFormError('');
    setFormSuccess('');

    // Normally, you would send data to a server here
    // For demonstration, we'll assume registration is successful

    setFormSuccess('Te registraste correctamente');

    // Redirect to login page after a delay to show the success message
    setTimeout(() => {
      history.push('/login'); // Make sure this matches your route
    }, 2000); // Adjust delay as needed
  };

  return (
    <div className="register-container">
      <h2>Crear una Cuenta</h2>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>
            Nombre
            <input
              type="text"
              placeholder="Nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Apellido
            <input
              type="text"
              placeholder="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Correo Electrónico
            <input
              type="email"
              placeholder="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contraseña
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Registrarse</button>
        {formError && <div className="alerta-error">{formError}</div>}
        {formSuccess && <div className="alerta-exito">{formSuccess}</div>}
      </form>
    </div>
  );
};

export default Registro;
