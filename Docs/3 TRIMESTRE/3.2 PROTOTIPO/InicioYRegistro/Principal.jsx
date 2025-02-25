import './principal.css';
import person from "../Archivos/person.png";
import jhoan_icon from "../Archivos/Jhoan_Uniforms-removebg-preview.png";




function Principal() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" >Johan Uniforms</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page">Terminos y Condiciones</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Registro o Inicio de sesión</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Devolución</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Foto</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="body-Principal">
                <div class="header-txt">
                    <h2>"Para poder iniciar sesión debe registrarse"</h2>
                    <p>
                        Sistema de información encargado unicamente de devoluciones
                    </p>
                    <button type="button" class="btn btn-info">Ver más</button>
                </div>
                <div class="header-img">
                    <img src={jhoan_icon} alt="" />
                  
                </div>
            </div>
            <div class="flooter-principal"><h1>Informacion de <br/>contacto</h1>
                <button type="button" class="btn btn-outline-info">WhatsApp</button>
                <button type="button" class="btn btn-outline-info">Telefono</button>
                <button type="button" class="btn btn-outline-info">Correo Electronico</button>
            </div>
        </>
    );
}

export default Principal;

