import React, { Component } from 'react'
import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios'
import validation from '../resources/validations/main';
import clientResource from '../resources/client';
import 'datatables.net-dt'
import $ from 'jquery';
import 'datatables.net';

export default class GestionCitas extends Component {

  state = {
    usuarios: [],
    citas: [],
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
    titulo: '',
    desc: '',
    todoDia: 0,
    asignado: 0,
    token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token")
  }

  async componentDidMount() {
    if (!sessionStorage.getItem("token")) {
      window.location.href = '/';
    } else {
      await this.getCitas();
      window.setTimeout(function () {
        $('#example').DataTable();
      }, 1000);
    }

  }
  onChangeFin = fecha_fin => this.setState({ fecha_fin })
  onChangeInicio = fecha_inicio => this.setState({ fecha_inicio })

  createModal = () => {

    $('#createModal').modal({ show: true });

  }

  getCitas = async () => {

    const userData = {
      id_profesion: sessionStorage.getItem("f1004_id_profesion_t1003"),
      id_usuario: sessionStorage.getItem("f1004_id")
    }
    const res = await axios.post("http://localhost:4000/api/user/events/getEvents/" + 9999, userData, {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    });
    if (res.data.status === "error") {
      validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
    } else {
      this.setState({ citas: res.data });
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

  crearCita = async (e) => {
    e.preventDefault();

    // if (validation.validarUsuario(validate_user)) {
      const data = {};
      data.titulo = this.state.titulo;
      // data.description = this.state.desc;
      data.description = $("#desc").text();
      data.fecha_inicial = clientResource.dateToTs(this.state.fecha_inicio);
      data.fecha_final = clientResource.dateToTs(this.state.fecha_fin);
      data.ind_todo_el_dia = this.state.todoDia;
      data.id_creador = sessionStorage.getItem("f1004_id");
      data.id_asignado = this.state.asignado;

      const res = await axios.post("http://localhost:4000/api/user/events/createEvent", data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${this.state.token}`
        }
      });

      if (res.data.status === "error") {
        validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
      } else {
        this.getCitas();
        validation.success(res.data.status, res.data.description, res.data.id);
      }
    // }

    // $("#f_titulo").val(clientResource.dateToTs(this.state.fecha_inicio));
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
          <div className="card-body">
            <span
              style={{ cursor: 'pointer' }}
              class="btn btn-secondary btn "
              onClick={() => this.createModal()}
            >
              <MDBIcon far icon="calendar-check" className="mr-1" />Nueva cita
          </span>
            <hr />
            <h2 className="card-title">Citas programadas</h2>
            <hr />

            <div class="table-responsive ">

              <table className="table table-bordered table-striped mb-0" id="example">
                <thead style={{ position: 'sticky' }}>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Creacion</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Fecha inicio</th>
                    <th scope="col">Fecha fin</th>
                    <th scope="col">Todo el dia</th>
                    <th scope="col">Creado por:</th>
                    <th scope="col">Asignado a:</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    this.state.citas.map(cita =>
                      <tr>
                        <th scope="row">{cita.f_id}</th>
                        <td>
                          {clientResource.isoToDateSecs(cita.f_fecha_creacion)}
                        </td>
                        <td>{cita.title}</td>
                        <td>{clientResource.isoToDateSecs(cita.start)}</td>
                        <td>{clientResource.isoToDateSecs(cita.end)}</td>
                        <td>{cita.allday}</td>
                        <td>{cita.f_creado_por}</td>
                        <td>{cita.f_asignado_a}</td>
                        <td
                          style={{ color: 'red' }}
                        >
                          {cita.estado === 'Activo' ? (

                            <span
                              style={{
                                borderRadius: '3px',
                                cursor: 'default',
                                width: '75%'
                              }}
                              class="badge badge-success m-2 p-2"
                            >Cita Activa
                            </span>
                          ) : (

                              <span
                                style={{ borderRadius: '3px', cursor: 'default', width: '80%' }}
                                class="badge badge-danger m-2 p-2"
                              >Cita Cancelada
                              </span>

                            )}

                        </td>
                        <td>
                          <span
                            style={{ cursor: 'pointer', width: '70%' }}
                            class="badge badge-secondary m-2 modBtn p-2"
                          // onClick={() => this.editModal(cita.f_id)}
                          >
                            Editar
                        </span>

                          {cita.estado === 'Activo' ? (

                            <span
                              style={{ cursor: 'pointer', width: '70%' }}
                              class="badge badge-danger m-2 modBtn p-2"
                            // onClick={() => this.editModal(cita.f_id)}
                            >
                              Cancelar
                            </span>
                          ) : (

                              <span
                                style={{ cursor: 'pointer', width: '70%' }}
                                class="badge badge-danger m-2 modBtn p-2"
                              // onClick={() => this.editModal(cita.f_id)}
                              >
                                Activar
                              </span>
                            )}
                          <span
                            style={{ cursor: 'pointer', width: '70%' }}
                            onClick={() => clientResource.showDesc(cita.title, cita.desc)}
                          >
                            <center>
                              <MDBIcon far icon="eye" />
                            </center>

                          </span>

                        </td>

                      </tr>
                    )
                  }

                </tbody>
                <tfoot>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Creacion</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Fecha inicio</th>
                    <th scope="col">Fecha fin</th>
                    <th scope="col">Todo el dia</th>
                    <th scope="col">Creado por:</th>
                    <th scope="col">Asignado a:</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>

                  </tr>
                </tfoot>
              </table>

            </div>

          </div>
        </div>


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
                                format="y-MM-dd h:mm:ss"
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
                              />
                            </div>
                          </div>

                        </div>

                        {/*FILA NUMERO CUATRO DEL FORMULARIO */}
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                          </div>

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
                              />

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

      </div >

    )
  }
}