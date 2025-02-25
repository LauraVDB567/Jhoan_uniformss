import React from 'react';
import './carrito.css'; 
import jhoan_icon from "../Archivos/Jhoan_Uniforms-removebg-preview.png";
import saco_azul from '../Archivos/saco_azul.jpeg';
import saco_verde from "../Archivos/saco-removebg-preview.png"
import saco_negro from "../Archivos/saco_negro-removebg-preview.png"
import saco_gris from "../Archivos/saco gris.png"
import jardinera_azul from "../Archivos/jardinera_azul-removebg-preview.png"
import jardinera_gris from "../Archivos/jardinera gris.webp"
import jadrinera_clara from "../Archivos/jardinera_clara-removebg-preview.png"
import jardinera_oscura from "../Archivos/jardinera_de_rayas-removebg-preview.png"
import pantalon_negro from "../Archivos/pantalon_negro-removebg-preview - copia.png"
import pantalon_gris from "../Archivos/pantalon_gris-removebg-preview.png"
import pantalon_azul from "../Archivos/pantalon_azul-removebg-preview.png"
import pantalon_beigth from "../Archivos/beich-removebg-preview.png"
import medias_blancas from "../Archivos/medias_blancas-removebg-preview.png"
import medias_negras from "../Archivos/negra-removebg-preview.png"
import medias_azules from "../Archivos/media_azul-removebg-preview.png"
import medias_gris from "../Archivos/medias_gris-removebg-preview.png"
import zapatos_colegio from "../Archivos/image-removebg-preview.png"
import zapatos_2 from "../Archivos/zapatos.png"
import zapatos_blancos from "../Archivos/zapatos blancos.png"
import zapatos_deportivos from "../Archivos/tipo.png"

function CarritoDeCompras() {
  return ( 
    <div>
      <header>
        <a href="../html/principal1.html">
          <label htmlFor="menu">
            <img 
              src={jhoan_icon} 
              className="menu-icono" 
              height="50" 
              width="50" 
              alt="Icono"
            />
          </label>
        </a>
        <h1>CARRITO DE COMPRAS</h1>
      </header>
<br></br>
      <section className="contenedor">
        <div className="contenedor-items">
          {[
            {
              title: "Saco De Color Verde",
              img: saco_verde,
              price: "$45.000",
              link: "../html/verde.html"
            },
            {
              title: "Saco De Color Negro",
              img: saco_negro,
              price: "$45.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Saco De Color Azul",
              img:saco_azul,
              price: "$46.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Saco De Color Gris",
              img: saco_gris,
              price: "$43.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Jardinera Azul",
              img:jardinera_azul,
              price: "$42.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Jardinera De Rayas Oscura",
              img: jardinera_oscura,
              price: "$45.500",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Jardinera De Rayas Clara",
              img:jadrinera_clara,
              price: "$44.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Jardinera Gris",
              img:jardinera_gris,
              price: "$45.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Pantalon Negro",
              img: pantalon_negro,
              price: "$40.800",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Pantalon Gris",
              img: pantalon_gris,
              price: "$41.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Pantalon Azul",
              img:pantalon_azul,
              price: "$41.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Pantalon Beige",
              img:pantalon_beigth,
              price: "$41.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Medias blancas",
              img:medias_blancas,
              price: "$9.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Medias Negras",
              img:medias_negras,
              price: "$7.500",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Medias Azules",
              img:medias_azules,
              price: "$8.500",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Medias Grises",
              img:medias_gris,
              price: "$8.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Zapatos de diario",
              img:zapatos_colegio,
              price: "$50.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Zapatos de diario estilo 2",
              img:zapatos_2,
              price: "$51.000",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Zapatos Blancos",
              img: zapatos_blancos,
              price: "$47.800",
              link: "../html/iniciosesion1.html"
            },
            {
              title: "Zapatos Blancos Deportivos",
              img:zapatos_deportivos,
              price: "$50.000",
              link: "../html/iniciosesion1.html"
            }
          ].map((item, index) => (
            <div className="item" key={index}>
              <span className="titulo-item">{item.title}</span>
              <a href={item.link}>
                <img 
                  src={item.img} 
                  height="265" 
                  width="265" 
                  className="img-item" 
                  alt={item.title}
                />
              </a>
              <span className="precio-item">{item.price}</span>
              <button className="boton-item">Agregar al Carrito</button>
            </div>
          ))}
        </div>
        <div className="carrito" id="carrito">
          <div className="header-carrito">
            <h2>Tu Carrito</h2>
          </div>
          <div className="carrito-items"></div>
          <div className="carrito-total">
            <div className="fila">
              <strong>Tu Total</strong>
              <span className="carrito-precio-total">
                $120.000,00
              </span>
            </div>
            <a href="../php/generar_voucher.php">
              <button className="btn-pagar">
                Pagar <i className="fa-solid fa-bag-shopping"></i>
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarritoDeCompras;
