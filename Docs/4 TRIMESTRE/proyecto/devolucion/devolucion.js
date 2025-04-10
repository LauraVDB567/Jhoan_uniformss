const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "datos"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});


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

app.get('/api/factura/numeroFactura/:numeroFactura', (req, res) => {
  const { numeroFactura } = req.params;

  const query = 'SELECT * FROM factura WHERE numeroFactura = ?';
  db.query(query, [numeroFactura], (err, results) => {
    if (err) {
      console.error('Error al buscar la actura:', err);
      return res.status(500).json({ message: 'Error al buscar su factura', error: err });
    }

    if (results.length > 0) {
      const factura = results[0];
      if (factura.productos) {
        factura.productos = JSON.parse(factura.productos);
      }
      return res.status(200).json(factura);
    } else {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
  });
});

app.post('/api/devolucion', (req, res) => {
  const {numeroFactura, nombre, telefono, productos, total, metodoPago,comentarios,correo} = req.body;

  if (!numeroFactura || !nombre || !telefono || !productos || !total || !metodoPago || !comentarios || !correo) {
    console.error('Datos faltantes:', {numeroFactura, nombre, telefono, productos, total, metodoPago,comentarios,correo });
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  const queryFactura = 'SELECT * FROM factura WHERE numeroFactura = ?';
  db.query(queryFactura, [numeroFactura], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta de factura:', err);
      return res.status(500).json({ message: 'Error al verificar la factura', error: err });
    }
    const queryDevolucion = 'INSERT INTO devolucion (numeroFactura, nombre, telefono, productos, total, metodoPago,comentarios,correo) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
    
    db.query(queryDevolucion, [numeroFactura, nombre, telefono, JSON.stringify(productos), total, metodoPago, comentarios,correo], (err, results) => {
      if (err) {
        console.error('Error al registrar la devolución:', err);
        return res.status(500).json({ message: 'Error al registrar la devolución', error: err });
      }


app.get('/api/devolucion', (req, res) => {
  const query = 'SELECT * FROM devolucion'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las devoluciones:', err);
      return res.status(500).json({ error: 'Error al obtener las devoluciones' });
    }
    res.json(results);
  });
});

  
      const mailOptions = {
        from: 'johanuniforms@gmail.com', 
        to: correo, 
        subject: 'Confirmación de Devolución - Jhoan Uniforms',
        html: `
          <h2>Confirmación de Devolución</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Número de Factura:</strong> ${numeroFactura}</p>
          <p><strong>Productos Devueltos:</strong> ${productos.join(', ')}</p>
          <p><strong>Total:</strong> $${total}</p>
          <p><strong>Método de Pago:</strong> ${metodoPago}</p>
          <p><strong>Comentarios:</strong> ${comentarios}</p>
          <p>Gracias por confiar en Jhoan Uniforms.</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          return res.status(500).json({ message: 'Error al enviar el correo de confirmación', error });
        }

        res.status(200).json({
          message: 'Devolución registrada con éxito y correo enviado',
          response: { numeroFactura, nombre, telefono, productos, total, metodoPago,comentarios,correo }
        });
      });
    });
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


