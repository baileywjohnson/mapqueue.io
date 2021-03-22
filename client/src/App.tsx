import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { useEffect } from 'react'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WIPAlert from './components/WIPAlert';

import Home from './components/Home';
import QueueBot from './components/QueueBot';
import Queues from './components/Queues';
import Create from './components/Create';
import NotFound from './components/NotFound';

const App = () => {

  useEffect(() => {
    document.getElementById('dispContainer')!.scrollTo(0, 0);
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <div id="dispContainer">
        <Switch>
          <Route path='/' exact render={() => {return <Home />}} />
          <Route path='/queuebot' render={() => {return <QueueBot />}} />
          <Route path='/queues' render={() => {return <Queues />}} />
          <Route path='/create' render={() => {return <Create />}} />
          <Route render={() => {return <NotFound />}} />
        </Switch>
      </div>
      <Footer />
      <WIPAlert />
    </Router>
  );
}

export default App;
