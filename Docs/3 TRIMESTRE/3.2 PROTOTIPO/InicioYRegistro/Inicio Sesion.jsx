import './InicioYRegistro.css'
import './index.css'
import React,{ useState} from 'react';

import user_icon from '../Archivos/person.png'
import email_icon from '../Archivos/email.png'
import password_icon from '../Archivos/password.png'

const InicioSesion= ()=> {

    const [action,setAction]=useState("Ingresar");

  return (

    <div className='container'>
        <div className='header'>
            <div className='text'>{action}<h1>Registro</h1></div>
            <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                <img src={user_icon} alt=''/>
                <input type='text' placeholder='nombre'/>
            </div></div>
            
            <div className='inputs'>
                <div className='input' placeholder='apellido'>
                <img src={user_icon} alt=''/>
                <input type='text'placeholder='apellido'/>
            </div></div>
         
            <div className='inputs'>
                <div className='input' placeholder='correo'>
                <img src={email_icon} alt=''/>
                <input type='email'placeholder='email'/>
            </div>
            
            <div className='inputs'>
                <div className='input' placeholder='contraseña'>
                <img src={password_icon} alt=''/>
                <input type='password'placeholder='contraseña'/>
            </div>
            </div>
            <center><div className={action==="Inicio sesion"?"submit gray":"submit"}onClick={()=>{setAction("Inicio Sesion")}}>Registrar</div></center>
            <div className='forgot-password'> <span>Ya tienes cuenta?</span></div>
            <div className='submit-container'>
               
              

            </div>
        </div>
       </div>
  )
}

export default InicioSesion