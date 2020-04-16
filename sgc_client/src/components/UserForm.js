import React from "react";
import { MDBContainer, MDBInputGroup, MDBInput } from "mdbreact";
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
                        <MDBInputGroup containerClassName="mb-3" prepend="Nombre" type="text" hint="Nombre" id="f_nombre" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MDBInputGroup containerClassName="mb-3" prepend="Apellido" type="text" hint="Apellido" id="f_apellido" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MDBInputGroup containerClassName="mb-3" prepend="Email" hint="example@email.com" id="f_email" type="email" />
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <select
                            name="perfilSeleccionadoSelectUserForm"
                            className="browser-default custom-select mb-3"
                        >
                            <option>
                                Perfil/Rol
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

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MDBInputGroup containerClassName="mb-3" prepend="Contraseña" hint="Contraseña de usuario" id="f_clave"
                            group type="password" validate />
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MDBInputGroup containerClassName="mb-3" prepend="Contraseña" hint="Repita contraseña" id="f_clave_retype"
                            group type="password" validate />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <select
                            name="perfilSeleccionadoSelectUserForm"
                            className="browser-default custom-select mb-3"
                        >
                            <option>
                                Profesión
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

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-122">
                        <select
                            name="perfilSeleccionadoSelectUserForm"
                            className="browser-default custom-select mb-3"
                        >
                            <option>
                                Estado
                                </option>
                            <option value="1">
                                Activo
                            </option>
                            <option value="0">
                                Inactivo
                            </option>

                        </select>
                    </div>
                </div>
            </MDBContainer >
        );
    }
}

export default UserForm;