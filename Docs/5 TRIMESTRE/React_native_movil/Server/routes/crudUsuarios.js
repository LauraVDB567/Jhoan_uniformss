const express = require('express');
const router = express.Router();
const db = require("../db/db");

// Obtener todos los usuario
router.get("/ConseguirUsuarios", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error al obtener el usuario:", err);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
    res.json(results);
  });
});

// Obtener un usuario por ID
router.get("/ConseguirUsuario/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error al obtener el usuario:", err);
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(results[0]);
  });
});

// Registrar un nuevo usuario
router.post("/CrearUsuario", (req, res) => {
  const { id, name, email, phone } = req.body;
  db.query(
    "INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)",
    [id, name, email, phone],
    (err, results) => {
      if (err) {
        console.error("Error al crear el usuario:", err);
        return res.status(500).json({ error: "Error al crear el usuario" });
      }
      res.status(201).json({ message: "Usuario creado exitosamente" });
    }
  )
});

// Actualizar un usuario
router.put("/ActualizarUsuario/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  db.query(
    "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar el usuario:", err);
        return res.status(500).json({ error: "Error al actualizar el usuario" });
      }
      res.json({ message: "Usuario actualizado exitosamente" });
    }
  );

});

router.delete("/EliminarUsuario/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log("Error al eliminar el usuario:", err);
      return res.status(500).json({ error: "Error al eliminar el usuario" });
    }

    console.log("Usuario eliminado exitosamente");
    res.json({ message: "Usuario eliminado correctamente" });
  });
});
module.exports = router; 
