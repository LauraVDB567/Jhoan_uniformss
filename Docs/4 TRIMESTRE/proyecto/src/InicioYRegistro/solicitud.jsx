import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./syle/devolucion.css";

const Solicitud = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [numeroFactura, setNumeroFactura] = useState('');
  const [factura, setFactura] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [comentario, setComentarios] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [total, setTotal] = useState(0); // Nuevo estado para almacenar el total

  const queryParams = new URLSearchParams(location.search);
  const numeroFacturaParam = queryParams.get('numeroFactura');

  useEffect(() => {
    const verificarAprobacion = async () => {
      if (numeroFacturaParam) {
        try {
          const response = await axios.get(`http://localhost:5013/api/devolucion/estado/${numeroFacturaParam}`);
          if (response.data.aprobada) {
            setNumeroFactura(numeroFacturaParam);
            handleBuscarFactura(numeroFacturaParam);
          } else {
            alert("La devolución aún no ha sido aprobada por el administrador.");
            navigate('/');
          }
        } catch (error) {
          console.error("Error al verificar el estado de la devolución:", error);
          alert("No se pudo verificar la devolución.");
          navigate('/');
        }
      }
    };
    verificarAprobacion();
  }, [numeroFacturaParam]);

  const handleBuscarFactura = async (num = numeroFactura) => {
    try {
      const response = await axios.get(`http://localhost:5013/api/factura/numeroFactura/${num}`);
      if (response.data) {
        setFactura(response.data);
        setMensaje('Comprobante encontrado');

        const productosData = response.data.productos;
        setTotal(response.data.total); 
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

    if (!comentario || comentario.trim() === '') {
      alert("Por favor, ingrese un comentario para la devolución.");
      return;
    }

    try {
      const productosArray = productoSeleccionado === 'todos' ? productos : [productoSeleccionado];

      if (!factura.correo) {
        alert('Correo no disponible. No se puede procesar la devolución.');
        return;
      }

      const correoResponse = await axios.post('http://localhost:5013/api/enviar-correo', {
        correoUsuario: factura.correo,
        nombreUsuario: factura.nombre,
        numeroFactura: factura.numeroFactura,
        telefonoUsuario: factura.telefono,
        productoUsuario: productosArray,
        comentarioUsuario: comentario,
        metodoPagoUsuario: factura.metodoPago,
        fechaUsuario:factura.fecha,
        totalUsuario: total, 
        enlaceDevolucion: `http://localhost:3000/devolucion?numeroFactura=${numeroFactura}`,
      });

      if (correoResponse.status === 200) {
        alert('Pronto será notificado para su devolución.');
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/carrito">Carrito</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/">Principal</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/Terminosycondiciones">Términos</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/InicioYRegistro">Registro</Link></li>
              <li className="nav-item"><Link className="nav-link principal-nav-link" to="/solicitud">Devolución</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="devolucion-container">
        <h2>Solicitud de Devolución</h2>
        {!numeroFacturaParam && (
          <>
            <input
              type="text"
              placeholder="Ingrese el número de la factura"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
              className="input-factura"
            />
            <button onClick={() => handleBuscarFactura()} className="button-buscar">Buscar Comprobante</button>
          </>
        )}

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {factura && (
          <div>
            <h3>Detalles de la solicitud:</h3>
            <p><strong>Numero Comprobante:</strong> {factura.numeroFactura}</p>
            <p><strong>Nombre:</strong> {factura.nombre}</p>
            <p><strong>Correo:</strong> {factura.correo}</p>
            <p><strong>Teléfono:</strong> {factura.telefono}</p>
            <p><strong>Total:</strong> ${total.toFixed(2)}</p> 
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
                <option value="todos">Todos los productos</option>
                {productos.map((producto, index) => (
                  <option key={index} value={producto}>{producto}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Comentarios sobre la devolución"
              value={comentario}
              onChange={(e) => setComentarios(e.target.value)}
              className="textarea-comentarios"
            />

            <button onClick={queryDevolucion} className="button-devolver">Enviar Solicitud</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Solicitud;
