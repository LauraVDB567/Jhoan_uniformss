import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./syle/devolucion.css";

const Solicitud = () => {
  const location = useLocation();
  const [numeroFactura, setNumeroFactura] = useState('');
  const [factura, setFactura] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [mensaje, setMensaje] = useState('');

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
        setMensaje('Número de factura no encontrada');
      }
    } catch (error) {
      console.error('Error al buscar la factura:', error.response ? error.response.data : error.message);
      setMensaje('Error al buscar la factura');
    }
  };

  const queryDevolucion = async () => {
    if (!numeroFactura || !factura) {
      alert("Debe buscar y seleccionar una factura válida antes de proceder.");
      return;
    }

    if (!productoSeleccionado) {
      alert("Debe seleccionar un producto para devolver.");
      return;
    }

    if (!comentarios || comentarios.trim() === '') {
      alert("Por favor, ingrese un comentario para la devolución.");
      return;
    }

    try {
      const productosArray = [productoSeleccionado];

      if (!factura.correo) {
        alert('Correo no disponible. No se puede procesar la devolución.');
        return;
      }

      // Solo se envía la solicitud de correo, no se genera la devolución inmediatamente
      const correoResponse = await axios.post('http://localhost:3008/api/enviar-correo', {
        correoUsuario: factura.correo,
        nombreUsuario: factura.nombre,
        numeroFactura: factura.numeroFactura,
        enlaceDevolucion: `http://localhost:3000/devolucion?numeroFactura=${numeroFactura}`,
      });

      if (correoResponse.status === 200) {
        alert('Pronto sera notificado para su devolucion.');
      } else {
        alert(`Error al enviar el correo: ${correoResponse.data.message || 'Error desconocido.'}`);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de devolución:', error);
      if (error.response) {
        alert(`Error del servidor: ${error.response.data.message || 'Error desconocido.'}`);
      } else if (error.request) {
        alert('No se pudo contactar con el servidor.');
      } else {
        alert(`Error al realizar la solicitud: ${error.message}`);
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light principal-navbar">
        <div className="container-fluid">
          <a className="navbar-brand">
            <p>Sistema De Información Jhoan Uniforms</p>
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
                <Link className="nav-link principal-nav-link" to="/">Principal</Link>
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

      <div className="devolucion-container">
        <h2>Solicitud de Devolución</h2>
        <input
          type="text"
          placeholder="Ingrese el número de la factura"
          value={numeroFactura}
          onChange={(e) => setNumeroFactura(e.target.value)}
          className="input-factura"
        />
        <button onClick={handleBuscarFactura} className="button-buscar">
          Buscar Factura
        </button>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {factura && (
          <div className="devolucion-container">
            <h3>Detalles de la solicitud:</h3>
            <p><strong>Factura:</strong> {factura.numeroFactura}</p>
            <p><strong>Nombre:</strong> {factura.nombre}</p>
            <p><strong>Correo:</strong> {factura.correo}</p>
            <p><strong>Teléfono:</strong> {factura.telefono}</p>
            <p><strong>Total:</strong> ${factura.total.toFixed(2)}</p>
            <p><strong>Método de Pago:</strong> {factura.metodoPago}</p>

            <div>
              <label htmlFor="productos">Seleccione un producto para devolver:</label>
              <select
                id="productos"
                value={productoSeleccionado}
                onChange={(e) => setProductoSeleccionado(e.target.value)}
                className="select-producto"
              >
                <option value="">Seleccione un producto</option>
                {productos.map((producto, index) => (
                  <option key={index} value={producto}>{producto}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Comentarios sobre la devolución"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              className="textarea-comentarios"
            />

            <button onClick={queryDevolucion} className="button-devolver">
              Enviar Solicitud
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Solicitud;
