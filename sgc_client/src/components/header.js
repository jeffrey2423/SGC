import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class header extends Component {
    render (){
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="header-logo" to="/Calendar">
                    <img src ="./spa-logo.PNG" title="ValentinSpa" className="img-logo"/>
                </Link>
        </nav>
        )
    }
}