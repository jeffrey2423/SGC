import React, { Component } from 'react'
import UserDatatablePage from './UserDatatablePage'
import $ from 'jquery';

export default class GestionUsuarios extends Component {

    async componentDidMount() {
        this.clickTableUpdateUser();
    }

    clickTableUpdateUser = () => {
        $(document).on('click', '#usersdatatable table tbody tr td', function () {
            let valores = "";
    
            // Obtenemos la primer columna de la fila seleccionada
            // seleccionada
            valores = $(this).parents("tr").find("td:first").html();
    
            alert(valores);
    
        });
    }

    render() {
        return (
            <div className="container">
               <h2>Usuarios de la aplicación</h2>
                <hr />
                <div id="usersdatatable">
                <UserDatatablePage />
                </div>
            </div>
        )
    }
}
