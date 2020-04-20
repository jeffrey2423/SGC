import React, { Component } from 'react'

//library to show notifications
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import EventDatatablePage from './EventDatatablePage';
import EventForm from './UserForm';

export default class GestionCitas extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  render() {
    return (

      <div className="container">
        <div className="card-spa">
          <div className="card-body">
            <h2 className="card-title">Citas creadas</h2>
            <hr />
            <span id="message-mouseover"></span>
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