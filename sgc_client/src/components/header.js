import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render (){
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="header-logo" to="/Calendar">
                    ValentinSpa
                </Link>
        </nav>
    }
}