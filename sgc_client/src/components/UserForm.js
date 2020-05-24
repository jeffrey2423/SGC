import React from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdbreact";
import axios from 'axios';
import validation from '../resources/validations/main';
import $ from 'jquery';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class UserForm extends React.Component {

    state = {
        perfiles: [],
        permisos: [],
        nuevo_usuario: {},
        token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
    }

    async componentDidMount() {
        this.getPerfiles();
        this.getPermisos();
        this.clickRestartForm();
    }

    validatePassword(){
        $("#message-incorrect-password").empty();
        if($("#f_clave").val() != $("#f_clave2").val()){
            $("#message-incorrect-password").append("Contraseñas no coinciden");
        }
    }

    addUser = async () => {

        this.state.nuevo_usuario.nombre = $("#f_nombre").val();
        this.state.nuevo_usuario.apellido = $("#f_apellido").val();
        this.state.nuevo_usuario.fecha_nacimiento = "1999/01/01";
        this.state.nuevo_usuario.id_profesion = $("#f_profesion").val();
        this.state.nuevo_usuario.email = $("#f_email").val();
        this.state.nuevo_usuario.clave = $("#f_clave").val();
        this.state.nuevo_usuario.clave2 = $("#f_clave2").val();
        this.state.nuevo_usuario.id_perfil = $("#f_perfil").val();

        if (validation.validarUsuario(this.state.nuevo_usuario)) {
            const data = this.state.nuevo_usuario;
            const res = await axios.post("http://localhost:4000/api/user/createUser", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                validation.insertUserSuccess();
                window.setTimeout(function () {
                    window.location.href = '/GestionUsuarios';
                }, 1500);

            }
        }
    }

    clickRestartForm = () => {
        $(document).on('click', '#restart-form', function () {
            $("#userform").removeClass("update-user");
            $("#userform").addClass("insert-user");

            $("#userform input").each(function () {
                $(this).val("");
            });
        });
    }

    getPerfiles = async () => {
        const res = await axios.get("http://localhost:4000/api/user/profile/getProfiles", {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.setState({ perfiles: res.data });
        }
    }

    getPermisos = async () => {

        const res = await axios.get("http://localhost:4000/api/user/profile/getPermission/" + 9999, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.setState({ permisos_todos: res.data });
        }

    }

    render() {

        const styles = {
            "password-fields": {
                paddingTop: "15px",
                borderTop: "1px solid rgba(0,0,0,.125)"
            }
        };

        return (
            <MDBContainer>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input type="text" id="f_nombre" placeholder="Nombre" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Apellido</span>
                            </div>
                            <input type="text" id="f_apellido" placeholder="Apellido" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                            </div>
                            <input type="email" id="f_email" placeholder="example@email.com" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Perfil/Rol</label>
                            </div>
                            <select className="custom-select" id="f_perfil">
                                <option value="default" selected disabled>Choose...</option>
                                {
                                    this.state.perfiles.map(perfil =>
                                        <option value={perfil.f1000_id} key={perfil.f1000_id}>
                                            {perfil.f1000_nombre}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Profesión</label>
                            </div>
                            <select className="custom-select" id="f_profesion">
                                <option value="default" selected>Choose...</option>
                                <option value="2">Administrador</option>
                                <option value="1">Colaborador</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3" style={{display: 'none'}}>
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Estado</label>
                            </div>
                            <select className="custom-select" id="f_activo">
                                <option value="default" selected>Choose...</option>
                                <option value="1"> Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="row" style={styles["password-fields"]} >
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                            </div>
                            <input type="password" id="f_clave" placeholder="Contraseña de usuario" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                onChange={this.validatePassword}  />
                        </div>
                        <span id="message-incorrect-password" style={{color:'red'}}></span>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                            </div>
                            <input type="password" id="f_clave2" placeholder="Repita contraseña" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                onChange={this.validatePassword} />
                        </div>
                    </div>
                    <MDBIcon icon="key" title="Actualizar contraseña" className="update-spa-icon hide-field" id="update-password" />
                </div>
                <div className="row">
                    <MDBBtn color="purple" className="hide-field" title="Agregar usuario" id="bt-insert-user" onClick={this.addUser}>Agregar usuario</MDBBtn>
                    <MDBBtn color="purple" className="hide-field" title="Actualizar usuario" id="bt-update-user">Actualizar usuario</MDBBtn>
                    <MDBBtn color="mdb-color" title="Limpiar campos" id="restart-form">Limpiar campos</MDBBtn>
                </div>

            </MDBContainer >
        );
    }
}

export default UserForm;