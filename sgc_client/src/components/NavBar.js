import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class NavBar extends Component {

    async componentDidMount() {
        this.setActive();
    }

    setActive = async () => {
        $(".nav-item").on('click', function () {
            $(".nav-item").removeClass("active-spa");
            $(this).addClass("active-spa");
        });
    }

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
            },
            "navbar_span": {
                color: 'rgba(0, 0, 0, 0)'
            }
        };

        return (

            <nav className="navbar navbar-expand-lg navbar-light " style={styles["navbar_spa"]}>
                <span style={styles["navbar_span"]}>/</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav nav-pills">
                        <Link className="nav-item nav-link active-spa" style={styles["navbar_link"]} to="/Inicio">Inicio</Link>
                        <Link className="nav-item nav-link" style={styles["navbar_link"]} to="/GestionUsuarios">Gestion Usuarios</Link>
                        <Link className="nav-item nav-link" style={styles["navbar_link"]} to="/GestionCitas">Gestion Citas</Link>
                        <Link className="nav-item nav-link" style={styles["navbar_link"]} to="/GestionPerfiles">Gestion Perfiles</Link>
                    </div>
                </div>
            </nav>

        )
    }
}
