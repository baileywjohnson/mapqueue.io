import React from 'react';

const Create = ({isAuth}:any) => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center" style={{alignItems: 'flex-start'}}>
                <img alt='Black OSU Logo' src={process.env.PUBLIC_URL + '/osu-logo-black.png'} style={{width: '15%', maxWidth: '140px', minWidth: '100px'}}/>
            </div>
            <div className="row justify-content-center">
                <h1>Create A Queue</h1>
            </div>  
            <div className="row justify-content-center">
                {
                    isAuth ?
                    <p className="my-2 text-center" style={{width: '90%'}}>Create queues by adding links to beatmaps on the official "osu!" webpage.</p>
                    : <p className="my-2 text-center" style={{width: '90%'}}>Please login to create a queue.</p>
                }
            </div>
        </div>
    )
}

export default Create;