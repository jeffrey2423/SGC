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
                    </ul>
                </div>
            </nav>
        )
    }
}
