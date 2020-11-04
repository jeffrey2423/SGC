import React from 'react';
import './styles/Buscador.css'

class Buscador extends React.Component {
    render() {

        return (
            <div>
                {this.props.error && (
                    <p className="text-danger">{this.props.error.message}</p>
                )}
                <form onSubmit={this.props.onSubmit}>
                    <div className="md-form input-group mb-3">
                        <input
                            onChange={this.props.onChange}
                            type="text"
                            className="form-control"
                            placeholder="¿Que estas buscando hoy?"
                            aria-label="Recipient's username"
                            aria-describedby="MaterialButton-addon2"
                            name="criterio"
                            value={this.props.criterio} />

                        <div className="input-group-append">
                            <button
                                className="btn btn-md btn-secondary m-0 px-3"
                                type="submit"
                                id="MaterialButton-addon2"
                            >
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        );

    }

}

export default Buscador;