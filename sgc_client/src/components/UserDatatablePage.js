import React, { Component } from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import validation from '../resources/validations/main';

export class UserDatatablePage extends Component {

  state = {
    usuarios: [],
    token: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? " " : sessionStorage.getItem("token") 
  }

  componentWillMount = async () => {
    this.getUsuarios();
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
      console.log(this.state.usuarios);
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
      rows: this.state.usuarios
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

export default UserDatatablePage;