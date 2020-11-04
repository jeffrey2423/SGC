import React from 'react';
import './styles/CitaDiaria.css'

import header from '../images/calendar (1).svg';
let id = 1
class CitaDiaria extends React.Component {
    render() {

        return (
            <div class="card-columns">
                {this.props.citas.map(cita => (
                    <div class="card" key={id + 1}>
                        <div className="row fila_img p-3 pb-0">
                            <div className="col">
                                <img
                                    className="card-img-top card-img"
                                    src={header}
                                    alt="Logo"
                                />
                            </div>
                            <div className="col">
                                <p>otra column</p>
                            </div>

                        </div>

                        <div className="card-body">
                            <h5 className="card-title">
                                {cita.title}
                            </h5>
                            <p className="card-text">
                                {cita.start}
                                {cita.end}
                            </p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                ))}

            </div>
        );

    }

}
export default CitaDiaria;