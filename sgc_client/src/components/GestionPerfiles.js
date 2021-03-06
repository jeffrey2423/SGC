import React, { Component, Suspense } from 'react'
import { MDBIcon, MDBContainer, MDBTooltip } from "mdbreact";
import axios from 'axios'
import { format, register } from 'timeago.js';
import validation from '../resources/validations/main';
import clientResource from '../resources/client';
//import Breadcrumbs from './Breadcrumbs'
import Loading from './Loading'
import $ from 'jquery';
import config from '../config/config'

register('es_ES', clientResource.localeFunc);

export class GestionPerfiles extends Component {
    state = {
        perfiles: [],
        permisos: [],
        permisos_todos: [],
        usuarios: [],
        usuarioSeleccionado: 0,
        perfilSeleccionado: 0,
        perfilSeleccionadoSelect: 0,
        permisoSeleccionadoSelect: 0,
        perfilNuevo: "",
        desPerfilNuevo: "",
        token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            this.getPerfiles();
            this.getPermisos();
        }
    }

    createModal = async () => {

        $('#createModal').modal({ show: true });

    }

    createModal2 = async () => {

        $('#createModal2').modal({ show: true });

    }

    createModal3 = async () => {
        this.getUsuarios();

        $('#createModal3').modal({ show: true });

    }

    getPerfiles = async () => {
        const res = await axios.get(config.BASE_URL + "api/user/profile/getProfiles", {
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

    getPermisosExt = async (id_perfil) => {

        const res = await axios.get(config.BASE_URL + "api/user/profile/getPermission/" + id_perfil, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.setState({ permisos: res.data });
            this.setState({ perfilSeleccionado: id_perfil });
        }

    }
    getPermisos = async () => {

        const res = await axios.get(config.BASE_URL + "api/user/profile/getPermission/" + 9999, {
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
    getUsuarios = async () => {

        const res = await axios.get(config.BASE_URL + "api/user/getUsers/" + 9999, {
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

    deletePermisoExt = async (id_permiso) => {

        const res = await validation.confirmacion();

        if (res.value) {
            const res = await axios.delete(config.BASE_URL + "api/user/profile/deletePermisoExt", {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                },
                data: {
                    perfil: this.state.perfilSeleccionado,
                    permiso: id_permiso
                }
            });
            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                this.getPermisosExt(this.state.perfilSeleccionado)
                validation.success(res.data.status, res.data.description, res.data.id);
                // window.setTimeout(function () {
                //     clientResource.refreshPage();
                // }, 1500);
            }
        }

    }

    asignarPermiPerfil = async (e) => {
        e.preventDefault();
        const data = {
            id_perfil: this.state.perfilSeleccionadoSelect,
            id_permiso: this.state.permisoSeleccionadoSelect
        }
        if (this.state.perfilSeleccionadoSelect != 0 &&
            this.state.permisoSeleccionadoSelect != 0) {
            const res = await axios.post(config.BASE_URL + "api/user/profile/createProfileExt", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                this.getPermisosExt(this.state.perfilSeleccionadoSelect)
                validation.success(res.data.status, res.data.description, res.data.id);
                // window.setTimeout(function () {
                //     clientResource.refreshPage();
                // }, 1500);

            }
        }

    }
    onSubmitPerfil = async (e) => {
        e.preventDefault();
        const data = {
            nombre: this.state.perfilNuevo,
            descripcion: this.state.desPerfilNuevo
        }
        if (validation.validarCampo(this.state.perfilNuevo, "nombre")) {
            const res = await axios.post(config.BASE_URL + "api/user/profile/createProfile", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                this.getPerfiles();
                validation.success(res.data.status, res.data.description, res.data.id);

                // window.setTimeout(function () {
                //     clientResource.refreshPage();
                // }, 1500);

            }
        }

    }

    onSubmitUsuario = async (e) => {
        e.preventDefault();
        const data = {
            id_perfil: this.state.perfilSeleccionadoSelect,
            id_usuario: this.state.usuarioSeleccionado
        }
        if (this.state.perfilSeleccionadoSelect != 0 &&
            this.state.usuarioSeleccionado != 0) {
            const res = await axios.post(config.BASE_URL + "api/user/updateUserPerfil", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                validation.success(res.data.status, res.data.description, res.data.id);
                // window.setTimeout(function () {
                //     clientResource.refreshPage();
                // }, 1500);

            }
        }

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {
        return (
            <div className="container" style={{ maxHeight: '50%' }}>

                <div className="card-spa" >
                    <div class="card-body">
                        <div className="">
                            {/* FILA BOTONES */}

                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">

                                    <div className="form-group">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-block"
                                            onClick={this.createModal}
                                        >
                                            <MDBIcon icon="pencil-alt" /> Asignar permiso a perfil
                                            </button>

                                    </div>

                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-block"
                                            onClick={this.createModal2}
                                        >
                                            <MDBIcon icon="plus-circle" /> Agregar un perfil
                                            </button>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <div className="form-group">

                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-block"
                                            onClick={this.createModal3}
                                        >
                                            <MDBIcon icon="pencil-alt" /> Asignar perfil a un usuario
                                            </button>

                                    </div>
                                </div>


                            </div>
                            {/* FIN FILA BOTONES */}
                        </div>
                        <hr />
                        <h2 className="card-title">Permisos asociados a un perfil</h2>
                        <hr />
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <ul className="list-group" style={{ width: '100%', height: '350px', overflowY: 'auto' }}>
                                    <li className="list-group-item active">Perfiles</li>
                                    {
                                        this.state.perfiles.map(perfil => (
                                            <li
                                                className="list-group-item list-group-item-action"
                                                key={perfil.f1000_id}
                                                onClick={() => this.getPermisosExt(perfil.f1000_id)}>
                                                <div className="float-right">
                                                    <MDBTooltip
                                                        domElement
                                                        tag="span"
                                                        placement="left"
                                                    >
                                                        <span className="badge badge-secondary badge-pill"
                                                            onClick={() => validation.descripcion(perfil.f1000_descripcion)}>
                                                            <MDBIcon icon="eye" size="2x" />
                                                        </span>
                                                        <span>Ver mas</span>
                                                    </MDBTooltip>
                                                </div>

                                                {perfil.f1000_nombre}
                                                <div className="d-flex w-100 justify-content-between">
                                                    <small>{format(perfil.f1000_ts, 'es_ES')}</small>
                                                </div>
                                            </li>)
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <ul className="list-group" style={{ width: '100%', height: '350px', overflowY: 'auto' }}>

                                    <li className="list-group-item active">Permisos</li>
                                    {
                                        this.state.permisos.map(permiso => (
                                            <li
                                                className="list-group-item list-group-item-action"
                                                key={permiso.f_id_permiso}
                                            >
                                                {permiso.f_nombre_permiso}
                                                <div className="float-right">
                                                    <MDBTooltip
                                                        domElement
                                                        tag="span"
                                                        placement="left"
                                                    >
                                                        <span className="badge badge-danger badge-pill mr-3"
                                                            onClick={() => this.deletePermisoExt(permiso.f_id_permiso)}>
                                                            <MDBIcon icon="trash-alt" size="2x" />
                                                        </span>
                                                        <span>Eliminar</span>
                                                    </MDBTooltip>
                                                    <MDBTooltip
                                                        domElement
                                                        tag="span"
                                                        placement="right"
                                                    >
                                                        <span className="badge badge-secondary badge-pill"
                                                            onClick={() => validation.descripcion(permiso.f_desc_permiso)}>
                                                            <MDBIcon icon="eye" size="2x" />
                                                        </span>
                                                        <span>Ver mas</span>
                                                    </MDBTooltip>
                                                </div>


                                                <div className="d-flex w-100 justify-content-between">
                                                    <small>{format(permiso.f_fecha_creacion_permiso, 'es_ES')}</small>
                                                </div>

                                            </li>)
                                        )
                                    }
                                </ul>
                            </div>
                        </div >
                    </div >
                </div >





                {/* MODAL PARA ASIGNAR UN PERMISO A PERFIL  */}
                <div class="modal fade bd-example-modal-xl" id="createModal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Asignar permiso a un perfil</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <MDBContainer>
                                    {/* FILA ASIGNAR PERMISO */}
                                    <form onSubmit={this.asignarPermiPerfil}>


                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">

                                                <div className="form-group">
                                                    <div class="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">Perfiles</div>

                                                        </div>
                                                        <select
                                                            id="perfilSeleccionadoSelect"
                                                            name="perfilSeleccionadoSelect"
                                                            className="form-control"
                                                            value={this.state.perfilSeleccionadoSelect}
                                                            onChange={this.onInputChange}


                                                        >
                                                            {/* <option value="9999" selected >Escoja un perfil...</option> */}
                                                            <option value="0" selected disabled>Escoja un perfil...</option>
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

                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                    <div class="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">Permisos</div>

                                                        </div>

                                                        <select
                                                            name="permisoSeleccionadoSelect"
                                                            className="form-control"
                                                            value={this.state.permisoSeleccionadoSelect}
                                                            onChange={this.onInputChange}


                                                        >
                                                            {/* <option value="9999" selected>Escoja un permiso...</option> */}
                                                            <option value="0" selected disabled>Escoja un permiso...</option>
                                                            {
                                                                this.state.permisos_todos.map(permisos_all =>
                                                                    <option value={permisos_all.f1001_id} key={permisos_all.f1001_id}>
                                                                        {permisos_all.f1001_nombre}
                                                                    </option>
                                                                )
                                                            }

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div className="form-group">

                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-secondary btn-block"
                                                    >
                                                        Asignar permiso
                                                            </button>

                                                </div>
                                            </div>

                                        </div>

                                    </form>
                                </MDBContainer>
                            </div>

                        </div>
                    </div>
                </div>
                {/* FIN MODAL PARA ASIGNAR UN PERMISO A PERFIL */}

                {/* MODAL PARA CREAR UN PERFIL */}
                <div class="modal fade bd-example-modal-xl" id="createModal2" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Agregar un perfil</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <MDBContainer>
                                    <div className="row ">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <div class="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Nombre</div>

                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nombre"
                                                        name="perfilNuevo"
                                                        onChange={this.onInputChange}
                                                        required
                                                    >
                                                    </input>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <div class="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Desc.</div>

                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Descripcion"
                                                        name="desPerfilNuevo"
                                                        onChange={this.onInputChange}
                                                    >
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <form onSubmit={this.onSubmitPerfil}>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-secondary btn-block"
                                                    >
                                                        Crear perfil
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </MDBContainer>
                            </div>

                        </div>
                    </div>
                </div>
                {/* FIN MODAL CREAR PERFIL  */}

                {/* MODAL PARA ASIGNAR PERFIL USUARIO */}
                <div class="modal fade bd-example-modal-xl" id="createModal3" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Asignar perfil a un usuario</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <MDBContainer>
                                    {/* FILA ASIGNAR PERFIL */}
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <div class="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Usuario</div>

                                                    </div>
                                                    <select
                                                        name="usuarioSeleccionado"
                                                        className="form-control"
                                                        // onClick={this.getUsuarios}
                                                        value={this.state.usuarioSeleccionado}
                                                        onChange={this.onInputChange}

                                                    >
                                                        {/* <option value="9999" selected>Escoja un usuario...</option> */}
                                                        <option value="0" selected disabled>Escoja un usuario...</option>
                                                        
                                                        {
                                                            this.state.usuarios.map(usuarios =>
                                                                <option value={usuarios.f_id} key={usuarios.f_id}>
                                                                    {usuarios.f_nombre}
                                                                </option>
                                                            )
                                                        }

                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <div class="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Perfil</div>

                                                    </div>
                                                    <select
                                                        name="perfilSeleccionadoSelect"
                                                        className="form-control"
                                                        value={this.state.perfilSeleccionadoSelect}
                                                        onChange={this.onInputChange}
                                                    >
                                                        {/* <option value="9999" selected>Escoja un perfil...</option> */}
                                                        <option value="0" selected disabled>Escoja un perfil...</option>
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
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <form onSubmit={this.onSubmitUsuario}>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-secondary btn-block"
                                                    >
                                                        Asignar perfil
                                        </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </MDBContainer>
                            </div>

                        </div>
                    </div>
                </div>
                {/* FIN MODAL ASIGNAR PERFIL USUARIO */}
            </div>

        )
    }
}

export default GestionPerfiles