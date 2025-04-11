const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

const hashSHA256 = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

app.post("/api/registro", async (req, res) => {
    const { apodo, apellido, correo, contraseña } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
 
        db.query(
            "INSERT INTO usuarios (rol_code, apodo, apellido, correo, contraseña) VALUES (2, ?, ?, ?, ?)",
            [apodo, apellido, correo, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Error al registrar el usuario:", err);
                    return res.status(500).json({ error: "Error al registrar el usuario" });
                }
                res.status(201).json({ message: "Usuario registrado con éxito" });
            }
        );
    } catch (err) {
        console.error("Error en el registro:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

const verificarCredenciales = (correo, contraseña, callback) => {
    db.query(
        "SELECT correo, contraseña, rol_code FROM administrador WHERE correo = ?",
        [correo],
        (err, adminResults) => {
            if (err) return callback(err, null);

            if (adminResults.length > 0) {
                const admin = adminResults[0];
                const hashedPassword = hashSHA256(contraseña);

                if (hashedPassword === admin.contraseña) {
                    return callback(null, {
                        rol_code: admin.rol_code,
                        correo: admin.correo,
                    });
                }
                return callback(null, null);
            }

            db.query(
                "SELECT correo, contraseña, rol_code FROM usuarios WHERE correo = ?",
                [correo],
                (err, userResults) => {
                    if (err) return callback(err, null);

                    if (userResults.length > 0) {
                        const usuario = userResults[0];

                        bcrypt.compare(
                            contraseña,
                            usuario.contraseña,
                            (err, isMatch) => {
                                if (err) return callback(err, null);
                                if (isMatch) {
                                    return callback(null, {
                                        rol_code: usuario.rol_code,
                                        correo: usuario.correo,
                                    });
                                }
                                return callback(null, null);
                            }
                        );
                    } else {
                        return callback(null, null);
                    }
                }
            );
        }
    );
};


app.get ("/consultar/:id", (req,res)=>{
    const {id}= req.params
    db.query ("SELECT * FROM usuarios WHERE id=?",
    [id], (err,result)=>{
        if (err){
            console.log (err);
            return res.status(400).send("Usuario no encontrado");
        }
        res.send(result)
        console.log ("Usuario encontrado")
      })});


app.post("/api/login", (req, res) => {
    const { correo, contraseña } = req.body;

    verificarCredenciales(correo, contraseña, (err, usuario) => {
        if (err) {
            console.error("Error al verificar credenciales:", err);
            return res.status(500).json({ error: "Error al iniciar sesión" });
        }

        if (!usuario) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        if (usuario.rol_code === 1) {
            return res.status(200).json({ message: "Inicio de sesión exitoso", rol_code: 1 });
        } else if (usuario.rol_code === 2) {
            return res.status(200).json({ message: "Inicio de sesión exitoso", rol_code: 2 });
        } else {
            return res.status(200).json({ message: "Inicio de sesión exitoso", rol_code: usuario.rol_code });
        }
    });
});


app.put("/actualizar/:id", async (req, res) => {
    const { apodo, apellido, correo, contraseña } = req.body;
    const { id } = req.params;

    try {
        let hashedPassword = contraseña;
        if (!contraseña.startsWith('$2b$')) {
            hashedPassword = await bcrypt.hash(contraseña, 10);
        }

        db.query(
            "UPDATE usuarios SET apodo=?, apellido=?, correo=?, contraseña=? WHERE id=?",
            [apodo, apellido, correo, hashedPassword, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Usuario no actualizado");
                }
                res.send(result);
                console.log("Usuario actualizado");
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el usuario");
    }
});

app.delete ("/eliminar/:id", (req,res)=>{
    const {id}=req.params;
   db.query("DELETE FROM usuarios WHERE id=?",
    [id],
    (err,result)=>{
        if (err){
            console.log (err)
            res.status(400).send ("Usuario no eliminado")
        }
        res.send (result)
        console.log ("Usuario elimando")
    }
   )
})
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
