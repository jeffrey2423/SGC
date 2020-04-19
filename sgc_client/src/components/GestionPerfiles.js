import React, { Component } from 'react'
import axios from 'axios'
import { format, register } from 'timeago.js';
import validation from '../resources/validations/main';
import clientResource from '../resources/client';
//import Breadcrumbs from './Breadcrumbs'

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
        this.getPerfiles();
        this.getPermisos();
        this.getUsuarios();
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

    getPermisosExt = async (id_perfil) => {

        const res = await axios.get("http://localhost:4000/api/user/profile/getPermission/" + id_perfil, {
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

    deletePermisoExt = async (id_permiso) => {

        const res = await validation.confirmacion();

        if (res.value) {
            const res = await axios.delete("http://localhost:4000/api/user/profile/deletePermisoExt", {
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
                validation.success(res.data.status, res.data.description, res.data.id);
                window.setTimeout(function () {
                    window.location.href = '/GestionPerfiles';
                }, 1500);

            }
        }

    }

    onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id_perfil: this.state.perfilSeleccionadoSelect,
            id_permiso: this.state.permisoSeleccionadoSelect
        }
        if (this.state.perfilSeleccionadoSelect !== 0 &&
            this.state.permisoSeleccionadoSelect !== 0) {
            const res = await axios.post("http://localhost:4000/api/user/profile/createProfileExt", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                validation.success(res.data.status, res.data.description, res.data.id);
                window.setTimeout(function () {
                    window.location.href = '/GestionPerfiles';
                }, 1500);

            }
        }

    }
    onSubmitPerfil = async (e) => {
        e.preventDefault();
        const data = {
            nombre: this.state.perfilNuevo,
            description: this.state.desPerfilNuevo
        }
        if (validation.validarCampo(this.state.perfilNuevo, "nombre")) {
            const res = await axios.post("http://localhost:4000/api/user/profile/createProfile", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                validation.success(res.data.status, res.data.description, res.data.id);
                window.setTimeout(function () {
                    window.location.href = '/GestionPerfiles';
                }, 1500);

            }
        }

    }

    onSubmitUsuario = async (e) => {
        e.preventDefault();
        const data = {
            id_perfil: this.state.perfilSeleccionadoSelect,
            id_usuario: this.state.usuarioSeleccionado
        }
        if (this.state.perfilSeleccionadoSelect !== 0 &&
            this.state.usuarioSeleccionado !== 0) {
            const res = await axios.put("http://localhost:4000/api/user/updateUserPerfil", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
            } else {
                validation.success(res.data.status, res.data.description, res.data.id);
                window.setTimeout(function () {
                    window.location.href = '/GestionPerfiles';
                }, 1500);

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
            <div className="container">
                <div className="card-spa">
                    <div class="card-body">
                        <h2 className="card-title">Permisos asociados a un perfil</h2>
                        <hr />
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <ul className="list-group" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>
                                    <li className="list-group-item active">Perfiles</li>
                                    {
                                        this.state.perfiles.map(perfil => (
                                            <li
                                                className="list-group-item list-group-item-action"
                                                key={perfil.f1000_id}
                                                onClick={() => this.getPermisosExt(perfil.f1000_id)}>
                                                <div className="float-right">
                                                    <span className="badge badge-secondary badge-pill"
                                                        onClick={() => validation.descripcion(perfil.f1000_descripcion)}>
                                                        Descripcion
                                            </span>
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
                                <ul className="list-group" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>

                                    <li className="list-group-item active">Permisos</li>
                                    {
                                        this.state.permisos.map(permiso => (
                                            <li
                                                className="list-group-item list-group-item-action"
                                                key={permiso.f_id_permiso}
                                            >
                                                {permiso.f_nombre_permiso}
                                                <div className="float-right">
                                                    <span className="badge badge-primary badge-pill"
                                                        onClick={() => this.deletePermisoExt(permiso.f_id_permiso)}>
                                                        Borrar
                                            </span>
                                                    <span className="badge badge-secondary badge-pill"
                                                        onClick={() => validation.descripcion(permiso.f_desc_permiso)}>
                                                        Descripcion
                                            </span>
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

                {/* FILA ASIGNAR PERMISO */}
                <div className="card-spa mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Asignar permiso a un perfil</h2>
                        <hr />
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">

                                <div className="form-group">
                                    <select
                                        name="perfilSeleccionadoSelect"
                                        className="form-control"
                                        value={this.state.perfilSeleccionadoSelect}
                                        onChange={this.onInputChange}


                                    >
                                        <option>
                                            Perfiles
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

                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <select
                                        name="permisoSeleccionadoSelect"
                                        className="form-control"
                                        value={this.state.permisoSeleccionadoSelect}
                                        onChange={this.onInputChange}


                                    >
                                        <option>
                                            Permisos
                                </option>
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
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <form onSubmit={this.onSubmit}>
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block"
                                        >
                                            Asignar permiso
                            </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* FILA CREAR PERFIL */}
                <div className="card-spa mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Agregar un perfil</h2>
                        <hr />
                        <div className="row ">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
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
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
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
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <form onSubmit={this.onSubmitPerfil}>
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block"
                                        >
                                            Crear perfil
                            </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* FILA ASIGNAR PERFIL */}
                <div className="card-spa mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Asignar perfil a un usuario</h2>
                        <hr />
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <select
                                        name="usuarioSeleccionado"
                                        className="form-control"
                                        value={this.state.usuarioSeleccionado}
                                        onChange={this.onInputChange}
                                    >
                                        <option>
                                            Usuarios
                                </option>
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
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <select
                                        name="perfilSeleccionadoSelect"
                                        className="form-control"
                                        value={this.state.perfilSeleccionadoSelect}
                                        onChange={this.onInputChange}
                                    >
                                        <option>
                                            Perfiles
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
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <form onSubmit={this.onSubmitUsuario}>
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block"
                                        >
                                            Asignar perfil
                            </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default GestionPerfiles