import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './/components/header'

import Inicio from './/components/Inicio'
import GestionUsuarios from './/components/GestionUsuarios'
import GestionUsuarios2 from './/components/GestionUsuarios2'
import GestionCitas from './/components/GestionCitas'
import GestionPerfiles from './/components/GestionPerfiles'
import Login from './/components/login'
import My404 from './/components/My404'


import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <div className="container p-4 spa-content">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Inicio" exact component={Inicio} />
          {/* <Route path="/GestionUsuarios" exact component={GestionUsuarios} /> */}
          <Route path="/GestionUsuarios" exact component={GestionUsuarios2} />
          <Route path="/GestionCitas" exact component={GestionCitas} />
          <Route path="/GestionPerfiles" exact component={GestionPerfiles} />
          <Route component={My404} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
