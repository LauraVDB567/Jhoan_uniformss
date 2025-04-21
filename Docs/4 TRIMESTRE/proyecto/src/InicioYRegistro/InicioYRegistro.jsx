import './syle/recuperar2.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Emailvalidation from '@everapi/emailvalidation-js'

const InicioYRegistro = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Registro");
    const [apodo, setApodo] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [verification, setVerification] = useState(false);

    const handleSubmit = async () => {
        if (action === "Registro") {
            if (apodo && apellido && correo && contraseña) {
                try {


                    const client = new Emailvalidation('ema_live_swH2myP5ad2FsEIGPJueQ38zoBK9zTi3s1fBDHVQ')
                    const response = await client.info(correo, { catch_all: 0 });  
                    
                    console.log(response)

                  if (response.smtp_check === false ){
                    alert("Ingrese un correo valido ")
                    return setVerification(response.smtp_check)
                    console.log(response.smtp_check, "********", response );
                  }
                

                    if (response.smtp_check === true) {
                    
                        alert("Usuario se registro exitosamente")

                        const nuevoUsuario = { apodo, apellido, correo, contraseña };
                        await axios.post("http://localhost:5013/api/registro", nuevoUsuario);
                        setAction("Inicio Sesión");
                        setError('');
                        resetFields();
                    }
                    else {
                        alert("Ingrese un correo valido :( ")
                    }
                } catch (error) {
                    const mensajeError = error.response?.data?.error || 'Error al registrar el usuario';
                    setError(mensajeError);
                    console.error('Error en el registro:', mensajeError);
                }
            }
        } else {
            if (correo && contraseña) {
                try {
                    const response = await axios.post('http://localhost:5013/api/login', { correo: correo.trim(), contraseña: contraseña.trim() });
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

    const ConsultarUsuario = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:5013/consultar/${id}`);
            const datos = await respuesta.json();
            if (respuesta.ok) {
                console.log("Usuario encontrado", datos);
            } else {
                console.log("Usuario no encontrado");
            }
        } catch (err) {
            console.log("Usuario no encontrado");
        }
    };

    const ActualizarUsuario = async (id, usuarios) => {
        try {
            const respuesta = await fetch(`http://localhost:5013/actualizar/${id}`);
            const datos = await respuesta.json();
            if (respuesta.ok) {
                console.log("Usuario encontrado", datos);
            } else {
                console.log("Usuario no encontrado");
            }
        } catch (error) {
            console.error("Error en la consulta:", error);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const response = await fetch(`http://localhost:5013/eliminar/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("Usuario eliminado");
            } else {
                console.log("Usuario no eliminado");
            }
        } catch (err) {
            console.log("Usuario no eliminado");
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
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
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
                            <br />
                            <div className='registro-input'>
                                <input type="name" placeholder="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <br />
                        </>
                    )}

                    <div className='registro-input'>
                        <input type="email" placeholder="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                    <br />
                    <div className='registro-input'>
                        <input type="password" placeholder="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                    <br />

                    {action === "Inicio Sesión" ? null : (
                        <div className='registro-forgot-password'>
                            <span><a href="#" onClick={switchToLogin}>¿Tienes cuenta? Iniciar sesión</a></span>
                        </div>
                    )}
                    <br />

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
