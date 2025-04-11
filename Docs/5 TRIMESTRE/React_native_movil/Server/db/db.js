const mysql = require("mysql");

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
  });

  db.connect((err) => {
    if (err) {
      console.log('Error de conexión a MySQL:', err);
    } else {
      console.log('Conectado a la base de datos MySQL');
    }
  });

  module.exports = db;