import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {

        const styles = {
            "navbar_spa": {
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                background: '#d2cfd6',
                paddingLeft: '150px'
            },
            "navbar_link": {
                color: '#632380'
            }
        };

        return (
            
                <div className="nav nav-pills " style={styles["navbar_spa"]}>

                    <Link className="nav-item nav-link active-spa" style={styles["navbar_link"]} to="/Inicio">Inicio</Link>
                    <Link className="nav-item nav-link" style={styles["navbar_link"]} to="/GestionUsuarios">Gestion Usuarios</Link>
                    <Link className="nav-item nav-link" style={styles["navbar_link"]} to="/GestionCitas">Gestion Citas</Link>
                    <Link className="nav-item nav-link" style={styles["navbar_link"]} to="/GestionPerfiles">Gestion Perfiles</Link>

                </div>

        )
    }
}
