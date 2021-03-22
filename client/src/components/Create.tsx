import React from 'react';

const Create = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <h1>Create A Queue</h1>
            </div>  
            <div className="row justify-content-center">
                <p className="my-2 text-center" style={{width: '90%'}}>MapQueue is a service that allows users to create queues of beatmaps for "osu!".  Provide <a href="https://mapqueue.io/queuebot" rel="noreferrer" target="_blank" style={{color: 'black', textDecoration: 'underline'}}>QueueBot 🤖</a> with a link to a specific queue to auto-rotate through the songs in the queue.</p>
            </div>
        </div>
    )
}

export default Create;