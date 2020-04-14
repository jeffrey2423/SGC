import React, { Component } from 'react'

//library to show notifications
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

export default class GestionCitas extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          show: false,
        };
      }
      
    render() {
        return (
            <div>
            <button onClick={() => this.setState({ show: true })}>Alert</button>
            <SweetAlert
              show={this.state.show}
              title="Demo"
              text="SweetAlert in React"
              onConfirm={() => this.setState({ show: false })}
            />
          </div>
            
        )
    }
}