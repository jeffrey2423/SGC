import React, { Component } from 'react'
import * as BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'
import validation from '../resources/validations/main';

//import BigCalendar from 'react-big-calendar';
import moment, { now } from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const eventtt = [
    {
        "title": "Evento prueba",
        "desc": "Evento prueba Y su estado es activo",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "Evento prueba",
        "desc": "Evento prueba Y su estado es activo",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "DESDE POSTMAN",
        "desc": "DESDE POSTMAN Y su estado es cancelado",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "DESDE POSTMAN",
        "desc": "DESDE POSTMAN Y su estado es activo",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "Evento prueba",
        "desc": "Evento prueba Y su estado es cancelado",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "DESDE POSTMAN ACTUALIZADO",
        "desc": "DESDE POSTMAN ACTUALIZADO Y su estado es cancelado",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "DESDE POSTMAN ACTUALIZADO",
        "desc": "DESDE POSTMAN ACTUALIZADO Y su estado es cancelado",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "DESDE POSTMAN",
        "desc": "DESDE POSTMAN Y su estado es activo",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    },
    {
        "title": "DESDE POSTMAN ACTUALIZADO",
        "desc": "DESDE POSTMAN ACTUALIZADO Y su estado es activo",
        "start": new Date("2020-04-12T05:00:00.000Z"),
        "end": new Date("2020-04-12T05:00:00.000Z"),
        "allday": false
    }
]

export default class Inicio extends Component {
    state = {
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
        const res = await axios.post("http://localhost:4000/api/user/events/getEventsFilter",userData,{
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
        } else {
            this.setState({ eventos: res.data });
            this.cambiarValor('start',this.state.eventos)
            this.cambiarValor('end',this.state.eventos)
            console.log(this.state.eventos)
        }
    }


    render() {
        return (
            <div>

                <BigCalendar
                    selectable
                    popup
                    // events={this.state.eventos}
                    events = {eventtt}
                    defaultView='week'
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={now()}
                    onSelectEvent={event =>

                          Swal.fire({
                            title: event.title,
                            text: event.desc,
                            showConfirmButton: false,
                            showCloseButton: true,
                          })
                          
                        
                    }
                onSelectSlot={(slotInfo) => alert(
                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    `\nend: ${slotInfo.end.toLocaleString()}` +
                    `\naction: ${slotInfo.action}`
                )}
                />
            </div>
        )
    }
}