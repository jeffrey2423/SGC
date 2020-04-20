import React, { Component } from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import validation from '../resources/validations/main';

export class EventDatatablePage extends Component {

  state = {
    events: [],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmMTAwNF90cyI6IjIwMjAtMDQtMTFUMDM6MTI6MjEuMDY5WiIsImYxMDA0X2lkIjo1MSwiZjEwMDRfbm9tYnJlIjoiamVmZnJleSIsImYxMDA0X2FwZWxsaWRvIjoicmlvcyIsImYxMDA0X2ZlY2hhX25hY2ltaWVudG8iOiIxOTk5LTAyLTA0VDA1OjAwOjAwLjAwMFoiLCJmMTAwNF9pZF9wcm9mZXNpb25fdDEwMDMiOjEsImYxMDA0X2VtYWlsIjoiMjR0ZGRqamdndGc1NTNAZ21haWwuY29tIiwiZjEwMDRfY2xhdmUiOiI4MjdjY2IwZWVhOGE3MDZjNGMzNGExNjg5MWY4NGU3YiIsImYxMDA0X2lkX3BlcmZpbF90MTAwMCI6MSwiZjEwMDRfaW5kX2FjdGl2byI6MSwiaWF0IjoxNTg2NjQ0MTYyfQ.CSy6iwftRC3lvJ4-t0P2vIgB2bnKyVWUkMq9rBIiDVs"
  }

  componentWillMount = async () => {
    this.getEvents();
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
      this.setState({ usuarios: res.data });
      console.log(this.state.events);
    }

  }

  render() {

    const data = {
      columns: [
        {
          label: 'Id',
          field: 'f_id',
          name: 'f_id',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nombre',
          field: 'f_nombre',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Apellido',
          field: 'f_apellido',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Email',
          field: 'f_email',
          sort: 'asc',
          width: 100,
          style: {color:'red'}
        },
        {
          label: 'Profesión',
          field: 'f_profesion',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Perfil/Rol',
          field: 'f_perfil',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Estado',
          field: 'f_activo',
          sort: 'asc',
          width: 100
        }
      ],
      rows: this.state.events
    };

    return (
      <MDBDataTable
      responsive
        striped
        bordered
        hover
        data={data}
      />
    );

  }

}

export default EventDatatablePage;