import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./syle/crudA.css";

function ModificarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    apodo: "",
    apellido: "",
    correo: "",
    contraseña: "",
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await Axios.get(`http://localhost:5013/consultar/${id}`);
        setUsuario(response.data); 
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
      }
    };
    obtenerUsuario();
  }, [id]);
  

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:5013/actualizar/${id}`, usuario);
      alert("Usuario actualizado correctamente");
      navigate("/crud");
    } catch (error) {
      console.error("Error actualizando el usuario:", error);
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2 className="crud-title">Modificar Usuario</h2>
      </div>
      <form onSubmit={handleSubmit} className="crud-form">
        <label>Apodo:</label>
        <input type="text" name="apodo" value={usuario.apodo} onChange={handleChange} required />

        <label>Apellido:</label>
        <input type="text" name="apellido" value={usuario.apellido} onChange={handleChange} required />

        <label>Correo:</label>
        <input type="text" name="correo" value={usuario.correo} onChange={handleChange} required />

    

        <div className="crud-button-container">
          <button type="submit" className="crud-button edit">Actualizar Usuario</button>
          <button type="button" className="crud-button delete" onClick={() => navigate("/crud")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ModificarUsuario;
