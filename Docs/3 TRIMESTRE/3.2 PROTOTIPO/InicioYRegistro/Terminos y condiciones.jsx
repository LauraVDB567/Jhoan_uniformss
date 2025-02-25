import React from 'react';
import './terminos.css';
import jhoan_icon from "../Archivos/Jhoan_Uniforms-removebg-preview.png";

function Terminosycondiciones() {
  return (
    <div className="container-terminos">
      <div className="icon-terminos">
        <a href="../html/principal1.html">
          <img 
            src={jhoan_icon} 
            className="menu-icono" 
            height="40" 
            width="40" 
            alt="Icono"
          />
        </a>
      </div>

      <div className="titulo-terminos-terminos">
        <h1 style={{ textAlign: 'center' }}>Términos y Condiciones</h1>
      </div>

      <div className="parrafo-terminos">
        <div className="tex.terminos">
          <h2 style={{ textAlign: 'center' }}><b>Información General</b></h2>
          <h3 style={{ textAlign: 'center' }}>
            La prestación del servicio del Portal Único de nuestro prototipo web Jhoan Uniforms 
            es de carácter libre y gratuito para los usuarios y se rige por los términos y condiciones que
            se incluyen a continuación, los cuales se entienden como conocidos y aceptados por los
            Ciudadanos-Usuarios del sitio. El uso de los datos personales del usuario se encuentra sujeto
            a la Política de Protección de Datos personales.
          </h3>
        </div>
      </div>

      <nav>
        <ul>
          <h3 style={{ color: 'black', fontFamily: 'cursive' }}>
            <li>RESTRICCIONES DE USO</li>
          </h3>
        </ul>
      </nav>

      <div id="RESTRICCIONES-DE-USO">
        <p>
          Todo el contenido que ves en el sitio Jhoan Uniforms, incluyendo, por ejemplo, las imágenes, 
          diseño del sitio, ilustraciones y gráficos son propiedad intelectual de NAF NAF. El contenido 
          del sitio nafnaf.com.co tiene como propósito el uso personal, no comercial de los usuarios de 
          este sitio. Podrás descargar, imprimir o guardar porciones seleccionadas del contenido que te 
          proveemos, pero con las siguientes condiciones:
        </p>
        <ul>
          <li>Que el uso sea personal, sin ningún propósito comercial</li>
          <li>No copiar ni reproducir el contenido en ningún medio</li>
          <li>No alterar o modificar de ninguna manera cualquier marca registrada.</li>
        </ul>
      </div>

      <nav>
        <ul>
          <h3 style={{ color: 'black', fontFamily: 'cursive' }}>
            <li>POLÍTICA DE PRECIOS</li>
          </h3>
        </ul>
      </nav>

      <div id="POLITICA-DE-PRECIOS">
        <p>
          Nuestro compromiso es ofrecer comodidad, servicio y disponibilidad de productos en línea todos 
          los días y a precios bajos, con algunas ofertas de mercancías de tiempo limitado y a precios 
          promocionales. La mercancía ofrecida en línea en ladyfriends.com.co suele tener el mismo precio 
          que la mercancía ofrecida en nuestras tiendas, aunque en algunos casos podrían existir diferencias.
        </p>
      </div>

      <nav>
        <ul>
          <h3 style={{ color: 'black', fontFamily: 'cursive' }}>
            <li>COLORES</li>
          </h3>
        </ul>
      </nav>

      <div id="COLORES">
        <p>
          Jhoan Uniforms ha realizado un esfuerzo para mostrar los colores de las prendas de la forma más 
          cercana a la realidad posible. No obstante, el color de las prendas que aparecen en pantalla 
          puede estar sujeto a variaciones dependiendo de la calidad del monitor de tu computador. En 
          este sentido, Jhoan Uniforms no puede garantizar que los colores que aparezcan en tu monitor 
          se ajusten fielmente a la realidad.
        </p>
      </div>

      <nav>
        <ul>
          <h3 style={{ color: 'black', fontFamily: 'cursive' }}>
            <li>COMUNICACIÓN</li>
          </h3>
        </ul>
      </nav>

      <div id="COMUNICACION">
        <p>
          Puede entregarte información, por medio de correos electrónicos, avisos generales en el sitio, 
          o por comunicación escrita enviada por correo físico a tu dirección de registro.
        </p>
      </div>

      <nav>
        <ul>
          <h3 style={{ color: 'black', fontFamily: 'cursive' }}>
            <li>POLÍTICAS DE ENVÍO</li>
          </h3>
        </ul>
      </nav>

      <div id="POLITICAS-DE-ENVIO">
        <p>
          Nuestro compromiso es cumplir con los tiempos de entrega, por lo tanto, si el día que llegue tu 
          pedido no estás presente para recibirlo, la transportadora estará autorizada para dejarlo en la 
          portería de la dirección indicada. Sabemos lo importante que es para ti y que no te gustaría 
          esperar hasta una próxima oportunidad para recibirlo.
        </p>
      </div>
    </div>
  );
}

export default Terminosycondiciones;
