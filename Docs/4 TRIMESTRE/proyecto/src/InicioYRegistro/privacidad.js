import { Navigate } from 'react-router-dom';
import { InicioYRegistro, adminAccounts } from "./InicioYRegistro";


const close = ({ children }) => {
  const sesion = localStorage.getItem("Sesion")
  const correo = localStorage.getItem("correos")
  const esAdmin = adminAccounts.some(account => account.correo === correo);



  if (sesion == false || !sesion) {
    return <Navigate to="/" />

  }

  if (!esAdmin) {
    return <Navigate to="/" />
  }


  return children;
}

export default close







