import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./syle/crudA.css"; // Manteniendo el mismo estilo del CRUD

function ModificarFactura() {
  const { numeroFactura } = useParams();
  const navigate = useNavigate();
  const [factura, setFactura] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    productos: "",
    total: 0,
    metodoPago: "",
  });

  useEffect(() => {
    const obtenerFactura = async () => {
      try {
        const response = await Axios.get(`http://localhost:3007/api/factura/numeroFactura/${numeroFactura}`);
        const facturaLimpia = {
          ...response.data,
          productos: response.data.productos.replace(/\\/g, ""), // Eliminamos los slashes
        };
        setFactura(facturaLimpia);
      } catch (error) {
        console.error("Error obteniendo la factura:", error);
      }
    };
    obtenerFactura();
  }, [numeroFactura]);

  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:3007/api/facturas/${numeroFactura}`, factura);
      alert("Factura actualizada correctamente");
      navigate("/crud");
    } catch (error) {
      console.error("Error actualizando la factura:", error);
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2 className="crud-title">Modificar Factura</h2>
      </div>
      <form onSubmit={handleSubmit} className="crud-form">
        <label>Nombre:</label>
        <input type="text" name="nombre" value={factura.nombre} onChange={handleChange} required />

        <label>Correo:</label>
        <input type="email" name="correo" value={factura.correo} onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="text" name="telefono" value={factura.telefono} onChange={handleChange} required />

        <label>Productos:</label>
        <input type="text" name="productos" value={factura.productos} onChange={handleChange} required />

        <label>Total:</label>
        <input type="number" name="total" value={factura.total} onChange={handleChange} required />

        <label>Método de Pago:</label>
        <input type="text" name="metodoPago" value={factura.metodoPago} onChange={handleChange} required />

        <div className="crud-button-container">
          <button type="submit" className="crud-button edit">Actualizar Factura</button>
          <button type="button" className="crud-button delete" onClick={() => navigate("/crud")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ModificarFactura;
