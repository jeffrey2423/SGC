import React, { Component } from 'react'
import { MDBContainer, MDBIcon, MDBTooltip } from "mdbreact";
import axios from 'axios'
import validation from '../resources/validations/main';
import clientResource from '../resources/client';
import 'datatables.net-dt'

// import 'mdbootstrap'
// import $$ from 'mdbootstrap/js/addons/DataTable'
import $ from 'jquery';
import 'datatables.net';

export default class GestionUsuarios2 extends Component {
    state = {
        usuarios: [],
        perfiles: [],
        f_profesion: 0,
        f_perfil: 0,
        f_nombre: "",
        f_apellido: "",
        f_clave: "",
        f_reclave: "",
        f_email: "",
        id_usuario_actualizar: 0,
        token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            await this.getUsuarios();
            window.setTimeout(function () {
                $('#example').DataTable();
            }, 1000);
            await this.getPerfiles()


        }
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

    getUsuarios = async () => {

        const res = await axios.get("http://localhost:4000/api/user/getUsers/" + 9999, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.setState({ usuarios: res.data });
        }

    }

    getUsuario = async (id) => {

        const res = await axios.get("http://localhost:4000/api/user/getUsers/" + id, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            return res.data;
            // this.setState({
            //     usuarioCrudo: res.data,
            //     idUsuarioEscogido: id
            // });
        }

    }

    activar = async (id) => {
        const data = {
            id
        }
        const resP = await validation.confirmacion();
        if (resP.value) {

            const res = await axios.post("http://localhost:4000/api/user/activateUser", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });
            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                this.getUsuarios();
                validation.success(res.data.status, res.data.description, res.data.id);
                // window.setTimeout(function () {
                //     clientResource.refreshPage();
                // }, 1500);
            }
        }

    }

    inactivar = async (id) => {
        const data = {
            id
        }
        const resP = await validation.confirmacion();

        if (resP.value) {

            const res = await axios.post("http://localhost:4000/api/user/deleteUser", data, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json;charset=UTF-8'

                }
            });
            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                this.getUsuarios();
                validation.success(res.data.status, res.data.description, res.data.id);
                // window.setTimeout(function () {
                //     clientResource.refreshPage();
                // }, 1500);
            }
        }

    }
    editModal = async (id) => {
        this.setState({ id_usuario_actualizar: id });

        const data = await this.getUsuario(id);

        // document.getElementById('f_nombre').value = data[0].f1004_nombre;
        // document.getElementById('f_apellido').value = data[0].f1004_apellido;
        // document.getElementById('f_email').value = data[0].f1004_email;
        this.setState({
            f_nombre: data[0].f1004_nombre,
            f_apellido: data[0].f1004_apellido,
            f_profesion: data[0].f1004_id_profesion_t1003,
            f_perfil: data[0].f1004_id_perfil_t1000,
            f_email: data[0].f1004_email

        })

        $('#btn_act_clave').prop('disabled', true);
        $('#editModal').modal({ show: true });

    }
    createModal = () => {

        $('#createModal').modal({ show: true });


    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name == 'f_clave' || e.target.name == 'f_reclave') {
            $("#message-incorrect-password").empty();
            if ($("#f_clave").val() != $("#f_clave2").val()) {

                $("#message-incorrect-password").append("Contraseñas no coinciden");
            } else {
                $('#btn_act_clave').prop('disabled', false);
            }

        }

    }
    clickRestartForm = () => {

        $("#userform input").each(function () {
            $(this).val("");
        });
    }

    handleSubmitUser = async (e) => {
        e.preventDefault();
        const validate_user = {};
        validate_user.nombre = this.state.f_nombre;
        validate_user.apellido = this.state.f_apellido;
        validate_user.fecha_nacimiento = null;
        validate_user.id_profesion = this.state.f_profesion;
        validate_user.email = this.state.f_email;
        validate_user.clave = this.state.f_clave;
        validate_user.clave2 = this.state.f_reclave;
        validate_user.id_perfil = this.state.f_perfil;

        if (validation.validarUsuario(validate_user)) {
            const data = {};
            data.nombre = this.state.f_nombre;
            data.apellido = this.state.f_apellido;
            data.fecha_nacimiento = null;
            data.id_profesion = this.state.f_profesion;
            data.email = this.state.f_email;
            data.clave = this.state.f_clave;
            data.id_perfil = this.state.f_perfil;
            const res = await axios.post("http://localhost:4000/api/user/createUser", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                this.getUsuarios();
                validation.success(res.data.status, res.data.description, res.data.id);
                this.clickRestartForm();
            }
        }
    }

    actualizarGeneral = async (e) => {
        e.preventDefault();
        // if (validation.validarUsuario(validate_user)) {
        const data = {};
        data.user_id =
            data.nombre = this.state.f_nombre;
        data.apellido = this.state.f_apellido;
        data.id_profesion = this.state.f_profesion;

        const res = await axios.post("http://localhost:4000/api/user/updateUser/" + this.state.id_usuario_actualizar, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.token}`
            }
        });

        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.getUsuarios();
            validation.success(res.data.status, res.data.description, res.data.id);
        }
        // }

    }

    actualizarClave = async (e) => {
        e.preventDefault();
        const data = {};
        data.clave = this.state.f_clave;

        const res = await axios.post("http://localhost:4000/api/user/updateUserPass/" + this.state.id_usuario_actualizar, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.token}`
            }
        });

        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.getUsuarios();
            validation.success(res.data.status, res.data.description, res.data.id);
            $("#f_clave2").val('');
            $("#f_clave").val('');
        }

    }

    actualizarEmail = async (e) => {
        e.preventDefault();
        const data = {};
        data.email = this.state.f_email;

        const res = await axios.post("http://localhost:4000/api/user/updateUserEmail/" + this.state.id_usuario_actualizar, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.token}`
            }
        });

        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.getUsuarios();
            validation.success(res.data.status, res.data.description, res.data.id);
        }

    }

    actualizarPerfil = async (e) => {
        e.preventDefault();
        const data = {};
        data.id_usuario = this.state.id_usuario_actualizar;
        data.id_perfil = this.state.f_perfil;

        const res = await axios.post("http://localhost:4000/api/user/updateUserPerfil", data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.token}`
            }
        });

        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.getUsuarios();
            validation.success(res.data.status, res.data.description, res.data.id);
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
            <div className="container">

                <div className="card-spa">
                    <div className="card-body">
                        <span
                            style={{ cursor: 'pointer' }}
                            class="btn btn-secondary btn "
                            // data-toggle="modal"
                            // data-target="#exampleModal"
                            onClick={() => this.createModal()}
                        >
                            <MDBIcon icon="user-alt" className="mr-1" />Agregar usuario
                        </span>
                        <hr />
                        <h2 className="card-title">Usuarios de la aplicación</h2>
                        <hr />
                        {/* <div className="form-inline my-lg-0 float-right p-3">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            </div> */}

                        <div class="table-responsive ">

                            <table className="table table-bordered table-striped mb-0" id="example">
                                <thead style={{ position: 'sticky' }}>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Creacion</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Profesion</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Perfil</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.state.usuarios.map(usuario =>
                                            <tr>
                                                <th scope="row">{usuario.f_id}</th>
                                                <td>
                                                    {clientResource.isoToDateSecs(usuario.f_fecha_creacion)}
                                                </td>
                                                <td>{usuario.f_nombre}</td>
                                                <td>{usuario.f_apellido}</td>
                                                <td>{usuario.f_profesion}</td>
                                                <td>{usuario.f_email}</td>
                                                <td>{usuario.f_perfil}</td>
                                                <td>
                                                    {usuario.f_activo === 'Activo' ? (
                                                        <MDBTooltip
                                                            domElement
                                                            tag="span"
                                                            placement="top"
                                                        >
                                                            <span
                                                                style={{
                                                                    borderRadius: '3px',
                                                                    cursor: 'default',
                                                                    width: '75%'
                                                                }}
                                                                class="badge badge-success m-2 p-2"
                                                            >{usuario.f_activo}
                                                            </span>
                                                            <span>Usuario Activo</span>
                                                        </MDBTooltip>
                                                    ) : (
                                                            <MDBTooltip
                                                                domElement
                                                                tag="span"
                                                                placement="top"
                                                            >

                                                                <span
                                                                    style={{ borderRadius: '3px', cursor: 'default', width: '80%' }}
                                                                    class="badge badge-danger m-2 p-2"
                                                                >{usuario.f_activo}
                                                                </span>
                                                                <span>Usuario Inactivo</span>
                                                            </MDBTooltip>

                                                        )}


                                                </td>
                                                <td>
                                                    <center>
                                                        <MDBTooltip
                                                            domElement
                                                            tag="span"
                                                            placement="left"
                                                        >
                                                            <span
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                                class="badge badge-secondary m-2 p-2 badge-pill"
                                                                // data-toggle="modal"
                                                                // data-target="#exampleModal"
                                                                onClick={() => this.editModal(usuario.f_id)}
                                                            >
                                                                <MDBIcon icon="user-edit" size="2x" />
                                                            </span>
                                                            <span>Editar Usuario</span>
                                                        </MDBTooltip>
                                                        {usuario.f_activo === 'Activo' ? (
                                                            <MDBTooltip
                                                                domElement
                                                                tag="span"
                                                                placement="left"
                                                            >

                                                                <span
                                                                    style={{
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    class="badge badge-danger m-2 p-2 badge-pill"
                                                                    onClick={() => this.inactivar(usuario.f_id)}
                                                                >
                                                                    <MDBIcon icon="user-times" size="2x" />
                                                                </span>
                                                                <span>Inactivar Usuario</span>
                                                            </MDBTooltip>
                                                        ) : (

                                                                <MDBTooltip
                                                                    domElement
                                                                    tag="span"
                                                                    placement="left"
                                                                >

                                                                    <span
                                                                        style={{
                                                                            cursor: 'pointer'
                                                                        }}
                                                                        class="badge badge-success m-2 p-2 badge-pill"
                                                                        onClick={() => this.activar(usuario.f_id)}
                                                                    >
                                                                        <MDBIcon icon="user-check" size="2x" />
                                                                    </span>
                                                                    <span>Activar Usuario</span>
                                                                </MDBTooltip>

                                                            )}
                                                    </center>

                                                </td>

                                            </tr>
                                        )
                                    }

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Creacion</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Profesion</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Perfil</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Acciones</th>

                                    </tr>
                                </tfoot>
                            </table>

                        </div>

                    </div>
                </div>
                {/* ********************************INICIO MODAL EDITAR******************************************* */}
                <div class="modal fade bd-example-modal-lg" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            {/** HEADER DEL MODAL ACTUALIZAR **/}
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">
                                    ACTUALIZAR DATOS DE USUARIO
                                        </h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {/** FIN HEADER DEL MODAL ACTUALIZAR **/}
                            <div className="modal-body">
                                <MDBContainer>
                                    <div>
                                        <ul class="nav nav-pills nav-1 mb-3 nav-act" id="pills-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link tabM active nav-2" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Información General</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link tabM nav-2" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Seguridad</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link tabM nav-2" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Datos de acceso</a>
                                            </li>
                                        </ul>

                                        <div class="tab-content" id="pills-tabContent">

                                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <div className="card-spa mt-4">
                                                    <div className="card-body">
                                                        {/******AJSJASDÑOASHAKSDAHKSDHASD */}
                                                        <h4 className="card-title">Información General</h4>
                                                        <hr />
                                                        <form
                                                            onSubmit={this.actualizarGeneral}
                                                        >

                                                            <div className="row ">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <input type="text" id="f_nombre" placeholder="Nombre del usuario" className="form-control"
                                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                            name="f_nombre"
                                                                            value={this.state.f_nombre}
                                                                            onChange={this.onInputChange}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <input type="text" id="f_apellido" placeholder="Apellido del usuario" className="form-control"
                                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                            name="f_apellido"
                                                                            value={this.state.f_apellido}
                                                                            onChange={this.onInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <select
                                                                            name="f_profesion"
                                                                            className="custom-select"
                                                                            id="f_profesion"
                                                                            value={this.state.f_profesion}
                                                                            onChange={this.onInputChange}
                                                                        >
                                                                            <option value="default" selected disabled>Profesión...</option>
                                                                            <option value="2">Administrador</option>
                                                                            <option value="1">Colaborador</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="row">
                                                                <div class="col-auto mr-auto"></div>
                                                                <div class="col-auto">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn btn-secondary btn-block"
                                                                    >
                                                                        Actualizar
                                                            </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>

                                            {/************************************************************* */}
                                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <div className="card-spa mt-4">
                                                    <div className="card-body">
                                                        <form
                                                            onSubmit={this.actualizarClave}
                                                        >
                                                            <div className="row ">
                                                                <div class="col-8">
                                                                    <h4 className="card-title">
                                                                        Seguridad
                                                            </h4>
                                                                </div>

                                                            </div>
                                                            <hr />
                                                            <div className="row ">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <input type="password" id="f_clave" placeholder="Contraseña de usuario" className="form-control"
                                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                            // onChange={this.validatePassword}
                                                                            name="f_clave"
                                                                            onChange={this.onInputChange} />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <input type="password" id="f_clave2" placeholder="Confirme su contraseña" className="form-control"
                                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                            // onChange={this.validatePassword}                                                                        
                                                                            name="f_reclave"
                                                                            onChange={this.onInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span id="message-incorrect-password" style={{ color: 'red' }}></span>
                                                            <div class="row">
                                                                <div class="col-auto mr-auto"></div>
                                                                <div class="col-auto">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn btn-secondary btn-block"
                                                                        id="btn_act_clave"
                                                                    >
                                                                        Actualizar
                                                            </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                <div className="card-spa mt-4">
                                                    <div className="card-body">
                                                        <form
                                                            onSubmit={this.actualizarEmail}
                                                        >
                                                            <div className="row ">
                                                                <div class="col-8">
                                                                    <h4 className="card-title">
                                                                        Correo Electrónico
                                                                </h4>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="row ">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <input type="text" id="f_email" placeholder="Correo del usuario" className="form-control"
                                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                            name="f_email"
                                                                            value={this.state.f_email}
                                                                            onChange={this.onInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-auto mr-auto"></div>
                                                                <div class="col-auto">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn btn-secondary btn-block"
                                                                    >
                                                                        Actualizar
                                                                </button>
                                                                </div>
                                                            </div>
                                                        </form>

                                                        <hr />
                                                        {/**ACTUALIZAR PERFIL DE ACCESO*** */}
                                                        <h4 className="card-title">
                                                            Perfil de acceso
                                                        </h4>
                                                        <hr />
                                                        <form
                                                            onSubmit={this.actualizarPerfil}
                                                        >
                                                            <div className="row ">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <div className="input-group mb-3">
                                                                        <select
                                                                            name="f_perfil"
                                                                            value={this.state.f_perfil}
                                                                            className="custom-select"
                                                                            id="f_perfil"
                                                                            onChange={this.onInputChange}
                                                                        >
                                                                            <option
                                                                                value="default" selected disabled
                                                                            >Perfil/Rol..
                                                                        </option>
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
                                                            <div class="row">
                                                                <div class="col-auto mr-auto"></div>
                                                                <div class="col-auto">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn btn-secondary btn-block"
                                                                    >
                                                                        Actualizar
                                                                </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-content p-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                            </div>
                                        </div>
                                    </div>
                                </MDBContainer >
                            </div>
                            {/**FOOTER CON BOTÓN**** */}
                            <div className="modal-footer">
                                <div className="">
                                    <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ********************************FIN MODAL EDITAR******************************************* */}

                {/* ********************************INICIO MODAL CREAR******************************************* */}
                <div className="modal fade" id="createModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Crear Usuario</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form
                                id="userform"
                                onSubmit={this.handleSubmitUser}
                            >
                                <div className="modal-body">

                                    <MDBContainer>
                                        <div className="tab-content p-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                {/* ****** CAMPO LLENAR NOMBRE ******* */}
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                                                            </div>
                                                            <input type="text" id="f_nombre" placeholder="Nombre" className="form-control"
                                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                name="f_nombre"
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="inputGroup-sizing-default">Apellido</span>
                                                            </div>
                                                            <input type="text" id="f_apellido" placeholder="Apellido" className="form-control"
                                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                name="f_apellido"
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* ****** CAMPO LLENAR EMAIL ******* */}
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="inputGroup-sizing-default">E-mail</span>
                                                            </div>
                                                            <input type="email" id="f_email" placeholder="example@email.com" className="form-control"
                                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required
                                                                name="f_email"
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Perfil/Rol</label>
                                                            </div>
                                                            <select className="custom-select" id="f_perfil"
                                                                name="f_perfil"
                                                                onChange={this.onInputChange}
                                                            >
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
                                                            <select className="custom-select" id="f_profesion"
                                                                name="f_profesion"
                                                                onChange={this.onInputChange}
                                                            >
                                                                <option value="default" selected disabled>Choose...</option>
                                                                <option value="2">Administrador</option>
                                                                <option value="1">Colaborador</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row" >
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                                                            </div>
                                                            <input type="password" id="f_clave" placeholder="Contraseña de usuario" className="form-control"
                                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                // onChange={this.validatePassword}
                                                                name="f_clave"
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>
                                                        <span id="message-incorrect-password" style={{ color: 'red' }}></span>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                                                            </div>
                                                            <input type="password" id="f_clave2" placeholder="Confirme su contraseña" className="form-control"
                                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                                // onChange={this.validatePassword} 
                                                                name="f_reclave"
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </MDBContainer>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Cerrar</button>
                                    <button
                                        type="submit"
                                        className="btn btn-secondary">
                                        Crear usuario
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* ********************************FIN MODAL CREAR******************************************* */}

            </div>
        )

    }
}
