import React from 'react';
import { MDBDataTable } from 'mdbreact';
import MDBTableEditor from 'mdb-react-table-editor';

const UserDatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Nombre',
        field: 'nombre',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Apellido',
        field: 'apellido',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Fecha de Nacimiento',
        field: 'fecha_nacimiento',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Profesión',
        field: 'id_profesion',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Perfil/Rol',
        field: 'id_perfil',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey2",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey3",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      },
      {
        "nombre": "jeffrey",
        "apellido": "rios",
        "fecha_nacimiento": "1999-02-04",
        "id_profesion": "1",
        "email": "pruebatoken@gmail.com",
        "id_perfil": "1"
      }

    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  );
}

export default UserDatatablePage;