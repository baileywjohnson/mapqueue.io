import React from 'react';

const Home = () => {
    return (
        <div className="container my-5">
        <div className="row justify-content-center" style={{alignItems: 'flex-start'}}>
          <img alt='Black OSU Logo' src={process.env.PUBLIC_URL + '/osu-logo-black.png'} style={{width: '15%', maxWidth: '140px', minWidth: '100px'}}/>
        </div>
        <div className="row justify-content-center">
          <h1>MapQueue</h1>
        </div>  
        <div className="row justify-content-center">
          <p className="my-2 text-center" style={{width: '90%'}}>MapQueue is a service that allows users to create queues of beatmaps for "osu!".  Provide <a href="https://mapqueue.io/queuebot" rel="noreferrer" target="_blank" style={{color: 'black', textDecoration: 'underline'}}>QueueBot 🤖</a> with a link to a specific queue to auto-rotate through the songs in the queue.</p>
        </div>
      </div>
    )
}

export default Home;