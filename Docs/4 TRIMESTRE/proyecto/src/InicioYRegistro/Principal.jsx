import React, { useEffect, useRef } from "react";
import "./syle/principal.css";
import jhoan_icon from "../Archivos/Jhoan_Uniforms-removebg-preview.png";
import { Link } from "react-router-dom";
import L from "leaflet";

function Principal() {
    const mapRef = useRef(null); 

    useEffect(() => {
       
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([4.6289784, -74.1362913], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);

            L.marker([4.6289784, -74.1362913]).addTo(mapRef.current)
                .bindPopup("Ubicación de Johan Uniforms")
                .openPopup();
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null; 
            }
        };
    }, []);

    return (
        <>
            <div className="body-principal"></div>
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
                                <Link className="nav-link principal-nav-link" to="/carrito">Carrito de compras</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/Terminosycondiciones">Términos y Condiciones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/InicioYRegistro">Registrarse</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/solicitud">Devolución</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="body-principal-content">
                <div className="header-txt-principal">
                    <h2>"Gestiona tus devoluciones de manera rápida y sencilla"</h2>
                    <p>
                        Accede a tu cuenta para gestionar tus devoluciones
                    </p>
                    <Link className="nav-link principal-nav-link" to="/vermas">
                        <button type="button" className="btn btn-info principal-btn">Ver más</button>
                    </Link>
                </div>
                <div className="header-img-principal">
                    <img src={jhoan_icon} alt="Johan Uniforms" />
                </div>
            </div>
            <br />
            <br />
            <div id="map" style={{ height: "400px", width: "100%" }}></div> 
            <br />
            <div className="footer-principal">
    <h1>Para mayor información<br />Comunícate con nosotros</h1>
    <div className="footer-buttons">
        <a href="https://wa.me/573106072362" target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-info principal-btn">WhatsApp</button>
        </a>
        <a  href="https://www.instagram.com/jhoan_uniforms" >
            <button type="button" className="btn btn-info principal-btn">Instragram</button>
        </a>
        <a href="mailto:johanuniforms@gmail.com" target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-info principal-btn">Correo Electrónico</button>
        </a>
    </div>
</div>

        </>
    );
}

export default Principal;
