import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './/components/header'


// import GestionUsuarios from './/components/GestionUsuarios'
import Login from './/components/login'
import My404 from './/components/My404'

import Loading from './/components/Loading'
import './App.css'

const GestionPerfiles = lazy(() => import('.//components/GestionPerfiles'))
const GestionUsuarios2 = lazy(() => import('.//components/GestionUsuarios2'))
const GestionCitas = lazy(() => import('.//components/GestionCitas'))
const Inicio = lazy(() => import('.//components/Inicio'))






function App() {
  return (
    <Router>
      <Header />
      <div className="container p-4 spa-content">
        <Switch>
          <Route path="/" exact component={Login} />

          {/* <Route path="/GestionUsuarios" exact component={GestionUsuarios} /> */}

          <Suspense fallback={<Loading />}>
            <Route path="/Inicio" exact component={Inicio} />

            <Route path="/GestionCitas" exact component={GestionCitas} />

            <Route path="/GestionUsuarios" exact component={GestionUsuarios2} />

            <Route path="/GestionPerfiles" exact component={GestionPerfiles} />
          </Suspense>

          <Route component={My404} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
