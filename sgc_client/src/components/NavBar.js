import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';
const config = require('../config/config')

export default class NavBar extends Component {

    async componentDidMount() {
        this.setActive();
    }

    setActive = async () => {
        $(".nav-bar-item").on('click', function () {
            $(".nav-bar-item").removeClass("active-spa");
            $(this).addClass("active-spa");
        });

        $(".nav-bar-item").each(function(){
            let id = $(this).attr("id");
            if(window.location.toString().includes(id)){
                $("#Inicio").removeClass("active-spa");
                $("#"+id).removeClass("active-spa");
                $("#"+id).addClass("active-spa");
            }
        });
    }

    render() {

        const styles = {
            "navbar_spa": {
                margin: 0,
                listStyle: 'none',
                background: '#d2cfd6',
                paddingLeft: '150px',
                borderBottom: '5px solid #70388b'
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


                    {sessionStorage.getItem("token") ? (
                        <div className="navbar-nav nav-pills">
                            <Link className="nav-bar-item nav-item nav-link active-spa" style={styles["navbar_link"]} to="/Inicio" id="Inicio">Inicio</Link>
                            <Link className="nav-bar-item nav-item nav-link" style={styles["navbar_link"]} to="/GestionCitas" id="GestionCitas">Gestion Citas</Link>
                            {

                                sessionStorage.getItem("f1004_id_profesion_t1003") == config.ADMINISTRADOR ? (
                                    <React.Fragment>
                                        <Link className="nav-bar-item nav-item nav-link" style={styles["navbar_link"]} to="/GestionUsuarios" id="GestionUsuarios">Gestion Usuarios</Link>
                                        <Link className="nav-bar-item nav-item nav-link" style={styles["navbar_link"]} to="/GestionPerfiles" id="GestionPerfiles">Gestion Perfiles</Link>
                                        {/* <Link className="nav-bar-item nav-item nav-link" style={styles["navbar_link"]} to="/CitasDiarias"     id="CitasDiaria">Citas Diarias</Link> */}
                                    </React.Fragment>
                                ) :

                                    null

                            }

                        </div>
                    ) : (
                            <div className="navbar-nav nav-pills">

                            </div>
                        )}

                </div>
            </nav >

        )
    }
}
