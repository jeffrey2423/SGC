import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export class GestionPerfiles extends Component {
    state = {
        permisos: [],
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmMTAwNF90cyI6IjIwMjAtMDQtMTFUMDM6MTI6MjEuMDY5WiIsImYxMDA0X2lkIjo1MSwiZjEwMDRfbm9tYnJlIjoiamVmZnJleSIsImYxMDA0X2FwZWxsaWRvIjoicmlvcyIsImYxMDA0X2ZlY2hhX25hY2ltaWVudG8iOiIxOTk5LTAyLTA0VDA1OjAwOjAwLjAwMFoiLCJmMTAwNF9pZF9wcm9mZXNpb25fdDEwMDMiOjEsImYxMDA0X2VtYWlsIjoiMjR0ZGRqamdndGc1NTNAZ21haWwuY29tIiwiZjEwMDRfY2xhdmUiOiI4MjdjY2IwZWVhOGE3MDZjNGMzNGExNjg5MWY4NGU3YiIsImYxMDA0X2lkX3BlcmZpbF90MTAwMCI6MSwiZjEwMDRfaW5kX2FjdGl2byI6MSwiaWF0IjoxNTg2NzE4MTM0fQ.4fkNt2a__SLsma_-ifcUNWJT4f4vdwdT6JUCtHvJeFs"
    }

    async componentDidMount() {
        this.getPermisos();
    }

    getPermisos = async () => {
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
        }else{
            this.setState({ permisos: res.data });
        }
        
        
    }

    render() {
        return (
            <div className="col-md-6-offset-md-3">
                <div className="col-md-3">
                    <ul className="list-group">
                        {
                            this.state.permisos.map(permiso => (
                                <li
                                    className="list-group-item list-group-item-action"
                                    key={permiso.f1000_id}
                                    onDoubleClick={() => this.deleteUser(permiso.f1000_id)}>
                                    {permiso.f1000_nombre}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default GestionPerfiles