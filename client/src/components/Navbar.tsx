import React from 'react';
import {Link} from 'react-router-dom';

import Login from './Login';

const Navbar = ({isAuth, setAuth, user, setUser}:any) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand mr-5" to='/'>MapQueue ⚡</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 w-100">
                    <li className="nav-item">
                        <Link className="nav-link" to='/queuebot'>QueueBot <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/queues'>Queues</Link>
                    </li>
                    <li className="nav-item ml-2">
                        {
                            isAuth ?
                            <Link className="nav-link" to='/create'>Create</Link>
                            : <Link className="nav-link disabled" to='/create' style={{pointerEvents: 'none'}}>Create</Link>
                        }
                    </li>
                    {
                        isAuth ?
                        <React.Fragment>
                            <li className="nav-item ml-auto mr-5">
                                <Link className="nav-link" style={{color: 'white'}} to={'/users/' + user.name}>😁 <u>{user.name}</u></Link>
                            </li>
                            <li className="nav-item">
                                <Login isAuth={isAuth} setAuth={setAuth} setUser={setUser}/>
                            </li>
                        </React.Fragment>
                        :
                        <li className="nav-item ml-auto">
                            <Login isAuth={isAuth} setAuth={setAuth} setUser={setUser}/>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;