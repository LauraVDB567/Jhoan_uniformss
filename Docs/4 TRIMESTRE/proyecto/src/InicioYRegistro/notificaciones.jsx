// src/pages/Solicitudes.jsx
import { useEffect, useState } from "react";
import Axios from "axios";
import "./syle/notiificacion.css";

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  const obtenerSolicitudes = async () => {
    try {
      const response = await Axios.get("http://localhost:3008/api/solicitudes-devolucion");
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
    }
  };

  const aceptarSolicitud = async (id) => {
    try {
      await Axios.post(`http://localhost:3008/api/solicitudes-devolucion/${id}/aceptar`);
      setSolicitudes(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const rechazarSolicitud = async (id) => {
    try {
      await Axios.post(`http://localhost:3008/api/solicitudes-devolucion/${id}/rechazar`);
      setSolicitudes(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  return (
    <div className="solicitudes-container">
      <h1>Solicitudes de Devolución</h1>
      {solicitudes.length > 0 ? (
        <ul className="solicitudes-list">
          {solicitudes.map((solicitud) => (
            <li key={solicitud._id} className="solicitud-item">
              <p><strong>Usuario:</strong> {solicitud.usuario}</p>
              <p><strong>Número de Factura:</strong> {solicitud.numeroFactura}</p>
              {solicitud.motivo && (
                <p><strong>Motivo:</strong> {solicitud.motivo}</p>
              )}
              <div className="solicitud-actions">
                <button className="aceptar" onClick={() => aceptarSolicitud(solicitud._id)}>Aceptar</button>
                <button className="rechazar" onClick={() => rechazarSolicitud(solicitud._id)}>Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay solicitudes pendientes.</p>
      )}
    </div>
  );
}

export default Solicitudes;
