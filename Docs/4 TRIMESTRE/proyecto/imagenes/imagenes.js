const express = require("express");
const mysql = require ("mysql");
const conn = require("express-myconnection")
const routes = require ('./routes/image.routes')
const app = express ();
const path = require("path");
const carpetaCarrito = path.join(__dirname, '..', 'carrito'); 
app.use('/carrito', express.static(carpetaCarrito));

const cors = require("cors");
app.use(cors());

app.set("port", process.env.PORT|| 5000)
const dbConfig ={
    host:"localhost",
    user:"root",
    password:"",
    database :"datos"
};

app.use (conn(mysql,dbConfig, 'single'));


app.use('/',routes)



app.listen(app.get ('port'), ()=>{
console.log("servidor funcionando por el puerto",app.get("port"));
});