const express = require("express"); 
const mysql = require("mysql");
const conn = require("express-myconnection");
const imageRoutes = require('./routes/image.routes');
const userRoutes = require('./routes/usuario.routes');
const facturaRoutes = require('./routes/factura.routes'); 
const app = express();
const path = require("path");
const devolucionRoutes = require('./routes/devolucion.routes');
const RecuperarRoutes = require('./routes/recuperar.routes');
const SolicitudRoutes = require ('./routes/solicitud.routes')

const carpetaCarrito = path.join(__dirname, '..', 'carrito');
app.use('/carrito', express.static(carpetaCarrito));

const cors = require("cors");
app.use(cors());
app.use(express.json()); 

app.set("port", process.env.PORT || 5013);

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "datos"
};

app.use(conn(mysql, dbConfig, 'single'));

// Rutas
app.use('/', imageRoutes);
app.use('/', userRoutes); 
app.use('/', facturaRoutes); 
app.use('/', devolucionRoutes);
app.use('/', RecuperarRoutes);
app.use('/', SolicitudRoutes);

app.listen(app.get('port'), () => {
    console.log("✅ Servidor funcionando por el puerto", app.get("port"));
});
