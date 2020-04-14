import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class header extends Component {
    render() {
        const styles = {
            "navbar_style" : {
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                background: '#612080'
            },
            "img-logo" :{
                height:'110px',
                width: 'auto',
                marginLeft:'20px'
            }
        };
        

        return (
            <nav className="navbar navbar-expand-lg" style={styles["navbar_style"]}>
                <div className="row navbar-collapse">
                  
                        <Link className="header-logo" to="/Calendar">
                            <img src="./spa-logo.PNG" title="ValentinSpa" style={styles["img-logo"]} className="img-logo" />
                        </Link>

                        <div className="navbar-collapse">
                        <div className="btn-group navbar-nav ml-auto">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Perfil
                                <span className="glyphicon glyphicon-user"></span>
                            </button>
                            <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                                <Link className="nav-link" to="/Perfil">Mi Perfil</Link>
                                <Link className="nav-link" to="/GestionCitas">Mis Citas</Link>
                                <Link className="nav-link" to="/login">Cerrar Sesion</Link>
                            </div>
                        </div>
                        </div>
                    </div>

            </nav>
        )
    }
}