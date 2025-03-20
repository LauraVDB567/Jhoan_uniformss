import "./syle/crudA.css";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function Crud() {
  const [facturas, setFacturas] = useState([]);
  const navigate = useNavigate();

  const cerrarsesion = () => {
    localStorage.clear();
    navigate("/", {replace : true});
  };

  const getFacturas = async () => {
    try {
      const response = await Axios.get("http://localhost:3007/api/facturas");
      setFacturas(response.data);
    } catch (error) {
      console.error("Error obteniendo las facturas:", error);
    }
  };

  const eliminarFactura = async (numeroFactura) => {
    try {
      await Axios.delete(`http://localhost:3007/api/facturas/${numeroFactura}`);
      setFacturas(prevFacturas => prevFacturas.filter(factura => factura.numeroFactura !== numeroFactura));
    } catch (error) {
      console.error("Error eliminando la factura:", error);
    }
  };

  const modificarFactura = (numeroFactura) => {
    if (numeroFactura) {
      navigate(`/modificar-factura/${numeroFactura}`);
    } else {
      console.error("Número de factura indefinido");
    }
  };

  useEffect(() => {
    getFacturas();
  }, []);

  return (
    <div className="crud-container">
      <header className="crud-header">
        <h1 className="crud-title"><b>CRUD USUARIOS</b></h1>
        <button className="crud-logout-button" onClick={cerrarsesion}>Cerrar Sesión</button>
      </header>
      <table className="crud-table">
        <thead className="crud-thead">
          <tr>
            <th className="crud-th">Número de Factura</th>
            <th className="crud-th">Nombre</th>
            <th className="crud-th">Teléfono</th>
            <th className="crud-th">Correo</th>
            <th className="crud-th">Productos</th>
            <th className="crud-th">Total</th>
            <th className="crud-th">Método de Pago</th>
            <th className="crud-th">Acciones</th>
          </tr>
        </thead>
        <tbody className="crud-tbody">
          {facturas.length > 0 ? (
            facturas.map((factura) => (
              <tr key={factura.numeroFactura} className="crud-tr">
                <td className="crud-td">{factura.numeroFactura || 'N/A'}</td>
                <td className="crud-td">{factura.nombre || 'N/A'}</td>
                <td className="crud-td">{factura.telefono || 'N/A'}</td>
                <td className="crud-td">{factura.correo || 'N/A'}</td>
                <td className="crud-td">{factura.productos ? (Array.isArray(factura.productos) ? factura.productos.map(prod => prod.nombre).join(', ') : factura.productos) : 'N/A'}</td>
                <td className="crud-td">${factura.total ? factura.total.toFixed(2) : '0.00'}</td>
                <td className="crud-td">{factura.metodoPago || 'N/A'}</td>
                <td className="crud-td">
                  <button className="crud-button edit" onClick={() => modificarFactura(factura.numeroFactura)}>Modificar</button>
                  <button className="crud-button delete" onClick={() => eliminarFactura(factura.numeroFactura)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="crud-tr">
              <td className="crud-td" colSpan="8">No hay facturas registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Crud;


