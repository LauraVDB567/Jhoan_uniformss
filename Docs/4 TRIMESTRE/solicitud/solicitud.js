const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());



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
    console.error('Error al enviar el correo:', error);
  } else {
    console.log('nodemailer funcionando correctamente.');
  }
});

app.post('/api/enviar-correo', async (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  const { correoUsuario, nombreUsuario, numeroFactura,enlaceDevolucion } = req.body;

  if (!correoUsuario || !nombreUsuario || !numeroFactura|| !enlaceDevolucion) {
    return res.status(400).json({ message: 'Faltan datos para enviar el correo.' });
  }

  
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
    res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});


const PORT = 3008; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
