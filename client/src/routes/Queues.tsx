import React from 'react';

const Queues = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center" style={{alignItems: 'flex-start'}}>
                <img alt='Black OSU Logo' src={process.env.PUBLIC_URL + '/osu-logo-black.png'} style={{width: '15%', maxWidth: '140px', minWidth: '100px'}}/>
            </div>
            <div className="row justify-content-center">
                <h1>Find Queues</h1>
            </div>  
            <div className="row justify-content-center">
                <p className="my-2 text-center" style={{width: '90%'}}>Find existing queues by category or searching by name/creator.</p>
            </div>
        </div>
    )
}

export default Queues;