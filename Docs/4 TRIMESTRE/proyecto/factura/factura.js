const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
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
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


app.get('/api/facturas', (req, res) => {
  const query = 'SELECT * FROM factura';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las facturas:', err);
      return res.status(500).json({ error: 'Error al obtener las facturas' });
    }
    res.json(results);
  });
});


app.get('/api/factura/numeroFactura/:numeroFactura', (req, res) => {
  const { numeroFactura } = req.params;

  const query = 'SELECT * FROM factura WHERE numeroFactura = ?';
  db.query(query, [numeroFactura], (err, results) => {
    if (err) {
      console.error('Error al buscar la factura:', err);
      return res.status(500).json({ error: 'Error al buscar la factura' });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Factura no encontrada' });
    }
  });
});


app.post('/api/factura', (req, res) => {
  const { nombre, correo, telefono, numeroFactura, productos, total, metodoPago } = req.body;
  const producto = JSON.stringify(productos);

  const query = 'INSERT INTO factura(nombre, correo, telefono, numeroFactura, productos, total, metodoPago) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre, correo, telefono, numeroFactura, producto, total, metodoPago], (err, result) => {
    if (err) {
      console.error('Error al guardar la factura:', err.sqlMessage);
      return res.status(500).json({ error: 'Error al guardar la factura' });
    }
    res.status(201).json({ message: 'Factura guardada', id: result.insertId });
  });
});


app.put('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, numeroFactura, productos, total, metodoPago } = req.body;
  const producto = JSON.stringify(productos);

  const query = 'UPDATE factura SET nombre = ?, correo = ?, telefono = ?, numeroFactura = ?, productos = ?, total = ?, metodoPago = ? WHERE numeroFactura = ?';
  
  db.query(query, [nombre, correo, telefono, numeroFactura, producto, total, metodoPago, id], (err, result) => {
    if (err) {
      console.error('Error al modificar la factura:', err);
      return res.status(500).json({ error: 'Error al modificar la factura' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json({ message: 'Factura actualizada correctamente' });
  });
});


app.delete('/api/facturas/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM factura WHERE numeroFactura = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la factura:', err);
      return res.status(500).json({ error: 'Error al eliminar la factura' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json({ message: 'Factura eliminada correctamente' });
  });
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
