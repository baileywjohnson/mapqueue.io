import React, { useState } from 'react';

const Login = ({isAuth, setAuth, setUser}:any) => {
    
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

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const validateEmail = (email:any) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
    const validateUsername = (username:any) => {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(String(username));
    }

    // https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
    const validatePassword = (password:any) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(String(password));
    }

    const onRegFieldChange = (e:any) => {
        setRegFormInputs({
            ...regFormInputs,
            [e.target.name]: e.target.value
        });
        //Validate
        if(e.target.name === 'email_reg'){
            if(!validateEmail(e.target.value)){
                document.getElementById('invalidEmailWarning')?.setAttribute('style', 'display: block; color: red;');
            }else{
                document.getElementById('invalidEmailWarning')?.setAttribute('style', 'display: none; color: red;');
            }
        }
        if(e.target.name === 'username_reg'){
            if(!validateUsername(e.target.value)){
                document.getElementById('invalidUsernameWarning')?.setAttribute('style', 'display: block; color: red;');
            }else{
                document.getElementById('invalidUsernameWarning')?.setAttribute('style', 'display: none; color: red;');
            }
        }
        if(e.target.name === 'password_one_reg'){
            if(!validatePassword(e.target.value)){
                document.getElementById('invalidPasswordWarning')?.setAttribute('style', 'display: block; color: red;');
            }else{
                document.getElementById('invalidPasswordWarning')?.setAttribute('style', 'display: none; color: red;');
            }
        }
        if(e.target.name === 'password_two_reg'){
            if(regFormInputs.password_one_reg !== e.target.value){
                document.getElementById('invalidPasswordConfirmWarning')?.setAttribute('style', 'display: block; color: red;');
            }else{
                document.getElementById('invalidPasswordConfirmWarning')?.setAttribute('style', 'display: none; color: red;');
            }
        }
    }

    const onFormSubmit = async (e:any) => {
        try {
            e.preventDefault();
            document.getElementById('invalidWarning')?.setAttribute('style', 'display: none; color: red;');
            const reqBody = {mailname, password};

            if((validateEmail(mailname) || validateUsername(mailname)) && validatePassword(password)){
                const authRes = await fetch(
                    process.env.REACT_APP_API_URL + '/auth/login',
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


                    console.log(name);
                    setUser({ name });
                    setAuth(true);
                }
                else{
                    document.getElementById('invalidWarning')?.setAttribute('style', 'display: block; color: red;');
                    setAuth(false);
                }
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
            if(validateEmail(regFormInputs.email_reg) && validateUsername(regFormInputs.username_reg) && validatePassword(regFormInputs.password_one_reg) && (regFormInputs.password_one_reg === regFormInputs.password_two_reg)){
                const reqBody = {email_reg, username_reg, password_one_reg};
                const authRes = await fetch(
                    process.env.REACT_APP_API_URL + '/auth/register',
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
                    setShowLogin(true);
                    setAuth(true);
                }
                else{
                    setAuth(false);
                }
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
                    <button type="button" className="btn btn-primary my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
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
                                            <button type="button" style={{textDecoration: 'none'}} className="btn btn-link mr-auto my-auto" onClick={() => {setShowLogin(false)}}>Need an account?</button>
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
                                            <p id="invalidEmailWarning" style={{display: 'none', color: 'red'}}>Please Enter a Valid Email</p>
                                            Username: <input className="form-control my-2" type="text" name="username_reg" value={username_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                            <p id="invalidUsernameWarning" style={{display: 'none', color: 'red'}}>Username Cannot Contain Special Characters</p>
                                            Password: <input className="form-control my-2" type="password" name="password_one_reg" value={password_one_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                            <p id="invalidPasswordWarning" style={{display: 'none', color: 'red'}}>Password Must Contain Atleast 8 Characters (Must Include 1 Number, 1 Lowercase Character and 1 Uppercase Character)</p>
                                            Confirm Password: <input className="form-control my-2" type="password" name="password_two_reg" value={password_two_reg} onChange={(e) => {onRegFieldChange(e)}}/>
                                            <p id="invalidPasswordConfirmWarning" style={{display: 'none', color: 'red'}}>Passwords Must Match</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" style={{textDecoration: 'none'}} className="btn btn-link mr-auto my-auto" onClick={() => {setShowLogin(true)}}>Already have an account?</button>
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
                <button type="button" className="btn btn-danger my-2 my-sm-0" onClick={() => {logout()}}>Logout</button>
            }
        </React.Fragment>
    )
}

export default Login;