import React, { Component } from 'react'
import { MDBIcon, MDBContainer, MDBBtn} from "mdbreact";

//library to show notifications
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import EventDatatablePage from './EventDatatablePage';
import EventForm from './EventForm';
import $ from 'jquery';

export default class GestionCitas extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  async componentDidMount() {
    if (!sessionStorage.getItem("token")) {
      window.location.href = '/';
    } else {
      this.clickTableUpdateUser();
      this.alertHoverTable();
    }

  }

  clickTableUpdateUser = () => {
    $(document).on('click', '#eventsdatatable table tbody tr td', function () {

      //Get data from table
      let event = {};
      event.f_nombre = $(this).parents("tr").find("td").eq(1).html();
      event.f_descripcion = $(this).parents("tr").find("td").eq(2).html();
      event.f_asignado_a = $(this).parents("tr").find("td").eq(3).html();
      event.f_fecha_incial = $(this).parents("tr").find("td").eq(4).html();
      event.f_fecha_final = $(this).parents("tr").find("td").eq(5).html();

      //Set data to form
      $("#f_titulo").attr("value", event.f_nombre);
      $("#f_descripcion").attr("value", event.f_descripcion);
      $("#f_fecha_inicial").attr("value", event.f_fecha_inicial);
      $("#f_fecha_final").attr("value", event.f_fecha_final);
      $("#f_asignado_a option[value=" + event.f_asignado_a + "]").attr('selected', 'selected');

      $('html, body').animate({
        scrollTop: $("#eventform").offset().top
      }, 1500);
    });
  }

  alertHoverTable = () => {
    $(document).ready(function () {
      $("div.tableevent tr").not(":first").mouseover(function () {
        $("#message-mouseover-event").empty();
        $("#message-mouseover-event").append("Click sobre la fila para actualizar");
      })
        .mouseout(function () {
          $("#message-mouseover-event").empty();
        });
    });
    /*$("#usersdatatable table tr")
        .mouseover(function () {
            let user  = $(this).parents("tr").find("td:first").html();
            
        })
        .mouseout(function () {
            $("#message-mouseover").empty();
            $("#message-mouseover").append("Para actualizar, seleccione un usuario");  
        });*/

  }

  createModal = () => {

    $('#createModal').modal({ show: true });


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
            <MDBIcon far icon="calendar-check" className="mr-1"/>Nueva cita
          </span>
          <hr />
            <h2 className="card-title">Citas programadas</h2>
      
            <span className="message-mouseover" id="message-mouseover-event"></span>
            <div className="tableevent" id="eventsdatatable">
              <EventDatatablePage />
            </div>
          </div>
        </div>

      <div class="modal fade bd-example-modal-xl" id="createModal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Crear Cita</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                        </div>
                        <div className="modal-body">
                            <MDBContainer>
                                Inserte Los Datos
                                <div className="tab-content p-3" id="myTabContent">
                                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                {/*AQUI EMPEIZAN LOS CAMPOS DEL FORMULARIO*/}


                                    {/*FILA NUMERO UNO DEL FORMULARIO */}
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div className="input-group mb-3">
                                          <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre cliente</span>
                                          </div>
                                              <input type="text" id="f_nombre" placeholder="Nombre del cliente" className="form-control"
                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required />
                                        </div>
                                      </div>

                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                          <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                              <span className="input-group-text" id="inputGroup-sizing-default">Apellido cliente</span>
                                            </div>
                                              <input type="text" id="f_apellido" placeholder="Apellido del cliente" className="form-control"
                                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" pattern=".*\S.*" required />
                                          </div>
                                      </div>
                                    </div>

                                    {/*FILA NUMERO DOS DEL FORMULARIO */}
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div className="input-group mb-3">
                                          <div className="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-default">Descripción</span>
                                          </div>
                                            <input type="text" id="f_descripcion" placeholder="Servicio que se va prestar" className="form-control"
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                      </div>

                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="input-group mb-3">
                                          <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Responsable</label>
                                          </div>
                                            <select class="custom-select" id="f_profesion">
                                            <option selected>Choose...</option>
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
                                          <select class="custom-select" id="f_profesion">
                                            <option selected>Choose from actual time..</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="input-group mb-3">
                                          <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-default">Hora fin</span>
                                          </div>
                                          <select class="custom-select" id="f_profesion">
                                            <option selected>Choose from Actual time...</option>
                                          </select>
                                        </div>
                                      </div>

                                    </div>

                                    {/*FILA NUMERO CUATRO DEL FORMULARIO */}
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="input-group mb-3">
                                          <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-default">Fecha de la cita</span>
                                          </div>
                                          <select class="custom-select" id="f_profesion">
                                            <option selected>Choose from calendar...</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="input-group mb-3">
                                          <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-default">Asignado por</span>
                                          </div>
                                          <select class="custom-select" id="f_profesion">
                                            <option selected>Elegir persona que agendó la cita...</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>

                                    {/*AQUI TERMINAN  LOS CAMPOS DEL FORMULARIO*/}

                                  </div>
                                </div>
                            </MDBContainer>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                <MDBBtn color="purple" title="Crear usuario" id="bt-insert-user">Agendar cita</MDBBtn>
                            </div>
                        </div>
                    </div>
        </div>

        

       {/* <div className="formevent card-spa container mt-4" id="eventform">
            <h2>Formulario de citas</h2>
            <hr />
            <EventForm />
          </div>*/}
      </div>

    )
  }
}