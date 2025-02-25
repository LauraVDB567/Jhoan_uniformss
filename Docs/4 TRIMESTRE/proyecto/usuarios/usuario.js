const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "basedatos"
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/api/registro', async (req, res) => {
    const { apodo, apellido, correo, contraseña } = req.body;

    try {
  
        const hashedPassword = await bcrypt.hash(contraseña, 10);

      
        db.query(
            'INSERT INTO usuarios (apodo, apellido, correo, contraseña) VALUES (?, ?, ?, ?)', 
            [apodo, apellido, correo, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Error al registrar:", err);
                    return res.status(500).send("Error al registrar el usuario");
                }
                res.send("Usuario registrado con éxito");
            }
        );
    } catch (err) {
        console.error("Error al registrar:", err);
        res.status(500).send("Error al registrar el usuario");
    }
});

app.post('/api/login', (req, res) => {
    const { correo, contraseña } = req.body;

   
    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).send('Error en la consulta');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const usuario = results[0];

        
        bcrypt.compare(contraseña, usuario.contraseña, (err, isMatch) => {
            if (err) {
                console.error("Error al comparar contraseñas:", err);
                return res.status(500).send("Error al iniciar sesión");
            }
            if (isMatch) {
                res.send('Inicio de sesión exitoso');
            } else {
                res.status(400).send('Contraseña incorrecta');
            }
        });
    });
});

app.listen(5001, () => {
    console.log('Servidor en ejecución en http://localhost:5001');
});
