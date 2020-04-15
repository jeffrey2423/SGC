import React, { Component } from 'react'
import UserDatatablePage from './UserDatatablePage'

export default class GestionUsuarios extends Component {
    render() {
        return (
            <div className="container">
               <h2>Usuarios de la aplicación</h2>
                <hr />
                <UserDatatablePage />
            </div>
        )
    }
}
