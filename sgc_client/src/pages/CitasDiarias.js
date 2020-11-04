import React from 'react';

import CitaDiaria from '../components/CitaDiaria'
import Buscador from '../components/Buscador'

import './styles/CitasDiarias.css'

class CitasDiarias extends React.Component {

    state = {
        loading: false,
        error: null,
        criterio: "",
        show: true,
        scrollPos: 0,
        jsonPrueba: [
            {
                title: "02:00-06:59",
                start: "2018-03-03 02:00",
                end: "2018-03-03 06:59",
                up_down_ind: "N"
            },
            {
                title: "07:00-23:59",
                start: "2018-03-03 07:00",
                end: "2018-03-03 23:59",
                up_down_ind: "Y"
            },
            {
                title: "00:00-01:59",
                start: "2018-03-04 00:00",
                end: "2018-03-04 01:59",
                up_down_ind: "Y"
            },
            {
                title: "02:00-06:59",
                start: "2018-03-04 02:00",
                end: "2018-03-04 06:59",
                up_down_ind: "N"
            },
            {
                title: "07:00-23:59",
                start: "2018-03-04 07:00",
                end: "2018-03-04 23:59",
                up_down_ind: "Y"
            },
            {
                title: "00:00-01:59",
                start: "2018-03-05 00:00",
                end: "2018-03-05 01:59",
                up_down_ind: "Y"
            },
            {
                title: "02:00-06:59",
                start: "2018-03-05 02:00",
                end: "2018-03-05 06:59",
                up_down_ind: "N"
            },
            {
                title: "07:00-23:59",
                start: "2018-03-05 07:00",
                end: "2018-03-05 23:59",
                up_down_ind: "Y"
            },
            {
                title: "00:00-01:59",
                start: "2018-03-06 00:00",
                end: "2018-03-06 01:59",
                up_down_ind: "Y"
            }
        ],
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }
      handleScroll = () => {
        // console.log(document.body.getBoundingClientRect());
        this.setState({
          scrollPos: document.body.getBoundingClientRect().top,
          show: document.body.getBoundingClientRect().top > this.state.scrollPos
        });
      };

    handleChange = e => {
        this.setState({
            ...this.state.form,
            [e.target.name]: e.target.value,
        });


        if (e.target.name = "criterio") {

        }
    };

    handleSubmit = async e => {
        e.preventDefault();
        try {

        } catch (error) {
            this.setState({ loading: true, error: error });
        }


    };

    render() {

        return (
            <React.Fragment>
                    <Buscador
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                        error={this.state.error}
                        criterio={this.state.criterio}
                    />

                <CitaDiaria
                    citas={this.state.jsonPrueba}
                />
            </React.Fragment>
        );

    }

}

export default CitasDiarias;
