import React, { Component } from 'react'
import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import DateTimePicker from 'react-datetime-picker';
import * as BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import clientResource from '../resources/client';
import axios from 'axios'
import validation from '../resources/validations/main';
import $ from 'jquery';

//import BigCalendar from 'react-big-calendar';
import moment, { now } from 'moment';
import config from '../config/config'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class Inicio extends Component {
    state = {
        fecha_fin: new Date(),
        fecha_inicio: new Date(),
        titulo: '',
        desc: '',
        todoDia: 0,
        asignado: 0,
        usuarios: [],
        eventos: [],
        token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
    }


    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            this.getEventos();

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

    cambiarValor = (valorABuscar, json) => {
        json.forEach(function (elemento) { // recorremos el array        
            //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
            elemento[valorABuscar] = new Date(elemento[valorABuscar])
        })
    }


    getEventos = async () => {
        const userData = {
            id_profesion: sessionStorage.getItem("f1004_id_profesion_t1003"),
            id_usuario: sessionStorage.getItem("f1004_id")
        }
        const res = await axios.post(config.BASE_URL + "api/user/events/getEventsFilter", userData, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            const data = res.data;
            this.cambiarValor('start', data)
            this.cambiarValor('end', data)
            this.setState({ eventos: data });
            console.log(this.state.eventos)
        }
    }

    createModal = (data) => {
        this.setState({
            fecha_inicio: new Date(data.start),
            fecha_fin: new Date(data.end)
        })

        $('#createModal').modal({ show: true });

    }

    onChangeFin = fecha_fin => this.setState({ fecha_fin })
    onChangeInicio = fecha_inicio => this.setState({ fecha_inicio })

    crearCita = async (e) => {
        e.preventDefault();

        // if (validation.validarUsuario(validate_user)) {
        const data = {};
        data.titulo = this.state.titulo;
        // data.description = this.state.desc;
        data.description = document.getElementById("desc").value;
        // data.fecha_inicial = clientResource.dateToTs(this.state.fecha_inicio);
        // data.fecha_final = clientResource.dateToTs(this.state.fecha_fin);
        data.fecha_inicial = this.state.fecha_inicio;
        data.fecha_final = this.state.fecha_fin;
        // data.ind_todo_el_dia = this.state.todoDia;
        data.ind_todo_el_dia = 0;
        data.id_creador = sessionStorage.getItem("f1004_id");
        data.id_asignado = this.state.asignado;

        const res = await axios.post(config.BASE_URL + "api/user/events/createEvent", data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.token}`
            }
        });

        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.getEventos();
            validation.success(res.data.status, res.data.description, res.data.id);
        }
        // }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }



    render() {
        const allViews = Object
            .keys(BigCalendar.Views)
            .map(k => BigCalendar.Views[k])
        return (
            <div>

                <BigCalendar
                    selectable
                    popup
                    events={this.state.eventos}
                    // step={60}
                    views={allViews}
                    // startAccessor="start"
                    // endAccessor="end"
                    // defaultView='week'
                    // style={{ height: '100%', width: '100% ' }}
                    // scrollToTime={new Date(1970, 1, 1, 6)}
                    // dayChosen ={new Date()}
                    defaultDate={new Date(now())}
                    onSelectEvent={event =>
                        clientResource.showDesc(event.title, event.desc)
                    }
                    // onSelectSlot={(slotInfo) => this.createModal(slotInfo)
                        // (slotInfo) => this.createModal(s)
                        // alert(
                        // `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        // `\nend: ${slotInfo.end.toLocaleString()}` +
                        // `\naction: ${slotInfo.action}`
                        // )
                    // }
                />


                <div class="modal fade bd-example-modal-xl" id="createModal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <form
                            onSubmit={this.crearCita}
                        >

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">Crear Cita</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <MDBContainer>
                                        <div className="tab-content p-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">


                                                {/*AQUI EMPEIZAN LOS CAMPOS DEL FORMULARIO*/}

                                                {/*FILA NUMERO DOS DEL FORMULARIO */}
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span class="input-group-text" id="inputGroup-sizing-default">Titulo</span>
                                                            </div>
                                                            <input type="text" id="f_titulo" className="form-control"
                                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                                name="titulo"
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <label class="input-group-text" for="inputGroupSelect01">Responsable</label>
                                                            </div>
                                                            <select
                                                                className="form-control"
                                                                onClick={this.getUsuarios}
                                                                name="asignado"
                                                                onChange={this.onInputChange}

                                                            >
                                                                <option value="default" selected disabled>Colaborador...</option>
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

                                                {/*FILA NUMERO TRES DEL FORMULARIO */}
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="inputGroup-sizing-default">Hora inicio</span>
                                                            </div>
                                                            <DateTimePicker
                                                                onChange={this.onChangeInicio}
                                                                value={this.state.fecha_inicio}
                                                                format="y-MM-dd h:mm:ss a"

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="inputGroup-sizing-default">Hora fin</span>
                                                            </div>
                                                            <DateTimePicker
                                                                onChange={this.onChangeFin}
                                                                value={this.state.fecha_fin}
                                                                format="y-MM-dd h:mm:ss a"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                {/*FILA NUMERO CUATRO DEL FORMULARIO */}
                                                <div className="row">
                                                    {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="inputGroup-sizing-default">¿Todo el dia?</span>
                                                            </div>
                                                            <select
                                                                class="custom-select"
                                                                id="f_profesion"
                                                                name="todoDia"
                                                                onChange={this.onInputChange}

                                                            >
                                                                <option value="default" selected disabled>Opcion...</option>
                                                                <option value="1">Si</option>
                                                                <option value="0">No</option>
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">Descripcion</span>
                                                            </div>


                                                            <textarea
                                                                rows="3" cols="50"
                                                                class="form-control"
                                                                aria-label="With textarea"
                                                                name="desc"
                                                                id="desc"
                                                                onChange={this.onInputChange}
                                                            >
                                                            </textarea>

                                                        </div>
                                                    </div>

                                                </div>

                                                {/*AQUI TERMINAN  LOS CAMPOS DEL FORMULARIO*/}

                                            </div>


                                        </div>
                                    </MDBContainer>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Cerrar</button>
                                    <button
                                        type="submit"
                                        className="btn btn-secondary">
                                        Agendar cita
                                    </button>

                                </div>



                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}