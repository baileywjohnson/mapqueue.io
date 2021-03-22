import React from 'react';
import './App.css';

import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <img alt='Black OSU Logo' src={process.env.PUBLIC_URL + '/osu-logo-black.png'} style={{width: '15%', maxWidth: '140px', minWidth: '100px'}}/>
        </div>
        <div className="row justify-content-center">
          <h1>MapQueue</h1>
        </div>  
        <div className="row justify-content-center">
          <p className="my-2 text-center" style={{width: '90%'}}>MapQueue is a service that allows users to create queues of beatmaps for "osu!".  Provide <a href="https://mapqueue.io/queuebot" rel="noreferrer" target="_blank" style={{color: 'black', textDecoration: 'underline'}}>QueueBot 🤖</a> with a link to a specific queue to auto-rotate through the songs in the queue.</p>
        </div>
      </div>
      <div className="alert alert-warning alert-dismissible fade show fixed-bottom" role="alert" style={{margin: 0}}>
        <p className="text-center" style={{margin: 0}}><strong>Warning: </strong> MapQueue is a work-in-progress and may not function as expected.</p>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <p className="text-center">&#11088; Created by <a href="https://github.com/baileywjohnson/mapqueue.io" rel="noreferrer" target="_blank" style={{color: 'black', textDecoration: 'underline'}}>Bailey Johnson</a></p>
    </div>
  );
}

export default App;
