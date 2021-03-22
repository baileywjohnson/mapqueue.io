import React from 'react';

const Login = () => {
    return (
        <React.Fragment>
            <button type="button" className="btn btn-light my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
            <div className="modal fade" id="loginModal" data-tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Login / Register</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        (Login Form Here)
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Login</button>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;