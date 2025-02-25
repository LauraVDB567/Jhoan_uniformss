import './InicioYRegistro.css'
import './index.css'
import "./Principal"
import React, { useState } from 'react';

import user_icon from '../Archivos/person.png'
import email_icon from '../Archivos/email.png'
import password_icon from '../Archivos/password.png'



const InicioYRegistro = () => {

    const [action, setAction] = useState("Registro");

    return (
        <div class ="body-inicioyregistro">
            <div className='container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>


                <br></br>
                {action === "Inicio Sesion" ? <div></div> : <div className='input' placeholder='nombre'>
                    <img src={user_icon} alt='' />
                    <input type='nombre' placeholder='nombre' />
                </div>}

                <br></br>
                {action === "Inicio Sesion" ? <div></div> : <div className='input' placeholder='apellido'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='apellido' />
                </div>}

                <div className='inputs'>
                    <div className='input' placeholder='correo'>
                        <img src={email_icon} alt='' />
                        <input type='email' placeholder='email' />
                    </div>
                </div>


                <div className='inputs'>
                    <div className='input' placeholder='contraseña'>
                        <img src={password_icon} alt='' />
                        <input type='password' placeholder='contraseña' />

                        <br></br>
                    </div> </div>
                {action === "Inicio Sesion" ? <div></div> : <div className='forgot-password'> <span>Ya tienes cuenta?</span></div>}
                <br></br>
                <div className='submit-container'>
                    <center><div className={action === "Inicio sesion" ? "submit gray" : "submit"} onClick={() => { setAction("Inicio Sesion") }}>Ingresar</div></center>


                </div>

            </div>
        </div>


    )
}

export default InicioYRegistro