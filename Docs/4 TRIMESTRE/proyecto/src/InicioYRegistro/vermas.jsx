import React from 'react';
import { Link } from 'react-router-dom';  
import asi from '../Archivos/asi.jpg';
import jhoan from '../Archivos/Jhoan_Uniforms-removebg-preview.png';
import uniformes from '../Archivos/uniformes.avif';
import registro from '../Archivos/clientes.jpg';
import asignacion from '../Archivos/asignacion.avif';
import segimiento from "../Archivos/seguimiento.avif";
import notificacion from '../Archivos/notificaciones.jpg';
import estadisticas from  '../Archivos/estadisticas.avif';
import seguridad from '../Archivos/seguridad.jpg';
import interfaz from '../Archivos/interfaz.jpg';
import integracion from '../Archivos/integracion.avif';
import './syle/ver mas.css';

const Informacion = () => {
    return (
        <div>
          
            <nav className="navbar navbar-expand-lg navbar-light bg-light principal-navbar">
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
                                <Link className="nav-link principal-nav-link" to="/">Principal</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/Terminosycondiciones">Términos y Condiciones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/InicioYRegistro">Registrarse</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/devolucion">Devolución</Link>
                            </li>
                         
                        </ul>
                    </div>
                </div>
            </nav>

          
            <div className="titulo">
                <br></br>
                <center>
                    <h3><b>INFORMACION</b></h3>
                </center>
            </div>

          
            <div className="texto">
                {data.map((item, index) => (
                    <div className="imagen" key={index}>
                        <img src={item.imgSrc} alt={item.title} />
                        <div className="tex">
                            <center>
                                <p><b><h2>{item.title}</h2></b></p>
                                <p>{item.description}</p>
                            </center>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const data = [
    {
        title: '1. Registro de uniformes',
        description: 'Base de datos para registrar información de cada uniforme, como tipo, talla, color, estado, etc.',
        imgSrc: uniformes, 
    },
    {
        title: '2. Registro de los clientes:',
        description: 'Base de datos para registrar información de cada cliente, como nombre, apellido, correo y contraseña.',
        imgSrc: registro, 
    },
    {
        title: '3. Asignación de uniformes',
        description: 'Funcionalidad para asignar uniformes a estudiantes y registrar la información correspondiente.',
        imgSrc: asi, 
    },
    {
        title: '4. Devolución de uniformes',
        description: 'Funcionalidad para registrar la devolución de uniformes, incluyendo la fecha, estado y cualquier observación.',
        imgSrc: asignacion, 
    },
    {
        title: '5. Seguimiento de devoluciones',
        description: 'Funcionalidad para seguir el historial de devoluciones de cada estudiante y uniforme.',
        imgSrc: segimiento, 
    },
    {
        title: '6. Notificaciones',
        description: 'Funcionalidad para enviar notificaciones automáticas a estudiantes y padres cuando se reciban uniformes devueltos.',
        imgSrc: notificacion, 
    },
    {
        title: '7. Informes y estadísticas',
        description: 'Funcionalidad para generar informes y estadísticas sobre la devolución de uniformes, como el número de uniformes devueltos, el estado de los uniformes, etc.',
        imgSrc: estadisticas, 
    },
    {
        title: '8. Seguridad y acceso',
        description: 'Funcionalidad para controlar el acceso al sistema y proteger la información de los estudiantes y uniformes.',
        imgSrc: seguridad, 
    },
    {
        title: '9. Interfaz amigable',
        description: 'Diseño de una interfaz fácil de usar para que los administradores y padres puedan navegar y utilizar el sistema sin dificultades.',
        imgSrc: interfaz, 
    },
    {
        title: '10. Integración con otros sistemas',
        description: 'Integración con otros sistemas de gestión escolar para acceder a información de los clientes.',
        imgSrc: integracion,
    },
];

export default Informacion;
