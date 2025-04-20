import React, { useEffect, useState } from "react";
import Axios from "axios";

const Notificacion = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [detallesMap, setDetallesMap] = useState({});

  const obtenerSolicitudes = async () => {
    try {
      const response = await Axios.get("http://localhost:5013/api/solicitudes-devolucion");
      setSolicitudes(response.data);
      response.data.forEach(async (solicitud) => {
        try {
          const detalle = await Axios.get(
            `http://localhost:5013//api/solicitudes-devolucion/${solicitud._id}/detalles`
          );
          setDetallesMap((prev) => ({
            ...prev,
            [solicitud._id]: detalle.data,
          }));
        } catch (error) {
          console.error(`Error al obtener detalles de solicitud ${solicitud._id}:`, error);
        }
      });
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
    }};

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

    const manejarAccion = async (id, tipo) => {
    const endpoint = tipo === "aceptar"
      ? `/api/solicitudes-devolucion/${id}/aceptar`
      : `/api/solicitudes-devolucion/${id}/rechazar`;

    try {
      await Axios.post(`http://localhost:5013${endpoint}`);
      
      setSolicitudes(prev => prev.filter(s => s._id !== id));
      const updatedMap = { ...detallesMap };
      delete updatedMap[id];
      setDetallesMap(updatedMap);
    } catch (error) {
      console.error(`Error al ${tipo} solicitud:`, error);
    }};

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "30px", backgroundColor: "#fff", borderRadius: "10px" }}>
    <h2 style={{ textAlign: "center", color: "#5a5eed" }}><b>Solicitudes de Devolución</b></h2>

      {solicitudes.map((solicitud) => {
      const detalles = detallesMap[solicitud._id] || {};

        return (
          <div key={solicitud._id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
            <p><strong>Fecha:</strong> {solicitud.fecha}</p>
            <p><strong>Usuario:</strong> {solicitud.usuario}</p>
            <p><strong>Correo:</strong> {solicitud.correo}</p>
            <p><strong>Número de Comprobante:</strong> {solicitud.numeroFactura}</p>
            <p><strong>Teléfono:</strong> {solicitud.telefono}</p>
            <p><strong>Producto:</strong> {Array.isArray(solicitud.producto)
              ? solicitud.producto.join(', ')
             : solicitud.producto || 'No proporcionado'}</p>
            <p><strong>Comentario:</strong> {solicitud.comentario || 'No proporcionado'}</p>
            <p><strong>Método de Pago:</strong> {solicitud.metodoPago || 'No proporcionado'}</p>
            <p><strong>Total:</strong> ${solicitud.total || 0}</p>


            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => manejarAccion(solicitud._id, "aceptar")}
                style={{ backgroundColor: "#28a745", color: "#fff", border: "none", 
                  padding: "8px 14px", borderRadius: "5px" }} >Aceptar </button>


              <button onClick={() => manejarAccion(solicitud._id, "rechazar")}
              style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "8px 14px",
               borderRadius: "5px" }} >Rechazar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default  Notificacion;
