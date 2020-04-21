import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Menu from './NavBar';
import $ from 'jquery';
export default class header extends Component {

    async componentDidMount() {
        this.stickyHeader();
    }

    stickyHeader = () => {
        $(document).ready(function () {
            // grab the initial top offset of the navigation 
            var stickyNavTop = $('.header').offset().top;

            // our function that decides weather the navigation bar should have "fixed" css position or not.
            var stickyNav = function () {
                var scrollTop = $(window).scrollTop(); // our current vertical position from the top

                // if we've scrolled more than the navigation, change its position to fixed to stick to top,
                // otherwise change it back to relative
                if (scrollTop > stickyNavTop) {
                    $('.header').addClass('sticky');
                } else {
                    $('.header').removeClass('sticky');
                }
            };

            stickyNav();
            // and run it again every time you scroll
            $(window).scroll(function () {
                stickyNav();
            });
        });
    }

    cerrarSession = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

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
                border: '1px solid black'
            }
        };


        return (
            <div className="header">
                <div style={styles["header_style"]}>
                    <div className="logo">
                        <Link className="header-logo" to="/Calendar">
                            <img alt="" src="./spa-logo.PNG" title="ValentinSpa" style={styles["img-logo"]} className="img-logo" />
                        </Link>
                    </div>
                    {sessionStorage.getItem("token") ? (
                        <div className="profile-menu">
                            <div className="btn-group tx-profilemenu dropleft">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Perfil
                                                    <span className="glyphicon glyphicon-user"></span>
                                </button>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton" role="menu">
                                    {/* <Link className="nav-link" to="/Perfil">Mi Perfil</Link>
                                    <Link className="nav-link" to="/GestionCitas">Mis Citas</Link> */}
                                    <Link
                                        className="nav-link"
                                        onClick={() => this.cerrarSession()}
                                    >
                                        Cerrar Sesion
                                        </Link>
                                </div>
                            </div>
                        </div>

                    ) : (
                            <div></div>
                        )}


                    <Menu />


                </div>
            </div>
        )
    }
}