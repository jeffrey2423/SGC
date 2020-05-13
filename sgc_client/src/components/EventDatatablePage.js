import React, { Component } from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import validation from '../resources/validations/main';
import clientResource from '../resources/client';
import $ from 'jquery';
export class EventDatatablePage extends Component {

  state = {
    events: [],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmMTAwNF90cyI6IjIwMjAtMDQtMTFUMDM6MTI6MjEuMDY5WiIsImYxMDA0X2lkIjo1MSwiZjEwMDRfbm9tYnJlIjoiamVmZnJleSIsImYxMDA0X2FwZWxsaWRvIjoicmlvcyIsImYxMDA0X2ZlY2hhX25hY2ltaWVudG8iOiIxOTk5LTAyLTA0VDA1OjAwOjAwLjAwMFoiLCJmMTAwNF9pZF9wcm9mZXNpb25fdDEwMDMiOjEsImYxMDA0X2VtYWlsIjoiMjR0ZGRqamdndGc1NTNAZ21haWwuY29tIiwiZjEwMDRfY2xhdmUiOiI4MjdjY2IwZWVhOGE3MDZjNGMzNGExNjg5MWY4NGU3YiIsImYxMDA0X2lkX3BlcmZpbF90MTAwMCI6MSwiZjEwMDRfaW5kX2FjdGl2byI6MSwiaWF0IjoxNTg2NjQ0MTYyfQ.CSy6iwftRC3lvJ4-t0P2vIgB2bnKyVWUkMq9rBIiDVs"
  }

  componentWillMount = async () => {
    this.getEvents();

    $(document).ready(function () {
      $('#dtOrderExample').DataTable({
      "order": [[ 3, "desc" ]]
      });
      $('.dataTables_length').addClass('bs-select');
      });
  }

  getEvents = async () => {

    const res = await axios.get("http://localhost:4000/api/events/getEvents/" + 9999, {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    });
    if (res.data.status === "error") {
      validation.error(res.data.status, res.data.description, res.data.id, res.data.traza);
    } else {
      this.setState({ events: res.data });
      console.log(this.state.events);
    }

  }

  render() {

    return (
            <div class="table-responsive ">

                <table id="dtOrderExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">  
                    <thead style={{ position: 'sticky' }}>
                      <tr>
                        <th scope="col">Nombre cliente</th>
                        <th scope="col">Apellido cliente</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Responsable</th>
                        <th scope="col">Hora inicio</th>
                        <th scope="col">Hora fin</th>
                        <th scope="col">Fecha cita</th>
                        <th scope="col">Asignado por</th>
                                        
                      </tr>
                    </thead>
                    <tbody>

                      {/** AQUI EL CUERPO DE LA TABLA O INFORMACIÓN A MOSTRAR */}
                      <tr>
                      <td>María</td>
                      <td>Pérez</td>
                      <td>El/La cliente viene para manicure</td>
                      <td>Jeffrey</td>
                      <td>14:00</td>
                      <td>15:00</td>
                      <td>07/05/2020</td>
                      <td>Febe</td>
                      </tr>
                      

                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="col">Nombre cliente</th>
                        <th scope="col">Apellido cliente</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Responsable</th>
                        <th scope="col">Hora inicio</th>
                        <th scope="col">Hora fin</th>
                        <th scope="col">Fecha cita</th>
                        <th scope="col">Asignado por</th>
                      </tr>
                    </tfoot>
                </table>
            </div>

    );

  }

}

export default EventDatatablePage;