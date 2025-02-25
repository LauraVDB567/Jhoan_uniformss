import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';  
import "./syle/devolucion.css"; 

const Devolucion = () => {
  const location = useLocation();
  const [numeroFactura, setNumeroFactura] = useState('');
  const [factura, setFactura] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [correo, setCorreo] = useState('');


  const handleBuscarFactura = async () => {
    try {
      const response = await axios.get(`http://localhost:3007/api/factura/numeroFactura/${numeroFactura}`);
      if (response.data) {
        setFactura(response.data);
        setMensaje('Factura encontrada');

        const productosData = response.data.productos;
        if (Array.isArray(productosData)) {
          setProductos(productosData);
        } else if (typeof productosData === 'string') {
          setProductos(productosData.split(',').map(producto => producto.trim()));
        } else if (typeof productosData === 'object') {
          setProductos(Object.values(productosData));
        } else {
          setProductos([]);
        }

        setProductoSeleccionado('');
      } else {
        setMensaje('Número de factura no encontrado');
      }
    } catch (error) {
      console.error('Error al buscar la factura:', error.response ? error.response.data : error.message);
      setMensaje('Error al buscar la factura');
    }
  };

  const queryDevolucion = async () => {
    if (!comentarios.trim()) {
      alert("Por favor, ingrese un comentario para la devolución.");
      return;
    }

    if (!productoSeleccionado) {
      alert("Seleccione un producto para devolver.");
      return;
    }

    const confirmDevolucion = window.confirm("¿Seguro que quieres devolver este producto?");
    if (confirmDevolucion) {
      try {
        const response = await axios.post('http://localhost:3002/api/devolucion', {
          numeroFactura, 
          nombre: factura.nombre,  
          telefono: factura.telefono,  
          productos: [productoSeleccionado], 
          total: factura.total,  
          metodoPago: factura.metodoPago,  
          comentarios,
          correo: factura.correo, 
        });

        if (response.status === 200) {
          
          alert('Devolución registrada con éxito y correo enviado');
        } else {
          alert(`Error: ${response.data.message || 'No se pudo procesar la devolución'}`);
        }
      } catch (error) {
        console.error('Error al procesar la devolución:', error);
        if (error.response) {
          alert(`Error del servidor: ${error.response.data.message || 'Error desconocido'}`);
        } else {
          alert('No se pudo contactar con el servidor.');
        }
      }
    }
  };

  return (
    <>
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
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/">Principal</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/Terminosycondiciones">Términos y Condiciones</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/InicioYRegistro">Registrarse</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/devolucion">Devolución</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="devolucion-container">
        <h2>Devolución de Producto</h2>
        <input type="text" placeholder="Ingrese el número de la factura" value={numeroFactura} onChange={(e) => setNumeroFactura(e.target.value)} className="input-factura"/>
        <button onClick={handleBuscarFactura} className="button-buscar">Buscar Factura</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {factura && (
          <div className="devolucion-container">
            <h3>Detalles de la Devolución:</h3>
            <p><strong>Factura:</strong> {factura.numeroFactura}</p>
            <p><strong>Nombre:</strong> {factura.nombre}</p>
            <p><strong>Teléfono:</strong> {factura.telefono}</p>
            <p><strong>Total:</strong> ${factura.total.toFixed(2)}</p>
            <p><strong>Método de Pago:</strong> {factura.metodoPago}</p>

            <label htmlFor="productos">Seleccione un producto para devolver:</label>
            <select id="productos" value={productoSeleccionado} onChange={(e) => setProductoSeleccionado(e.target.value)} className="select-producto">
              <option value="">Seleccione un producto</option>
              {productos.length > 0 ? (
                productos.map((producto, index) => (
                  <option key={index} value={producto}>{producto}</option>
                ))
              ) : (
                <option>No hay productos disponibles</option>
              )}
            </select>

            <textarea placeholder="Comentarios sobre la devolución" value={comentarios} onChange={(e) => setComentarios(e.target.value)} className="textarea-comentarios"/>

            <button onClick={queryDevolucion} className="button-devolver">Devolver Producto</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Devolucion;
