import React, { useState } from 'react';
import azul from '../Archivos/azul-removebg-preview.png';
import saco_verde from '../Archivos/saco-removebg-preview.png';
import saco_negro from '../Archivos/saco_negro-removebg-preview.png';
import saco_gris from '../Archivos/saco gris.png';
import jardinera_azul from '../Archivos/jardinera_azul-removebg-preview.png';
import jardinera_gris from '../Archivos/jardinera gris.webp';
import jadrinera_clara from '../Archivos/jardinera_clara-removebg-preview.png';
import jardinera_oscura from '../Archivos/jardinera_de_rayas-removebg-preview.png';
import pantalon_negro from '../Archivos/pantalon_negro-removebg-preview - copia.png';
import pantalon_gris from '../Archivos/pantalon_gris-removebg-preview.png';
import pantalon_azul from '../Archivos/pantalon_azul-removebg-preview.png';
import pantalon_beigth from '../Archivos/beich-removebg-preview.png';
import medias_blancas from '../Archivos/medias_blancas-removebg-preview.png';
import medias_negras from '../Archivos/negra-removebg-preview.png';
import medias_azules from '../Archivos/media_azul-removebg-preview.png';
import medias_gris from '../Archivos/medias_gris-removebg-preview.png';
import zapatos_colegio from '../Archivos/image-removebg-preview.png';
import zapatos_2 from '../Archivos/zapatos.png';
import zapatos_blancos from '../Archivos/zapatos blancos.png';
import zapatos_deportivos from '../Archivos/tipo.png';
import camisa_blanca1 from "../Archivos/camisa_larga-removebg-preview.png"
import camisa_blanca2 from "../Archivos/camisa-removebg-preview.png"
import camisa_blanca3 from "../Archivos/camisa2-removebg-preview.png"
import camisa_blanca4 from "../Archivos/camisacorta-removebg-preview.png"
import corbata_negra from "../Archivos/corbata negra.png"
import corbata_azul from "../Archivos/corbata azul.png"
import corbata_roja from "../Archivos/corbata roja.png"
import corbata_gris from "../Archivos/corbata gris.png"

import "./syle/carritocompras.css";
import { useNavigate } from 'react-router-dom';

const productosData = [
  { nombre: 'Saco Verde', precio: 45000, imagen: saco_verde, categoria: 'saco' },
  { nombre: 'Saco Negro', precio: 45000, imagen: saco_negro, categoria: 'saco' },
  { nombre: 'Saco Azul', precio: 46000, imagen: azul, categoria: 'saco' },
  { nombre: 'Saco Gris', precio: 43000, imagen: saco_gris, categoria: 'saco' },
  { nombre: 'Jardinera Azul', precio: 42000, imagen: jardinera_azul, categoria: 'jardinera' },
  { nombre: 'Jardinera Oscura', precio: 45500, imagen: jardinera_oscura, categoria: 'jardinera' },
  { nombre: 'Jardinera Clara', precio: 44000, imagen: jadrinera_clara, categoria: 'jardinera' },
  { nombre: 'Jardinera Gris', precio: 45000, imagen: jardinera_gris, categoria: 'jardinera' },
  { nombre: 'Pantalon Negro', precio: 40800, imagen: pantalon_gris, categoria: 'pantalon' },
  { nombre: 'Pantalon Gris', precio: 41000, imagen: pantalon_negro, categoria: 'pantalon' },
  { nombre: 'Pantalon Azul', precio: 41000, imagen: pantalon_azul, categoria: 'pantalon' },
  { nombre: 'Pantalon Beige', precio: 41000, imagen: pantalon_beigth, categoria: 'pantalon' },
  { nombre: 'Medias Blancas', precio: 9000, imagen: medias_blancas, categoria: 'media' },
  { nombre: 'Medias Negras', precio: 75000, imagen: medias_negras, categoria: 'media' },
  { nombre: 'Medias Azules', precio: 85000, imagen: medias_azules, categoria: 'media' },
  { nombre: 'Medias Grises', precio: 80000, imagen: medias_gris, categoria: 'media' },
  { nombre: 'Zapatos De Diario', precio: 50000, imagen: zapatos_colegio, categoria: 'zapato' },
  { nombre: 'Zapatos Estilo 2', precio: 51000, imagen: zapatos_2, categoria: 'zapato' },
  { nombre: 'Zapatos Blancos', precio: 47800, imagen: zapatos_blancos, categoria: 'zapato' },
  { nombre: 'Zapatos Deportivos', precio: 50000, imagen: zapatos_deportivos, categoria: 'zapato' },
  { nombre: 'Camisa Manga Larga', precio: 48000, imagen: camisa_blanca1, categoria: 'camisa' },
  { nombre: 'Camisa Blanca Normal', precio: 40000, imagen: camisa_blanca2, categoria: 'camisa' },
  { nombre: 'Camisa Blanca ', precio: 42000, imagen: camisa_blanca3, categoria: 'camisa' },
  { nombre: 'Camisa Manga Corta', precio: 43000, imagen: camisa_blanca4, categoria: 'camisa' },
  { nombre: 'Corbata Negra', precio:22000, imagen:corbata_negra, categoria: 'corbatas' },
  { nombre: 'Corbata Azul', precio:23000, imagen:corbata_azul, categoria: 'corbatas' },
  { nombre: 'Corbata Roja', precio:25000, imagen:corbata_roja, categoria: 'corbatas' },
  { nombre: 'Corbata Gris', precio:23000, imagen:corbata_gris, categoria: 'corbatas' }
];

const CarritoCompras = () => {
    const [carrito, setCarrito] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate(); 

    const agregarAlCarrito = (producto) => {
        const existingProduct = carrito.find(item => item.nombre === producto.nombre);
        if (existingProduct) {
            setCarrito(carrito.map(item =>
                item.nombre === producto.nombre
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const incrementarCantidad = (producto) => {
        setCarrito(carrito.map(item =>
            item.nombre === producto.nombre
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    const decrementarCantidad = (producto) => {
        const existingProduct = carrito.find(item => item.nombre === producto.nombre);
        if (existingProduct.cantidad > 1) {
            setCarrito(carrito.map(item =>
                item.nombre === producto.nombre
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            ));
        } else {
            setCarrito(carrito.filter(item => item.nombre !== producto.nombre));
        }
    };

    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    const generarFactura = () => {
        navigate('/factura', { state: { carrito, total } });
    };

    const productosFiltrados = productosData.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <h1><b>Carrito De Compras</b></h1>
            <div>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="button-lupa" onClick={() => setBusqueda("")}>🔍</button>
            </div>
            <div className="producto-container">
                {productosFiltrados.map((producto, index) => (
                    <div key={index} className="producto">
                        <img src={producto.imagen} alt={producto.nombre} />
                        <h2>{producto.nombre}</h2>
                        <p>Precio: ${producto.precio}</p>
                        <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                    </div>
                ))}
            </div>

            <div className="carrito">
                <h2>Carrito de Compras</h2>
                <ul>
                    {carrito.map((producto, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {producto.nombre} - ${producto.precio} x {producto.cantidad}
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button style={{ fontSize: '12px' }} onClick={() => incrementarCantidad(producto)}>+</button>
                                <button style={{ fontSize: '12px' }} onClick={() => decrementarCantidad(producto)}>-</button>
                                <button style={{ fontSize: '12px' }} onClick={() => decrementarCantidad(producto)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <p>Total: ${total.toFixed(2)}</p>
                <button onClick={generarFactura}>Generar Factura</button>
            </div>
        </div>
    );
};

export default CarritoCompras;

