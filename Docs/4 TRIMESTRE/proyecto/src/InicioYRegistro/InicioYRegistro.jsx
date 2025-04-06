import './syle/recuperar2.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InicioYRegistro = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Registro");
    const [apodo, setApodo] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (action === "Registro") {
            if (apodo && apellido && correo && contraseña) {
                try {
                    const nuevoUsuario = { apodo, apellido, correo, contraseña, rol_code: 2 };
                    await axios.post('http://localhost:5001/api/registro', nuevoUsuario);
                    setAction("Inicio Sesión");
                    setError('');
                    resetFields();
                } catch (error) {
                    setError('Error al registrar el usuario');
                    console.error('Error en el registro:', error);
                }
            } else {
                setError('Por favor, completa todos los campos.');
            }
        } else {
            if (correo && contraseña) {
                try {
                    const response = await axios.post('http://localhost:5001/api/login', { correo: correo.trim(), contraseña: contraseña.trim() });
                    if (response.status === 200) {
                        const { rol_code } = response.data;
                        localStorage.setItem("Sesion", true);
                        localStorage.setItem("correos", correo);
                        localStorage.setItem("rol_code", rol_code);
                        console.log('Rol recibido:', rol_code);

                        if (rol_code === 1) {
                            navigate('/crud');
                        } else if (rol_code === 2) {
                            navigate('/carrito');
                        } else {
                            setError('Rol no reconocido.');
                        }
                    }
                } catch (error) {
                    setError('Correo o contraseña incorrectos.');
                    console.error('Error en el inicio de sesión:', error);
                }
            } else {
                setError('Por favor, completa todos los campos.');
            }
        }
    };

    const resetFields = () => {
        setApodo('');
        setApellido('');
        setCorreo('');
        setContraseña('');
    };

    const switchToLogin = () => {
        setAction("Inicio Sesión");
        setError('');
        resetFields();
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light registro-navbar">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <p>Sistema De Informacion Jhoan Uniforms</p>
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
                            <Link className="nav-link registro-nav-link" to="/">Principal</Link>
                        </li>
                         <li className="nav-item">
                         <Link className="nav-link principal-nav-link" to="/carrito">Carrito de compras</Link>
                                </li>
                        <li className="nav-item">
                            <Link className="nav-link registro-nav-link" to="/Terminosycondiciones">Términos y Condiciones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link registro-nav-link" to="/RecoverPassword">recuperar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link registro-nav-link" to="/InicioYRegistro">Registrarse</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link registro-nav-link" to="/solicitud">Devolución</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

            <div className="registro-body-inicioyregistro">
                <div className="container">
                    <div className="registro-header">
                        <div className="registro-text">{action}</div>
                        <div className="registro-underline"></div>
                    </div>

                    {action === "Inicio Sesión" ? null : (
                        <>
                            <div className='registro-input'>
                                <input type="name" placeholder="nombre" value={apodo} onChange={(e) => setApodo(e.target.value)} />
                            </div>
                            <br></br>
                            <div className='registro-input'>
                                <input type="name" placeholder="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <br></br>
                        </>
                    )}

                    <div className='registro-input'>
                        <input type="email" placeholder="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                    <br></br>
                    <div className='registro-input'>
                        <input type="password" placeholder="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                    </div>

<br></br>
                    {action === "Inicio Sesión" ? null : (
                        <div className='registro-forgot-password'>
                            <span><a href="#" onClick={switchToLogin}>¿Tienes cuenta? Iniciar sesión</a></span>
                        </div>
                    )}
                      <br></br>

                    {error && <div className='registro-error-message'>{error}</div>}

                    <div className='registro-submit-container'>
                        <center>
                            <div className="registro-submit" onClick={handleSubmit}>
                                {action === "Inicio Sesión" ? 'Ingresar' : 'Registrar'}
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InicioYRegistro;





