import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


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
