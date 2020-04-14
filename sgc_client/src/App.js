import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Header from './/components/header'
import Menu from './/components/NavBar'
import GestionPerfiles from './/components/GestionPerfiles'
import GestionCitas from './/components/GestionCitas'

import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <div className="container p-4">
        <Route path="/GestionPerfiles" exact component={GestionPerfiles} />
        <Route path="/GestionCitas" exact component={GestionCitas} />
      </div>
    </Router>

  );
}

export default App;
