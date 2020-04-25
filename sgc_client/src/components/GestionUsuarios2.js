import React, { Component } from 'react'
import { MDBContainer, MDBIcon } from "mdbreact";
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
        usuarioCrudo: [],
        perfiles: [],
        idUsuarioEscogido: -1,
        token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            this.getUsuarios();

            window.setTimeout(function () {
                $('#example').DataTable();
            }, 1000);


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
                validation.success(res.data.status, res.data.description, res.data.id);
                window.setTimeout(function () {
                    clientResource.refreshPage();
                }, 1500);
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
                validation.success(res.data.status, res.data.description, res.data.id);
                window.setTimeout(function () {
                    clientResource.refreshPage();
                }, 1500);
            }
        }

    }
    editModal = async (id) => {

        const data = await this.getUsuario(id);

        // document.getElementById('f_nombre').value = data[0].f1004_nombre;

        await this.getPerfiles()

        $('#editModal').modal({ show: true });


    }
    createModal = () => {

        $('#createModal').modal({ show: true });


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
                                                    {clientResource.isoToDate(usuario.f_fecha_creacion)}
                                                </td>
                                                <td>{usuario.f_nombre}</td>
                                                <td>{usuario.f_apellido}</td>
                                                <td>{usuario.f_profesion}</td>
                                                <td>{usuario.f_email}</td>
                                                <td>{usuario.f_perfil}</td>
                                                <td>{usuario.f_activo}</td>
                                                <td>
                                                    <span
                                                        style={{ cursor: 'pointer' }}
                                                        class="badge badge-secondary m-2 modBtn"
                                                        // data-toggle="modal"
                                                        // data-target="#exampleModal"
                                                        onClick={() => this.editModal(usuario.f_id)}
                                                    >
                                                        Editar
                                                    </span>
                                                    {usuario.f_activo === 'Activo' ? (

                                                        <span
                                                            style={{ cursor: 'pointer' }}
                                                            class="badge badge-danger m-2"
                                                            onClick={() => this.inactivar(usuario.f_id)}
                                                        >Inactivar
                                                        </span>
                                                    ) : (

                                                            <span
                                                                style={{ cursor: 'pointer' }}
                                                                class="badge badge-danger m-2"
                                                                onClick={() => this.activar(usuario.f_id)}
                                                            >Activar
                                                            </span>

                                                        )}

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
                <div className="modal fade" id="editModal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Actualizar Usuario
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <MDBContainer>
                                    <div>
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                                    Generales
                                                    </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                                    Usuario
                                                    </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content p-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                                                    </div>
                                                    <input type="text" id="f_nombre" placeholder="Nombre" className="form-control"
                                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Apellido</span>
                                                    </div>
                                                    <input type="text" id="f_apellido" placeholder="Apellido" className="form-control"
                                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required />
                                                </div>



                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <label className="input-group-text" htmlFor="inputGroupSelect01">Profesión</label>
                                                    </div>
                                                    <select className="custom-select" id="f_profesion">
                                                        <option value="default" selected disabled>Choose...</option>
                                                        <option value="2">Administrador</option>
                                                        <option value="1">Colaborador</option>
                                                    </select>
                                                </div>
                                                <div className="float-left">
                                                    <button type="button" className="btn btn-secondary">Actualizar</button>
                                                </div>

                                            </div>

                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <div class="form-row">
                                                    <div class="col">
                                                        <input type="text" class="form-control" placeholder="First name"></input>
                                                    </div>
                                                    <div class="col">
                                                    <button type="button" className="btn btn-secondary" >Actualizar</button>
                                                    </div>
                                                </div>


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


                                                <div className="row" style={styles["password-fields"]} >

                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                                                        </div>
                                                        <input type="password" id="f_clave" placeholder="Contraseña de usuario" className="form-control"
                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                            onChange={this.validatePassword} />
                                                    </div>
                                                    <span id="message-incorrect-password" style={{ color: 'red' }}></span>



                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                                                        </div>
                                                        <input type="password" id="f_clave2" placeholder="Repita contraseña" className="form-control"
                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required
                                                            onChange={this.validatePassword} />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>





                                </MDBContainer >
                            </div>
                            <div className="modal-footer">
                                <div className="">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                {/* ********************************FIN MODAL EDITAR******************************************* */}

                {/* ********************************INICIO MODAL CREAR******************************************* */}
                <div className="modal fade" id="createModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                CREAR
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-secondary">Crear Usuario</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ********************************FIN MODAL CREAR******************************************* */}

            </div>
        )
    }
}
