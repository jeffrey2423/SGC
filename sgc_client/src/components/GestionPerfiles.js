import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { format, register } from 'timeago.js';
// the local dict example is below.
const localeFunc = (number, index, total_sec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // total_sec: total seconds between date to be formatted and today's date;
    return [
        ['justo ahora', 'ahora mismo'],
        ['%s segundos atrás', 'en %s segundos'],
        ['Hace 1 minuto', 'en 1 minuto'],
        ['%s minutos atrás', 'en %s minutos'],
        ['Hace 1 hora', 'en 1 hora'],
        ['%s horas', 'en %s horas'],
        ['Hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['Hace 1 semana', 'en 1 semana'],
        ['%s semanas atrás', 'en %s semanas'],
        ['Hace 1 mes', 'en 1 mes'],
        ['%s meses atrás', 'en %s meses'],
        ['Hace 1 año', 'en 1 año'],
        ['%s años atrás', 'en %s años']
    ][index];
};
// register your locale with timeago
register('es_ES', localeFunc);

export class GestionPerfiles extends Component {
    state = {
        perfiles: [],
        permisos: [],
        perfilSeleccionado: 0,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmMTAwNF90cyI6IjIwMjAtMDQtMTFUMDM6MTI6MjEuMDY5WiIsImYxMDA0X2lkIjo1MSwiZjEwMDRfbm9tYnJlIjoiamVmZnJleSIsImYxMDA0X2FwZWxsaWRvIjoicmlvcyIsImYxMDA0X2ZlY2hhX25hY2ltaWVudG8iOiIxOTk5LTAyLTA0VDA1OjAwOjAwLjAwMFoiLCJmMTAwNF9pZF9wcm9mZXNpb25fdDEwMDMiOjEsImYxMDA0X2VtYWlsIjoiMjR0ZGRqamdndGc1NTNAZ21haWwuY29tIiwiZjEwMDRfY2xhdmUiOiI4MjdjY2IwZWVhOGE3MDZjNGMzNGExNjg5MWY4NGU3YiIsImYxMDA0X2lkX3BlcmZpbF90MTAwMCI6MSwiZjEwMDRfaW5kX2FjdGl2byI6MSwiaWF0IjoxNTg2NzE4MTM0fQ.4fkNt2a__SLsma_-ifcUNWJT4f4vdwdT6JUCtHvJeFs"
    }

    async componentDidMount() {
        this.getPerfiles();
    }

    getPerfiles = async () => {
        const res = await axios.get("http://localhost:4000/api/user/profile/getProfiles", {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            Swal.fire({
                icon: 'error',
                title: res.data.status,
                text: res.data.description,
                footer: res.data.id
            })
        } else {
            this.setState({ perfiles: res.data });
        }
    }

    getPermisos = async (id_perfil) => {

        const res = await axios.get("http://localhost:4000/api/user/profile/getPermission/" + id_perfil, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        });
        if (res.data.status === "error") {
            Swal.fire({
                icon: 'error',
                title: res.data.status,
                text: res.data.description,
                footer: res.data.id
            })
        } else {
            this.setState({ permisos: res.data });
            this.setState({ perfilSeleccionado: id_perfil });
        }

    }

    deletePermisoExt = async (id_permiso) => {

        const res = await this.mensaje_error();
        console.log(res);

        if (res.value) {
            const res = await axios.delete("http://localhost:4000/api/user/profile/deletePermisoExt", {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                },
                data: {
                    perfil: this.state.perfilSeleccionado,
                    permiso: id_permiso
                }
            });
            if (res.data.status === "error") {
                Swal.fire({
                    icon: 'error',
                    title: res.data.status,
                    text: res.data.description,
                    footer: res.data.id
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: res.data.status,
                    text: res.data.description,
                    footer: res.data.id
                })
            }
        }

    }




    mensaje_error = async () => {

        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <ul className="list-group" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>
                        <li className="list-group-item active">Perfiles</li>
                        {
                            this.state.perfiles.map(perfil => (
                                <li
                                    className="list-group-item list-group-item-action"
                                    key={perfil.f1000_id}
                                    onClick={() => this.getPermisos(perfil.f1000_id)}>
                                    {perfil.f1000_nombre}
                                    <div className="d-flex w-100 justify-content-between">
                                        <small>{format(perfil.f1000_ts, 'es_ES')}</small>
                                    </div>
                                </li>)
                            )
                        }
                    </ul>
                </div>
                <div className="col-md-8">
                    <ul className="list-group" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>

                        <li className="list-group-item active">Permisos</li>
                        {
                            this.state.permisos.map(permiso => (
                                <li
                                    className="list-group-item list-group-item-action"
                                    key={permiso.f_id_permiso}
                                >

                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{permiso.f_nombre_permiso}</h5>
                                        <span className="badge badge-primary badge-pill"
                                            onClick={() => this.deletePermisoExt(permiso.f_id_permiso)}>
                                            Borrar</span>
                                    </div>


                                    <div className="d-flex w-100 justify-content-between">
                                        <small>{format(permiso.f_fecha_creacion_permiso, 'es_ES')}</small>
                                    </div>

                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div >

        )
    }
}

export default GestionPerfiles