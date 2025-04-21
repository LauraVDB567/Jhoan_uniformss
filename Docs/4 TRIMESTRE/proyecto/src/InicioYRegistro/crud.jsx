import "./syle/crudA.css";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

function Crud() {
  const [usuarios, setUsuarios] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const navigate = useNavigate();

  const cerrarsesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  const getUsuarios = async () => {
    try {
      const response = await Axios.get("http://localhost:5013/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error obteniendo los usuarios:", error);
    }
  };

  const getNotificaciones = async () => {
    try {
      const response = await Axios.get("http://localhost:5013/api/solicitudes-devolucion");
      setNotificaciones(response.data);
    } catch (error) {
      console.error("Error obteniendo las notificaciones:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await Axios.delete(`http://localhost:5013/eliminar/${id}`);
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
    }
  };

  const modificarUsuario = (id) => {
    if (id) {
      navigate(`/modificar-usuario/${id}`);
    }
  };

  const cambiarEstado = async (id, estadoActual) => {
    try {
      const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
      await Axios.put(`http://localhost:5013/api/usuarios/${id}`, { estado: nuevoEstado });
      setUsuarios(prev => prev.map(usuario => usuario.id === id ? { ...usuario, estado: nuevoEstado } : usuario));
    } catch (error) {
      console.error("Error cambiando el estado del usuario:", error);
    }
  };

  useEffect(() => {
    getUsuarios();
    getNotificaciones();
  }, []);

  return (
    <div className="crud-container">
      <header className="crud-header">
        <h1 className="crud-title"><b>GESTIONAR USUARIOS</b></h1>
        <div className="crud-header-buttons">
          <div className="notification-icon" onClick={() => navigate("/notificaciones")}>
            <FaBell size={20} />
            {notificaciones.length > 0 && (
              <span className="notification-badge">{notificaciones.length}</span>
            )}
          </div>
          <button className="crud-logout-button" onClick={cerrarsesion}>Cerrar Sesión</button>
        </div>
      </header>

      <table className="crud-table">
        <thead className="crud-thead">
          <tr>
            <th className="crud-th">ID</th>
            <th className="crud-th">Nombre</th>
            <th className="crud-th">Apellido</th>
            <th className="crud-th">Correo</th>
            <th className="crud-th">Estado</th>
            <th className="crud-th">Acciones</th>
          </tr>
        </thead>
        <tbody className="crud-tbody">
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id} className="crud-tr">
                <td className="crud-td">{usuario.id}</td>
                <td className="crud-td">{usuario.apodo}</td>
                <td className="crud-td">{usuario.apellido}</td>
                <td className="crud-td">{usuario.correo}</td>
                <td className="crud-td">
                  <span className={`estado ${usuario.estado}`}>{usuario.estado}</span>
                  <button className="crud-button" onClick={() => cambiarEstado(usuario.id, usuario.estado)}>
                    Cambiar Estado
                  </button>
                </td>
                <td className="crud-td">
                  <button className="crud-button edit" onClick={() => modificarUsuario(usuario.id)}>Modificar</button>
                  <button className="crud-button delete" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="crud-tr">
              <td className="crud-td" colSpan="6">No hay usuarios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Crud;
