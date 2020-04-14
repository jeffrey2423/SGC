import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class header extends Component {
    render (){
        const style = {
            margin: '0.5em',
            paddingLeft: 0,
            listStyle: 'none',
            background: '#612080'
          };

        return (
        <nav className="navbar navbar-expand-lg" style={style}>
                <Link className="header-logo" to="/Calendar">
                    <img src ="./spa-logo.PNG" title="ValentinSpa" className="img-logo"/>
                </Link>
        </nav>
        )
    }
}