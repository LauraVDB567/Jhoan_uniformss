const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "basedatos"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.post('/api/factura', (req, res) => {
  const { nombre,correo,telefono, numeroFactura, productos, total, metodoPago } = req.body;
  console.log('Datos recibidos:', req.body);

  const producto = JSON.stringify(productos);

  const query = 'INSERT INTO factura(nombre,correo, telefono, numeroFactura, productos, total, metodoPago) VALUES (?,?, ?, ?, ?, ?, ?)';
  
  db.query(query, [nombre,correo, telefono, numeroFactura, producto, total, metodoPago], (err, result) => {
    if (err) {
      console.error('Error al guardar la factura:', err.sqlMessage);
      return res.status(500).json({ error: 'Error al guardar la factura' });
    }
    res.status(201).json({ message: 'Factura guardada', id: result.insertId });
  });
});

app.get('/api/factura/numeroFactura/:numeroFactura', (req, res) => {
  const { numeroFactura } = req.params;
  console.log('Buscando numero de factura:', numeroFactura);

  const query = 'SELECT * FROM factura WHERE numeroFactura = ?';
  db.query(query, [numeroFactura], (err, results) => {
    if (err) {
      console.error('Error al buscar la factura:', err);
      return res.status(500).json({ error: 'Error al buscar la factura' });
    }
    console.log('Resultados:', results);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Factura no encontrada' });
    }
  });
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log(`Corriendo por el puerto ${PORT}`);
});
