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
            console.log(this.state.eventos)
        }
    }


    render() {
        return (
            <div>

                <BigCalendar
                    selectable
                    popup
                    events={this.state.eventos}
                    defaultView='week'
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={now()}
                    onSelectEvent={event =>

                          Swal.fire({
                            title: event.title,
                            text: event.desc,
                            showConfirmButton: false,
                            showCloseButton: true,
                            width: 600,
                            padding: '3em',
                            background: '#fff url(/images/trees.png)',
                            backdrop: `
                            rgba(121, 129, 134, 0.2)
                              url("/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
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