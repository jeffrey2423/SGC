import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Menu from './NavBar'

export default class header extends Component {
    render() {
        const styles = {
            "header_style": {
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                background: '#612080'
            },
            "img-logo": {
                height: '100px',
                width: 'auto',
                border:'1px solid black'
            }
        };


        return (
            <header style={styles["header_style"]}>
                <div className="logo">
                    <Link className="header-logo" to="/Calendar">
                        <img alt= "" src="./spa-logo.PNG" title="ValentinSpa" style={styles["img-logo"]} className="img-logo" />
                    </Link>
                </div>


                <div className="profile-menu">
                    <div className="btn-group tx-profilemenu dropleft">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Perfil
                                <span className="glyphicon glyphicon-user"></span>
                        </button>
                        <div className="dropdown-menu " aria-labelledby="dropdownMenuButton" role="menu">
                            <Link className="nav-link" to="/Perfil">Mi Perfil</Link>
                            <Link className="nav-link" to="/GestionCitas">Mis Citas</Link>
                            <Link className="nav-link" to="/login">Cerrar Sesion</Link>
                        </div>
                    </div>
                </div>

                    <Menu />
            </header>
        )
    }
}