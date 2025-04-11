const express = require('express'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const crudUsuarios = require("./routes/crudUsuarios"); // Crud Empleados 
app.use("/crudUsuarios", crudUsuarios);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});