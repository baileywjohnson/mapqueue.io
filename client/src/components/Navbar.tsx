import React from 'react';
import {Link} from 'react-router-dom';

import Login from './Login';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/'><a className="navbar-brand mr-5" href="https://mapqueue.io">MapQueue</a></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to='/queuebot'><a className="nav-link" href="https://mapqueue.io/queuebot">QueueBot <span className="sr-only">(current)</span></a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/queues'><a className="nav-link" href="https://mapqueue.io/queues">Queues</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/create'><a className="nav-link disabled" href="https://mapqueue.io/create">Create</a></Link>
                    </li>
                </ul>
                <Login />
            </div>
        </nav>
    )
}

export default Navbar;