import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const rol_code = localStorage.getItem("rol_code");
  const sesionActiva = localStorage.getItem("Sesion");

  return sesionActiva && Number(rol_code) === 1 ? children : <Navigate to="/" />;
  
};

export default AdminRoute;





