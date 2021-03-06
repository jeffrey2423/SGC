import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import validation from '../resources/validations/main';
import clientResource from '../resources/client';
import $ from 'jquery';
const jwt = require("jsonwebtoken");
const config = require('../config/config')


export default class login extends Component {
    state = {
        email: "",
        pass: ""

    }
    async componentDidMount() {
        if (sessionStorage.getItem("token")) {
            window.history.back();
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email !== "" &&
            this.state.pass !== "") {
            $('#btn-login').prop('disabled', true);
            $("#btn-login").text('Cargando...');
            const data = {
                email: this.state.email,
                clave: this.state.pass
            }

            try {
                const res = await axios.post(config.BASE_URL + "api/user/auth/login", data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });



                if (res.data.status === "error") {
                    validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
                    $('#btn-login').prop('disabled', false);
                    $("#btn-login").text('Iniciar sesion');
                } else {
                    const token = res.data;
                    clientResource.agregarSesion(token);
                    console.log(token)

                    jwt.verify(token.token.toString(), config.SECRET_KEY, (err, decoded) => {
                        if (err) {
                            validation.error("Error", "Error al intentar iniciar sesion, intente de nuevo", 1005, err.message);
                            $('#btn-login').prop('disabled', false);
                            $("#btn-login").text('Iniciar sesion');
                        } else {
                            // $('#btn-login').prop('disabled', true);
                            // $("#btn-login").text('Cargando...');
                            const datosUsuario = decoded;
                            // console.log(datosUsuario)
                            clientResource.agregarSesion(datosUsuario);
                        }
                    });

                    window.location.href = '/inicio';



                }
            } catch (error) {
                validation.error(error.message);
                $('#btn-login').prop('disabled', false);
                $("#btn-login").text('Iniciar sesion');
            }
        } else {
            validation.errorGenereal("Hay campos vacios");
        }

    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {
        const styles = {
            "submit_style": {
                color: 'white',
                background: '#612080'
            },
            "social": {
                color: '#612080'
            }
        };
        return (
            <div className="row">

                <form onSubmit={this.handleSubmit} className="col-md-a mx-auto card-spa">

                    <div
                        className="text-center  p-5"

                    >
                        <p className="h4 mb-4">Inicio de sesion</p>
                        {/* Email */}
                        <input
                            name="email"
                            type="email"
                            id="defaultLoginFormEmail"
                            className="form-control mb-4"
                            placeholder="Correo Electronico"
                            onChange={this.onInputChange}
                            value={this.state.email}
                        />
                        {/* Password */}
                        <input
                            name="pass"
                            type="password"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4"
                            placeholder="Contraseña"
                            onChange={this.onInputChange}
                            value={this.state.pass}
                        />

                        {/* Sign in button */}

                        <button
                            id="btn-login"
                            className="btn btn-block my-4"
                            type="submit"
                            style={styles["submit_style"]}
                        >
                            Iniciar Sesion
                        </button>



                        {/* Social login */}
                        <Link to="" className="mx-2" role="button"><i className="fab fa-facebook-f" style={styles["social"]} ></i></Link>
                        <Link to="" className="mx-2" role="button"><i className="fab fa-twitter" style={styles["social"]} ></i></Link>
                        <Link to="" className="mx-2" role="button"><i className="fab fa-linkedin-in" style={styles["social"]}></i></Link>
                        <Link to="" className="mx-2" role="button"><i className="fab fa-github" style={styles["social"]}></i></Link>
                    </div>
                </form>
            </div>


        )
    }
}
