const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Ajusta según tu estructura

// Obtener productos del carrito
router.get('/carrito', (req, res) => {
    connection.query('SELECT * FROM datos.carrito', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener productos' });
        res.json(results);
    });
});

module.exports = router;
