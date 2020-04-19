import React from "react";
import { MDBContainer } from "mdbreact";
import axios from 'axios';
import validation from '../resources/validations/main';

class UserForm extends React.Component {

    state = {
        perfiles: [],
        permisos: [],
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmMTAwNF90cyI6IjIwMjAtMDQtMTFUMDM6MTI6MjEuMDY5WiIsImYxMDA0X2lkIjo1MSwiZjEwMDRfbm9tYnJlIjoiamVmZnJleSIsImYxMDA0X2FwZWxsaWRvIjoicmlvcyIsImYxMDA0X2ZlY2hhX25hY2ltaWVudG8iOiIxOTk5LTAyLTA0VDA1OjAwOjAwLjAwMFoiLCJmMTAwNF9pZF9wcm9mZXNpb25fdDEwMDMiOjEsImYxMDA0X2VtYWlsIjoiMjR0ZGRqamdndGc1NTNAZ21haWwuY29tIiwiZjEwMDRfY2xhdmUiOiI4MjdjY2IwZWVhOGE3MDZjNGMzNGExNjg5MWY4NGU3YiIsImYxMDA0X2lkX3BlcmZpbF90MTAwMCI6MSwiZjEwMDRfaW5kX2FjdGl2byI6MSwiaWF0IjoxNTg2NjQ0MTYyfQ.CSy6iwftRC3lvJ4-t0P2vIgB2bnKyVWUkMq9rBIiDVs"
    }

    async componentDidMount() {
        this.getPerfiles();
        this.getPermisos();
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
        return (
            <MDBContainer>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input type="text" id="f_nombre" placeholder="Nombre" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Apellido</span>
                            </div>
                            <input type="text" id="f_apellido" placeholder="Apellido" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                            </div>
                            <input type="email" id="f_email" placeholder="example@email.com" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Perfil/Rol</label>
                            </div>
                            <select class="custom-select" id="f_perfil">
                                <option selected>Choose...</option>
                                {
                                    this.state.perfiles.map(perfil =>
                                        <option value={perfil.f1000_nombre} key={perfil.f1000_id}>
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
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                            </div>
                            <input type="password" id="f_clave" placeholder="Contraseña de usuario" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                            </div>
                            <input type="password" id="f_clave" placeholder="Repita contraseña" className="form-control"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Profesión</label>
                            </div>
                            <select class="custom-select" id="f_profesion">
                                <option selected>Choose...</option>
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

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Estado</label>
                            </div>
                            <select class="custom-select" id="f_activo">
                                <option selected>Choose...</option>
                                <option value="1"> Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>
                       
                    </div>
                </div>
            </MDBContainer >
        );
    }
}

export default UserForm;