import {  UseNavigate } from 'react-router-dom';

import  adminAccounts from "./InicioYRegistro" ;
const close = ({children})=> {
  
  const sesion =localStorage.getItem ("Sesion")
  const correo = localStorage.getItem("correos")
  const Navigate = UseNavigate();



if(sesion== false || !sesion)
{
    navigate ('/')
}
  if(correo != adminAccounts[0].correo || correo != adminAccounts[1].correo  || correo != adminAccounts[2].correo  || correo != adminAccounts[3].correo)
  {
    navigate('/')
  }

return children;
}

export default close




