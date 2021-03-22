import React from 'react';

const WIPAlert = () => {
    return (
        <div className="alert alert-warning alert-dismissible fade show fixed-bottom" role="alert" style={{margin: 0}}>
            <p className="text-center" style={{margin: 0}}><strong>Warning: </strong> MapQueue is a work-in-progress and may not function as expected.</p>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default WIPAlert;