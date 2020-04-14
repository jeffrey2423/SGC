import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/GestionUsuarios">Gestion Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/GestionPerfiles">Gestion Perfiles</Link>
                        </li>
                        <li className="nav-item">
                            <div className="btn-group dropleft">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Perfil
                            </button>
                                <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                                    <Link className="nav-link" to="/Perfil">Mi Perfil</Link>
                                    <Link className="nav-link" to="/GestionCitas">Mis Citas</Link>
                                    <Link className="nav-link" to="/login">Cerrar Sesion</Link>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
