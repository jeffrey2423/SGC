import React, { Component } from 'react'
import UserDatatablePage from './UserDatatablePage'
import $ from 'jquery';

export default class GestionUsuarios extends Component {

    async componentDidMount() {
        this.clickTableUpdateUser();
        this.alertHoverTable();
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

    alertHoverTable = () => {
        $(document).ready(function () {
            $('div.tableuser tr').not(':first').mouseover(function () {
                // var user = $(this).find('td:first-child').text();
                $("#message-mouseover").empty();
                $("#message-mouseover").append("Click sobre la fila para actualizar");
            })
                .mouseout(function () {
                    $("#message-mouseover").empty();
                });
        });
        /*$("#usersdatatable table tr")
            .mouseover(function () {
                let user  = $(this).parents("tr").find("td:first").html();
                
            })
            .mouseout(function () {
                $("#message-mouseover").empty();
                $("#message-mouseover").append("Para actualizar, seleccione un usuario");  
            });*/

    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Usuarios de la aplicación</h2>
                        <hr />
                        <span id="message-mouseover"></span>
                        <div className="tableuser" id="usersdatatable">
                            <UserDatatablePage />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
