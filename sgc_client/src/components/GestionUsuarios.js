import React, { Component } from 'react';
import UserDatatablePage from './UserDatatablePage';
import UserForm from './UserForm';
import { MDBBtn, MDBIcon } from "mdbreact";
import $ from 'jquery';
import axios from 'axios';
import validation from '../resources/validations/main';

export default class GestionUsuarios extends Component {

    state = {
        user_to_update: {},
        token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            //this.clickTableUpdateUser();
            this.alertHoverTable();
            this.hoverUserFormValidate();
            this.clickAddUserScroll();
        }

    }

    getUserToUpdate = async (id) => {

        const res = await axios.get("http://localhost:4000/api/user/getUsers/" + id, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.setState({ user_to_update: res.data[0] });
            return (this.state.user_to_update);
        }

    }

    clickTableUpdateUser =  () => {

        let usuario = {}, id;
        let current = this;

        $(document).on('click', '#datatable_users tbody tr td', function () {

            id = $(this).parents("tr").find("td").eq(0).html();
            current.getUserToUpdate(id);
        usuario.f_nombre = current.state.user_to_update.f1004_nombre;
        usuario.f_apellido = current.state.user_to_update.f1004_apellido;
        usuario.f_email = current.state.user_to_update.f1004_email;
        usuario.f_profesion = current.state.user_to_update.f1004_id_profesion_t1003;
        usuario.f_perfil = current.state.user_to_update.f1004_id_perfil_t1000;
        usuario.f_activo = current.state.user_to_update.f1004_ind_activo;

        //Set data to form
        $("#f_nombre").val(usuario.f_nombre);
        $("#f_apellido").val(usuario.f_apellido);
        $("#f_email").val(usuario.f_email);
        $("#f_perfil").val(usuario.f_perfil);
        $("#f_profesion").val(usuario.f_profesion);
        $("#f_activo").val(usuario.f_activo);
        $("#userform").addClass("update-user");
        $("#userform").removeClass("insert-user");

        $('html, body').animate({
            scrollTop: $("#userform").offset().top
        }, 1500);
        });

        /*this.getUserToUpdate(id);
        usuario.f_nombre = this.state.user_to_update.f1004_nombre;
        usuario.f_apellido = this.state.user_to_update.f1004_apellido;
        usuario.f_email = this.state.user_to_update.f1004_email;
        usuario.f_profesion = this.state.user_to_update.f1004_id_profesion_t1003;
        usuario.f_perfil = this.state.user_to_update.f1004_id_perfil_t1000;
        usuario.f_activo = this.state.user_to_update.f1004_ind_activo;

        //Set data to form
        $("#f_nombre").val(usuario.f_nombre);
        $("#f_apellido").val(usuario.f_apellido);
        $("#f_email").val(usuario.f_email);
        $("#f_perfil").val(usuario.f_perfil);
        $("#f_profesion").val(usuario.f_profesion);
        $("#f_activo").val(usuario.f_activo);
        $("#userform").addClass("update-user");
        $("#userform").removeClass("insert-user");

        $('html, body').animate({
            scrollTop: $("#userform").offset().top
        }, 1500);
*/
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

    hoverUserFormValidate = () => {
        $(document).ready(function () {
            $('div.userform').mouseover(function () {
                //Validate if update or insert
                if ($("#userform").hasClass("update-user")) {
                    //Add icons to update particular fields
                    $("#update-password").removeClass("hide-field");
                    $("#bt-update-user").removeClass("hide-field");
                    $("#bt-insert-user").addClass("hide-field");
                    $("#f_estado").removeClass("hide-field");
                } else {
                    if ($("#userform").hasClass("insert-user")) {
                        //Remove icons to insert form
                        $("#update-password").addClass("hide-field");
                        $("#bt-update-user").addClass("hide-field");
                        $("#bt-insert-user").removeClass("hide-field");
                        $("#f_estado").addClass("hide-field");
                    }
                }
            })
                .mouseout(function () {
                });
        });
    }

    clickAddUserScroll = () => {
        $(document).on('click', '#add-user-scroll', function () {
            $("#userform").removeClass("update-user");
            $("#userform").addClass("insert-user");

            $('html, body').animate({
                scrollTop: $("#userform").offset().top
            }, 1500);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="card-spa">
                    <div className="card-body">
                        <MDBBtn color="purple" title="Agregar usuario" id="add-user-scroll">
                            <MDBIcon icon="user-alt" className="mr-1" />
                        Agregar usuario</MDBBtn>
                        <input type="text" id="id-user-to-update" placeholder="Nombre" />
                        <h2 className="card-title">Usuarios de la aplicación</h2>
                        <hr />
                        <span className="message-mouseover" id="message-mouseover-user"></span>
                        <div className="tableuser" id="usersdatatable" onClick={this.clickTableUpdateUser}>
                            <UserDatatablePage />
                        </div>
                    </div>
                </div>
                <div className="userform card-spa container mt-4 insert-user" id="userform">
                    <h2>Formulario de usuarios</h2>
                    <hr />
                    <UserForm />
                </div>
            </div>
        )
    }
}
