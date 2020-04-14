import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {

        const styles = {
            "navbar_spa": {
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                background: '#d2cfd6'
            },
            "navbar_link": {
                color:'#632380'
            }
        };

        return (
            <nav className="nav nav-pills nav-fill" style={styles["navbar_spa"]}>

                <Link className="nav-item nav-link active" style= {styles["navbar_link"]} to="/Inicio">Inicio</Link>
                <Link className="nav-item nav-link" style= {styles["navbar_link"]} to="/GestionUsuarios">Gestion Usuarios</Link>
                <Link className="nav-item nav-link" style= {styles["navbar_link"]} to="/GestionCitas">Gestion Citas</Link>
                <Link className="nav-item nav-link" style= {styles["navbar_link"]} to="/GestionPerfiles">Gestion Perfiles</Link>

            </nav>
        )
    }
}
