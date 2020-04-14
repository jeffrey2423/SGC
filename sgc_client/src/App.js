import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Header from './/components/header'

import Inicio from './/components/Inicio'
import GestionUsuarios from './/components/GestionUsuarios'
import GestionCitas from './/components/GestionCitas'
import GestionPerfiles from './/components/GestionPerfiles'


import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <div className="container p-4">
        <Route path="/Inicio" exact component={Inicio} />
        <Route path="/GestionUsuarios" exact component={GestionUsuarios} />
        <Route path="/GestionCitas" exact component={GestionCitas} />
        <Route path="/GestionPerfiles" exact component={GestionPerfiles} />
      </div>
    </Router>

  );
}

export default App;
