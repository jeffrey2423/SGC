import React, { Component } from 'react';
import UserDatatablePage from './UserDatatablePage';
import UserForm from './UserForm';
import $ from 'jquery';

export default class GestionUsuarios extends Component {

    async componentDidMount() {
        this.clickTableUpdateUser();
        this.alertHoverTable();
    }

    clickTableUpdateUser = () => {
        $(document).on('click', '#usersdatatable table tbody tr td', function () {

            //Get data from table
            let usuario = {};
            usuario.f_nombre = $(this).parents("tr").find("td").eq(1).html();
            usuario.f_apellido = $(this).parents("tr").find("td").eq(2).html();
            usuario.f_email = $(this).parents("tr").find("td").eq(3).html();
            usuario.f_profesion = $(this).parents("tr").find("td").eq(4).html();
            usuario.f_perfil = $(this).parents("tr").find("td").eq(5).html();
            usuario.f_activo = $(this).parents("tr").find("td").eq(6).html();

            //Set data to form
            $("#f_nombre").attr("value", usuario.f_nombre);
            $("#f_apellido").attr("value", usuario.f_apellido);
            $("#f_email").attr("value", usuario.f_email);
            $("#f_perfil option[value="+usuario.f_perfil+"]").attr('selected','selected');

            $('html, body').animate({
                scrollTop: $("#userform").offset().top
            }, 1500);
        });
    }

    alertHoverTable = () => {
        $(document).ready(function () {
            $('div.tableuser tr').not(':first').mouseover(function () {
                $("#message-mouseover-user").empty();
                $("#message-mouseover-user").append("Click sobre la fila para actualizar");
            })
                .mouseout(function () {
                    $("#message-mouseover-user").empty();
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
                <div className="card-spa">
                    <div className="card-body">
                        <h2 className="card-title">Usuarios de la aplicación</h2>
                        <hr />
                        <span className="message-mouseover" id="message-mouseover-user"></span>
                        <div className="tableuser" id="usersdatatable">
                            <UserDatatablePage />
                        </div>
                    </div>
                </div>
                <div className="userform card-spa container mt-4" id="userform">
                    <h2>Formulario de usuarios</h2>
                    <hr />
                    <UserForm />
                </div>
            </div>
        )
    }
}
