import React, { useState } from 'react';

const Login = ({isAuth, setAuth, setUser}:any) => {

    //"mailname" represents email or username
    const [formInputs, setFormInputs] = useState({
        mailname: "",
        password: ""
    });

    const [regFormInputs, setRegFormInputs] = useState({
        username_reg: "",
        email_reg: "",
        password_one_reg: "",
        password_two_reg: ""
    });

    const [showLogin, setShowLogin] = useState(true);

    const {mailname, password} = formInputs;

    const onFieldChange = (e:any) => {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        });
    }

    const {username_reg, email_reg, password_one_reg, password_two_reg} = regFormInputs;

    const onRegFieldChange = (e:any) => {
        setRegFormInputs({
            ...regFormInputs,
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmit = async (e:any) => {
        try {
            e.preventDefault();
            document.getElementById('invalidWarning')?.setAttribute('style', 'display: none; color: red;');
            const reqBody = {mailname, password};
            const authRes = await fetch(
                process.env.API_URL + '/auth/login',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    },
                    body: JSON.stringify(reqBody)
                }
            );
            const parseAuthRes = await authRes.json();

            if(parseAuthRes.token){
                setFormInputs({mailname: "", password: ""});
                document.getElementById('loginCloseButton')?.click();
                localStorage.setItem("token", parseAuthRes.token);

                const name = parseAuthRes.name;

                setUser({ name });
                setAuth(true);
            }
            else{
                document.getElementById('invalidWarning')?.setAttribute('style', 'display: block; color: red;');
                setAuth(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const onRegFormSubmit = async (e:any) => {
        try {
            e.preventDefault();
            const reqBody = {email_reg, username_reg, password_one_reg};
            const authRes = await fetch(
                process.env.API_URL + '/auth/register',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    },
                    body: JSON.stringify(reqBody)
                }
            );
            const parseAuthRes = await authRes.json();

            if(parseAuthRes.token){
                setRegFormInputs({email_reg: "", username_reg: "", password_one_reg: "", password_two_reg: ""});
                document.getElementById('loginCloseButton')?.click();
                localStorage.setItem("token", parseAuthRes.token);

                const name = parseAuthRes.name;

                setUser({ name });
                setAuth(true);
            }
            else{
                setAuth(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setAuth(false);
    }

    return (
        <React.Fragment>
            {
                !isAuth ?
                <React.Fragment>
                    <button type="button" className="btn btn-secondary my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
                    <div className="modal fade" id="loginModal" data-tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" id="loginModal" role="document">
                            <div className="modal-content">
                            {
                                showLogin ?
                                <React.Fragment>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form onSubmit={onFormSubmit}>
                                        <div className="modal-body">
                                            <p id="invalidWarning" style={{display: 'none', color: 'red'}}>Incorrect Email/Username or Password</p>
                                            Email or Username: <input className="form-control my-2" type="text" name="mailname" value={mailname} onChange={(e) => {onFieldChange(e)}}/>
                                            Password: <input className="form-control my-2" type="password" name="password" value={password} onChange={(e) => {onFieldChange(e)}}/>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-link mr-auto my-auto" onClick={() => {setShowLogin(false)}}>Need an account?</button>
                                            <button id="loginCloseButton" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </form>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Register</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form onSubmit={onRegFormSubmit}>
                                        <div className="modal-body">
                                            Email: <input className="form-control my-2" type="text" name="email_reg" value={email_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                            Username: <input className="form-control my-2" type="text" name="username_reg" value={username_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                            Password: <input className="form-control my-2" type="password" name="password_one_reg" value={password_one_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                            Confirm Password: <input className="form-control my-2" type="password" name="password_two_reg" value={password_two_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-link mr-auto my-auto" onClick={() => {setShowLogin(true)}}>Already have an account?</button>
                                            <button id="loginCloseButton" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </form>
                                </React.Fragment>
                            }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                :
                <button type="button" className="btn btn-secondary my-2 my-sm-0" onClick={() => {logout()}}>Logout</button>
            }
        </React.Fragment>
    )
}

export default Login;