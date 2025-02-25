import './syle/recuperar2.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const adminAccounts = [
    { correo: "dkim44243@gmail.com", contraseña: "twicebestgg" },
    { correo: "valentinadb13l@gmail.com", contraseña: "12345" },
    { correo: "vallejolorena37@gmail.com", contraseña: "54321" },
    { correo: "valentinavaquezrodriguez00@gmail.com", contraseña: "56789" }
];

export { adminAccounts }


const InicioYRegistro = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Registro");
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async () => {
        if (action === "Registro") {
            if (nombre && apellido && correo && contraseña) {
                try {
                    const nuevoUsuario = { nombre, apellido, correo, contraseña };
                    await axios.post('http://localhost:5001/api/registro', nuevoUsuario);
                    setAction("Inicio Sesión");
                    setError('');
                    resetFields();




                } catch (error) {
                    setError('Error al registrar el usuario');
                }
            } else {
                setError('Por favor, completa todos los campos.');
            }
        } else {/* iniciar sesión */
            if (correo && contraseña) {
                const cleanCorreo = correo.trim();
                const cleanContraseña = contraseña.trim();
                localStorage.setItem("Sesion", true)
                localStorage.setItem("correos", correo)

                const adminLogin = adminAccounts.find(admin =>
                    admin.correo === cleanCorreo && admin.contraseña === cleanContraseña
                );

                if (adminLogin) {
                    navigate('/crud');
                } else {
                    try {
                        const response = await axios.post('http://localhost:5001/api/login', { correo: cleanCorreo, contraseña: cleanContraseña });
                        if (response.status === 200) {



                            navigate('/carrito');
                        }
                    } catch (error) {
                        setError('Correo o contraseña incorrectos.');
                    }
                }
            } else {
                setError('Por favor, completa todos los campos.');
            }
        }
    };

    const resetFields = () => {
        setNombre('');
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
                    <br />
                    {action === "Inicio Sesión" ? null : (
                        <>
                            <div className='registro-inputs'>
                                <div className="registro-input">
                                    <input
                                        type="texto"
                                        placeholder="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className='registro-inputs'>
                                <div className="registro-input">
                                    <input
                                        type="texto"
                                        placeholder="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <br />
                    <div className='registro-inputs'>
                        <div className="registro-input">
                            <input
                                type="email"
                                placeholder="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <div className='registro-inputs'>
                        <div className="registro-input">
                            <input
                                type="password"
                                placeholder="contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                    </div>

                    {action === "Inicio Sesión" ? null : (
                        <div className='registro-forgot-password'>
                            <br />
                            <span><a href="#" onClick={switchToLogin} className="registro-link">¿Tienes cuenta? Iniciar sesión</a></span>
                        </div>
                    )}
                    <br />
                    {error && <div className='registro-error-message'>{error}</div>}
                    <div className='registro-submit-container'>
                        <center>
                            <div
                                className={action === "Inicio Sesión" ? "registro-submit gray" : "registro-submit"}
                                onClick={handleSubmit}
                            >
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






