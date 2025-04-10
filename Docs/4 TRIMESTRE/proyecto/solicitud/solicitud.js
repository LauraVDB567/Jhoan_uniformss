const nodemailer = require('nodemailer');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const solicitudes = [];


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error al configurar nodemailer:', error);
  } else {
    console.log('Nodemailer funcionando correctamente.');
  }
});

// Enviar solicitud de devolución
app.post('/api/enviar-correo', async (req, res) => {
  const {
    correoUsuario,
    nombreUsuario,
    numeroFactura,
    enlaceDevolucion,
    telefonoUsuario,
    productoUsuario,
    comentarioUsuario,
    metodoPagoUsuario,
    totalUsuario,
  } = req.body;

  if (!correoUsuario || !nombreUsuario || !numeroFactura || !telefonoUsuario|| !productoUsuario|| !comentarioUsuario|| !metodoPagoUsuario||!totalUsuario||!enlaceDevolucion) {
    return res.status(400).json({ message: 'Faltan datos para enviar el correo.' });
  }

  const nuevaSolicitud = {
    _id: crypto.randomUUID(),
    usuario: nombreUsuario,
    correo: correoUsuario,
    telefono: telefonoUsuario,
    producto: productoUsuario || [],
    comentario: comentarioUsuario || '',
    metodoPago: metodoPagoUsuario || '',
    total: totalUsuario || 0,
    numeroFactura,
    enlaceDevolucion,
    fecha: new Date().toISOString()
  };

  const mailOptions = {
    from: 'jhoanUniforms@gmail.com',
    to: correoUsuario,
    subject: `Devolución de Producto - Factura ${numeroFactura}`,
    text: `
Hola ${nombreUsuario},

Hemos recibido tu solicitud de devolución para la factura ${numeroFactura}.

Puedes realizar el seguimiento de tu solicitud de devolución a través del siguiente enlace:
${enlaceDevolucion}

Si tienes alguna duda, no dudes en contactarnos.

Saludos,
El equipo de Jhoan Uniforms.
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    solicitudes.push(nuevaSolicitud);
    res.status(200).json({ message: 'Correo enviado y solicitud guardada.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

// Obtener todas las solicitudes (resumen)
app.get('/api/solicitudes-devolucion', (req, res) => {
  const resumen = solicitudes.map(
    ({ _id, usuario, correo, numeroFactura, producto, telefono, metodoPago, total, comentario }) => ({
      _id,
      usuario,
      correo,
      numeroFactura,
      producto,
      telefono,
      metodoPago,
      total,
      comentario
    })
  );
  res.status(200).json(resumen);
});



app.get('/api/solicitudes-devolucion/:solicitud._id/detalles', (req, res) => {
  const { id } = req.params;
  const solicitud = solicitudes.find(s => s._id === id);
  if (solicitud) {
    res.status(200).json({
      _id: solicitud._id,
      usuario: solicitud.usuario,
      correo: solicitud.correo,
      numeroFactura: solicitud.numeroFactura,
      telefono: solicitud.telefono,
      producto: solicitud.producto,
      comentario: solicitud.comentario,
      metodoPago: solicitud.metodoPago,
      total: solicitud.total
    });
  } else {
    res.status(404).json({ message: 'Solicitud no encontrada.' });
  }
});




// Aceptar solicitud
app.post('/api/solicitudes-devolucion/:id/aceptar', async (req, res) => {
  const { id } = req.params;
  const index = solicitudes.findIndex(s => s._id === id);
  if (index !== -1) {
    const solicitud = solicitudes[index];

    const mailOptions = {
      from: 'jhoanUniforms@gmail.com',
      to: solicitud.correo,
      subject: `Solicitud de Devolución Aceptada - Factura ${solicitud.numeroFactura}`,
      text: `
Hola ${solicitud.usuario},

Tu solicitud de devolución para la factura ${solicitud.numeroFactura} ha sido ACEPTADA.

Puedes continuar el proceso de devolución de forma virtual a través del siguiente enlace:
${solicitud.enlaceDevolucion}

O presencialmente, acércate con el producto y la factura.

Saludos,
El equipo de Jhoan Uniforms.
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      solicitudes.splice(index, 1);
      res.status(200).json({ message: 'Solicitud aceptada y correo enviado.' });
    } catch (error) {
      console.error('Error al enviar correo:', error);
      res.status(500).json({ message: 'Error al enviar correo de aceptación.' });
    }
  } else {
    res.status(404).json({ message: 'Solicitud no encontrada.' });
  }
});

// Rechazar solicitud
app.post('/api/solicitudes-devolucion/:id/rechazar', async (req, res) => {
  const { id } = req.params;
  const index = solicitudes.findIndex(s => s._id === id);
  if (index !== -1) {
    const solicitud = solicitudes[index];

    const mailOptions = {
      from: 'jhoanUniforms@gmail.com',
      to: solicitud.correo,
      subject: `Solicitud de Devolución Rechazada - Factura ${solicitud.numeroFactura}`,
      text: `
Hola ${solicitud.usuario},

Lamentamos informarte que tu solicitud de devolución para la factura ${solicitud.numeroFactura} ha sido RECHAZADA.

No cumple con los criterios establecidos en nuestra política de devoluciones.

Si deseas más información, contáctanos.

Saludos,
El equipo de Jhoan Uniforms.
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      solicitudes.splice(index, 1);
      res.status(200).json({ message: 'Solicitud rechazada y correo enviado.' });
    } catch (error) {
      console.error('Error al enviar correo:', error);
      res.status(500).json({ message: 'Error al enviar correo de rechazo.' });
    }
  } else {
    res.status(404).json({ message: 'Solicitud no encontrada.' });
  }
});

// Iniciar servidor
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
