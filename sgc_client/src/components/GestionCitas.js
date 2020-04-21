import React, { Component } from 'react'

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

  render() {
    return (

      <div className="container">
        <div className="card-spa">
          <div className="card-body">
            <h2 className="card-title">Citas creadas</h2>
            <hr />
            <span className="message-mouseover" id="message-mouseover-event"></span>
            <div className="tableevent" id="eventsdatatable">
              <EventDatatablePage />
            </div>
          </div>
        </div>
        <div className="formevent card-spa container mt-4" id="eventform">
          <h2>Formulario de citas</h2>
          <hr />
          <EventForm />
        </div>
      </div>

    )
  }
}