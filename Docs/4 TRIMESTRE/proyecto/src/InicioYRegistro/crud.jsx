import "./syle/crudA.css";
import { useState, useEffect } from 'react';
import Axios from 'axios';


function Crud() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [fecha, setFecha] = useState("");
  const [editar, setEditar] = useState(false);
  const [crudList, setCrud] = useState([]);

  const agregar = (event) => {
    event.preventDefault();
    if (editar) {
      Axios.put("http://localhost:3001/actualizar", {
        id: id,
        nombre: nombre,
        cedula: cedula,
        fecha: fecha
      }).then(() => {
        getCrud();
        alert("Usuario actualizado");
        resetForm();
      });
    } else {
      Axios.post("http://localhost:3001/create", {
        id: id,
        nombre: nombre,
        cedula: cedula,
        fecha: fecha
      }).then(() => {
        getCrud();
        alert("Usuario registrado");
        resetForm();
      });
    }
  };

  const editarUsuario = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setCedula(val.cedula);
    setFecha(val.fecha);
  };

  const eliminarUsuario = (id) => {
    const confirmar = window.confirm("¿Deseas eliminar a este usuario?");
    if (confirmar) {
      Axios.delete(`http://localhost:3001/crud/${id}`).then(() => {
        getCrud();
        alert("Usuario eliminado");
      }).catch((error) => {
        console.error("Error eliminando el usuario:", error);
        alert("Error al eliminar el usuario");
      });
    }
  };

  const getCrud = () => {
    Axios.get("http://localhost:3001/crud").then((response) => {
      setCrud(response.data);
    });
  };

  const resetForm = () => {
    setId("");
    setNombre("");
    setCedula("");
    setFecha("");
    setEditar(false);
  };

  useEffect(() => {
    getCrud();
  }, []);

  return (
    
    <div>
      <br />
      <div><h1><b>Crud Usuarios</b></h1></div>
      <center>
        <form className="crud-App" onSubmit={agregar}>
          <input
            type="texto"
            id="crud-id"
            value={id}
            placeholder="ID"
            onChange={(event) => setId(event.target.value)}
            className="crud-input"
          />
          <br />
          <input
            type="texto"
            id="crud-nombre"
            value={nombre}
            placeholder="Nombre"
            onChange={(event) => setNombre(event.target.value)}
            className="crud-input"
          />
          <br />
          <input
            type="texto"
            id="crud-cedula"
            value={cedula}
            placeholder="Cédula"
            onChange={(event) => setCedula(event.target.value)}
            className="crud-input"
          />
          <br />
          <input
            type="date"
            id="crud-fecha"
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
            className="crud-input"
          />
          <br />
          <button type="submit" className="btn btn-outline-primary crud-btn">
            {editar ? "Actualizar" : "Agregar"}
          </button>
          <br /><br /><br />
          <table className="crud-table">
            <thead className="crud-table-light">

              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cédula</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
              </tr>
         
            </thead>
            <tbody>
              {crudList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.id}</td>
                    <td>{val.nombre}</td>
                    <td>{val.cedula}</td>
                    <td>{val.fecha}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={() => editarUsuario(val)} className="btn btn-warning crud-btn">Editar</button>
                        <button type="button" onClick={() => eliminarUsuario(val.id)} className="btn btn-danger crud-btn">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </center>
    </div>
    
  );
}

export default Crud;
