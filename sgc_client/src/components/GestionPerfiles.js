import React, { Component } from 'react'
import axios from 'axios'
import { format, register } from 'timeago.js';
import validation from '../resources/validations/main';
import clientResource from '../resources/client';

register('es_ES', clientResource.localeFunc);

export class GestionPerfiles extends Component {
    state = {
        perfiles: [],
        permisos: [],
        perfilSeleccionado: 0,
        perfilSeleccionadoSelect: 0,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmMTAwNF90cyI6IjIwMjAtMDQtMTFUMDM6MTI6MjEuMDY5WiIsImYxMDA0X2lkIjo1MSwiZjEwMDRfbm9tYnJlIjoiamVmZnJleSIsImYxMDA0X2FwZWxsaWRvIjoicmlvcyIsImYxMDA0X2ZlY2hhX25hY2ltaWVudG8iOiIxOTk5LTAyLTA0VDA1OjAwOjAwLjAwMFoiLCJmMTAwNF9pZF9wcm9mZXNpb25fdDEwMDMiOjEsImYxMDA0X2VtYWlsIjoiMjR0ZGRqamdndGc1NTNAZ21haWwuY29tIiwiZjEwMDRfY2xhdmUiOiI4MjdjY2IwZWVhOGE3MDZjNGMzNGExNjg5MWY4NGU3YiIsImYxMDA0X2lkX3BlcmZpbF90MTAwMCI6MSwiZjEwMDRfaW5kX2FjdGl2byI6MSwiaWF0IjoxNTg2NzE4MTM0fQ.4fkNt2a__SLsma_-ifcUNWJT4f4vdwdT6JUCtHvJeFs"
    }

    async componentDidMount() {
        this.getPerfiles();
    }

    getPerfiles = async () => {
        const res = await axios.get("http://localhost:4000/api/user/profile/getProfiles", {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id);
        } else {
            this.setState({ perfiles: res.data });
        }
    }

    getPermisos = async (id_perfil) => {

        const res = await axios.get("http://localhost:4000/api/user/profile/getPermission/" + id_perfil, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id);
        } else {
            this.setState({ permisos: res.data });
            this.setState({ perfilSeleccionado: id_perfil });
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
                validation.error(res.data.status, res.data.description, res.data.id);
            } else {
                validation.success(res.data.status, res.data.description, res.data.id);
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
                <div className="row">
                    <div className="col">
                        <ul className="list-group" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>
                            <li class="list-group-item active">Perfiles</li>
                            {
                                this.state.perfiles.map(perfil => (
                                    <li
                                        className="list-group-item list-group-item-action"
                                        key={perfil.f1000_id}
                                        onClick={() => this.getPermisos(perfil.f1000_id)}>
                                        {perfil.f1000_nombre}
                                        <div className="d-flex w-100 justify-content-between">
                                            <small>{format(perfil.f1000_ts, 'es_ES')}</small>
                                        </div>
                                    </li>)
                                )
                            }
                        </ul>
                    </div>
                    <div className="col">
                        <ul classname="list-group" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>

                            <li class="list-group-item active">Permisos</li>
                            {
                                this.state.permisos.map(permiso => (
                                    <li
                                        className="list-group-item list-group-item-action"
                                        key={permiso.f_id_permiso}
                                    >

                                        <div className="d-flex justify-content-between">
                                            <h5 class="">{permiso.f_nombre_permiso}</h5>
                                            <span className="badge badge-primary badge-pill"
                                                onClick={() => this.deletePermisoExt(permiso.f_id_permiso)}>
                                                Borrar</span>
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
                <div className="row mt-5">
                    <div className="col">
                        <div className="form-group">
                            <select
                                name="perfilSeleccionadoSelect"
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}


                            >
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
                    <div className="col">
                        <div className="form-group">
                            <select
                                name="perfilSeleccionadoSelect"
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}


                            >
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
                    <div className="col">
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

        )
    }
}

export default GestionPerfiles