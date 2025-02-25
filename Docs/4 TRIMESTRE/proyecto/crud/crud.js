const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "basedatos"
});


app.post("/create", (req, res) => {
    const { id, nombre, cedula, fecha } = req.body;

    db.query('INSERT INTO crud (id,nombre,cedula,fecha) VALUES (?, ?, ?, ?)', 
    [id, nombre, cedula, fecha], 
    (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al registrar el usuario");
        }
        res.send("Usuario registrado con éxito");
    });
});


app.get("/crud", (req, res) => {
    db.query('SELECT * FROM crud', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al obtener usuarios");
        }
        res.send(result);
    });
});


app.put("/actualizar", (req, res) => {
    const { id, nombre, cedula, fecha } = req.body;

    db.query('UPDATE crud SET nombre=?, cedula=?, fecha=? WHERE id=?', 
    [nombre, cedula, fecha, id], 
    (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al actualizar el usuario");
        }
        res.send("Usuario actualizado con éxito");
    });
});


app.delete("/crud/:id", (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM crud WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar el usuario:", err);
            return res.status(500).send("Error al eliminar el usuario");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.send("Deceas eliminar al usuario?");
    });
});

app.listen(3001, () => {
    console.log("Corriendo por el puerto 3001");
});
