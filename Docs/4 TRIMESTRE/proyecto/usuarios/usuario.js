const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

app.use(cors());
app.use(express.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "datos"
});

// Conectar a la base de datos
 db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Función para hashear con SHA-256 (para el administrador)
const hashSHA256 = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

// Registro de usuarios (rol_code = 2 por defecto para usuarios normales)
app.post("/api/registro", async (req, res) => {
    const { apodo, apellido, correo, contraseña } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        db.query(
            "INSERT INTO usuarios (rol_code, apodo, apellido, correo, contraseña) VALUES (2, ?, ?, ?, ?)",
            [apodo, apellido, correo, hashedPassword],
            (err) => {
                if (err) {
                    console.error(" Error al registrar el usuario:", err);
                    return res.status(500).json({ error: "Error al registrar el usuario" });
                }
                res.status(201).json({ message: " Usuario registrado con éxito" });
            }
        );
    } catch (err) {
        console.error("Error en el registro:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Función para verificar credenciales en ambas tablas
const verificarCredenciales = (correo, contraseña, callback) => {
    // Buscar en la tabla administrador (SHA-256)
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
                    }); // Es administrador
                }
                return callback(null, null); // Contraseña incorrecta
            }

            // Si no es administrador, buscar en usuarios (bcrypt)
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
                                    }); // Es usuario normal
                                }
                                return callback(null, null); // Contraseña incorrecta
                            }
                        );
                    } else {
                        return callback(null, null); // No encontrado
                    }
                }
            );
        }
    );
};

// Inicio de sesión
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

        // Redirigir según el rol
        if (usuario.rol_code === 1) {
            return res.status(200).json({ message: "Inicio de sesión exitoso", rol_code: 1 }); // Administrador
        } else if (usuario.rol_code === 2) {
            return res.status(200).json({ message: "Inicio de sesión exitoso", rol_code: 2 }); // Usuario
        } else {
            return res.status(200).json({ message: "Inicio de sesión exitoso", rol_code: usuario.rol_code });
        }
    });
});

// Iniciar el servidor
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
