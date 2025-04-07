import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./syle/carritocompras.css";

const CarritoCompras = () => {
    const [carrito, setCarrito] = useState([]);
    const [productosData, setProductosData] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/productos")
            .then(res => res.json())
            .then(data => {
                const productosConInfo = data.map(p => {
                    const nombreLimpio = p.nombre
                        .replace(/^[\d-]+/, '')
                        .replace(/\.(jpg|jpeg|png)$/i, '')
                        .replace(/_/g, ' ')
                        .trim();

                    let precio = 0;
                    let categoria = "";

                    if (nombreLimpio.toLowerCase().includes("zapato")) {
                        precio = 45000;
                        categoria = "zapato";
                    } else if (nombreLimpio.toLowerCase().includes("corbata")) {
                        precio = 23000;
                        categoria = "corbatas";
                    } else {
                        precio = 40000;
                        categoria = "otros";
                    }

                    return {
                        nombre: nombreLimpio,
                        imagen: `http://localhost:5000/carrito/${p.imagen}`,
                        precio,
                        categoria
                    };
                });
                setProductosData(productosConInfo);
            })
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

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

    const cerrarSesion = () => {
        localStorage.removeItem("userSession");
        sessionStorage.clear();
        navigate("/", { replace: true });
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
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light registro-navbar">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        Sistema De Información Jhoan Uniforms
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link registro-nav-link" to="/">Principal</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link principal-nav-link" to="/carrito">Carrito de compras</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link registro-nav-link" to="/Terminosycondiciones">Términos y Condiciones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link registro-nav-link" to="/RecoverPassword">Recuperar</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link registro-nav-link" to="/InicioYRegistro">Registrarse</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link registro-nav-link" to="/solicitud">Devolución</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="carrito-container">
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
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${total.toFixed(2)}</p>
                    <button onClick={generarFactura}>Generar Factura</button>
                </div>
            </div>
        </>
    );
};

export default CarritoCompras;

