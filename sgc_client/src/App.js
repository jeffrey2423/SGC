import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle';

import Menu from './/components/NavBar'
import GestionPerfiles from './/components/GestionPerfiles'

import './App.css'

function App() {
  return (
    <Router>
      <Menu />
      <div className="container p-4">
        <Route path="/GestionPerfiles" exact component={GestionPerfiles} />
      </div>
    </Router>

  );
}

export default App;
