import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import { useEffect, useState } from 'react'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WIPAlert from './components/WIPAlert';

import Home from './routes/Home';
import QueueBot from './routes/QueueBot';
import Queues from './routes/Queues';
import Create from './routes/Create';
import NotFound from './routes/NotFound';

const App = () => {

  const authCheck = async () => {
    try {
      const verifyAuth = await fetch(process.env.API_URL + '/auth/verify', {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });
      const verifyAuthJSON = await verifyAuth.json();
      if(verifyAuthJSON){
        setAuthenticated(true);
      }
      else{
        setAuthenticated(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    authCheck();
  }, []);

  const [authenticated, setAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState({
    name: ''
  });


  //Update Auth Function to Pass As Prop to Login/Register Routes
  const setAuth = (authResult: any) => {
    setAuthenticated(authResult);
  }

  const setUser = (userResult: any) => {
    setActiveUser(userResult);
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar isAuth={authenticated} setAuth={setAuth} user={activeUser} setUser={setUser}/>
      <Switch>
        <Route path='/' exact render={() => {return <Home isAuth={authenticated}/>}} />
        <Route path='/queuebot' render={() => {return <QueueBot />}} />
        <Route path='/queues' render={() => {return <Queues />}} />
        <Route path='/create' render={() => {return <Create isAuth={authenticated}/>}} />
        <Route render={() => {return <NotFound />}} />
      </Switch>
      <Footer />
      <WIPAlert />
    </Router>
  );
}

export default App;
