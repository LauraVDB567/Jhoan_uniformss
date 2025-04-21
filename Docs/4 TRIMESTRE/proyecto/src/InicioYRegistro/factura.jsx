import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import axios from 'axios';
import './syle/factura.css';  
import mater from "../Archivos/master.png";
import nequi from "../Archivos/nequi.png";
import efectivo from "../Archivos/efectivo.jpeg"; 
import daviplata from "../Archivos/daviplata.png";
import paypal from "../Archivos/paypal.png";
import jhoanLogo from "../Archivos/Jhoan_Uniforms-removebg-preview.png"; 

const Comprobante = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito = [], total = 0 } = location.state || { productos: [] };

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState(''); 
  const [numeroFactura, setNumeroFactura] = useState(0);
  const [metodoPago, setMetodoPago] = useState('');
  const [productosConCodigo, setProductosConCodigo] = useState([]);

  useEffect(() => {
    const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber') || 100000; 
    const nextInvoiceNumber = Number(lastInvoiceNumber) + 1;
    setNumeroFactura(nextInvoiceNumber);
    localStorage.setItem('lastInvoiceNumber', nextInvoiceNumber); 

    const carritoConCodigo = carrito.map(producto => ({
      ...producto,
      codigo: producto.codigo || generarCodigoAleatorio()
    }));
    setProductosConCodigo(carritoConCodigo);
  }, [carrito]);

  const handlePaymentChange = (e) => {
    const method = e.target.value;
    setMetodoPago(method);
    const paymentLinks = {
      'Credito con Mastercard': 'https://www.mastercard.com',
      'Débito con Nequi': 'https://www.nequi.com.co',
      'Débito con Daviplata': 'https://www.daviplata.com',
      'Débito con PayPal': 'https://www.paypal.com'
    };

    if (paymentLinks[method]) {
      window.open(paymentLinks[method], '_blank');
    }
  };

  const generarCodigoAleatorio = (length = 8) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < length; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indice];
    }
    return codigo;
  };

  const ActualizarFactura = async (numeroFactura, factura) => {
    try {
      const response = await fetch(`http://localhost:5013/api/facturas/${numeroFactura}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(factura)
      });
      if (response.ok) {
        console.log("Factura actualizada");
      } else {
        console.log("Factura no actualizada");
      }
    } catch (err) {
      console.log("Factura no actualizada");
    }
  };

  const handlePrint = async () => {
    const correoEnviar = correoUsuario || "correo@default.com"; 
    console.log("Correo a enviar:", correoEnviar);

    const productosParaGuardar = productosConCodigo.map(producto => 
      `${producto.nombre} (Código: ${producto.codigo})`
    ).join(', ');

    try {
      const response = await axios.post('http://localhost:5013/api/factura', {
        nombre,
        telefono,
        correo: correoEnviar, 
        numeroFactura,
        productos: productosParaGuardar, 
        total,
        metodoPago
      });

      alert('Comprobante guardado exitosamente');

      const doc = new jsPDF();
      const fecha = new Date().toLocaleDateString();
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      const imgData = await fetch(jhoanLogo).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
      doc.addImage(imgData, 'JPEG', 15, 10, 30, 30);
      doc.setFontSize(14);
      doc.text("Jhoan Uniforms", 60, 25);
      doc.setFontSize(10);
      doc.text("Dirección de la tienda, Localidad de Kennedy", 60, 30);
      doc.text("Teléfono: 3106072362", 60, 35);
      doc.text("Email: devoluciones37@gmail.com", 60, 40);

      doc.setFontSize(12);
      doc.text(`Fecha: ${fecha}`, 20, 60);
      doc.text(`Comprobante de pago: ${numeroFactura}`, 20, 70);
      doc.text(`Nombre: ${nombre}`, 20, 80);
      doc.text(`Teléfono: ${telefono}`, 20, 90);
      doc.text(`Correo: ${correoEnviar}`, 20, 100); 

      doc.setFont("helvetica", "bold");
      doc.text("Productos", 20, 110);
      doc.setFont("helvetica", "normal");

      doc.autoTable({
        startY: 120,
        head: [['Código', 'Producto', 'Cantidad', 'Precio', 'Subtotal']],
        body: productosConCodigo.map((producto) => [
          producto.codigo,
          producto.nombre,
          producto.cantidad,
          `$${producto.precio.toFixed(2)}`,
          `$${(producto.precio * producto.cantidad).toFixed(2)}`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255] },
        margin: { top: 10, left: 20, right: 20 },
        styles: { fontSize: 10, cellPadding: 5 },
      });

      doc.setFont("helvetica", "bold");
      doc.text(`Total a Pagar: $${total.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);
      doc.text(`Método de Pago: ${metodoPago}`, 20, doc.lastAutoTable.finalY + 20);

      doc.save("comprobante.pdf");

    } catch (error) {
      console.error('Error al guardar el comprobante', error);
      alert('Registrarse primero, para acceder al registro de su compra');
    }
  };

  const handleReturn = () => {
    navigate('/devolucion', { state: { numeroFactura, carrito } });
  };

  return (
    <div className="factura-container">
      <div className="factura-box">
        <header className="factura-header">
          <h1><b>Comprobante de Compra</b></h1>
        </header>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="factura-info">
            <input
              type="name"
              placeholder="Nombre Completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico" 
              value={correoUsuario}
              onChange={(e) => setCorreoUsuario(e.target.value)}
              required
            />
            <input
              type="name"
              placeholder="Número de comprobante"
              value={numeroFactura}
              readOnly
            />
          </div>

          <div className="productos">
            <h3>Información de Venta</h3>
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productosConCodigo.length > 0 ? (
                  productosConCodigo.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.codigo}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.cantidad}</td>
                      <td>${producto.precio.toFixed(2)}</td>
                      <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No hay productos seleccionados.</td></tr>
                )}
              </tbody>
            </table>
            <div className="total">
              <span>Total: </span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="metodo-pago">
            <h3>Métodos de Pago</h3>
            <div className="payment-options">
              {['Credito con Mastercard', 'Débito con Nequi', 'Débito con Daviplata', 'Débito con PayPal', 'Efectivo'].map(method => (
                <div key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="payment"
                    value={method}
                    checked={metodoPago === method}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor={method}>
                    <img 
                      src={method === 'Credito con Mastercard' ? mater : method === 'Débito con Nequi' ? nequi : method === 'Débito con Daviplata' ? daviplata : method === 'Débito con PayPal' ? paypal : efectivo} 
                      alt={method}
                    />
                    {method}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            <button 
              onClick={handlePrint} 
              disabled={!nombre || !telefono || !correoUsuario || !numeroFactura || productosConCodigo.length === 0}
            >
              Imprimir Comprobante de Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comprobante;
