import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom"
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import * as userActions from "../../../store/user";
import { signUp } from "../../../store/user";

import './SignUpForm.css'

function SignUpForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(signUp({ email, username, password }))
                .then((res) => { history.push(`/closet/${res}`) })     // need to make sure redirect works properly
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form onSubmit={handleSubmit} className="login-container">
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="login-header">
                <h1 className="titlestuff">Closet 2 Ensemble</h1>
                <h4 className="titlestuff">Your Closet Everywhere Life Takes You</h4>
            </div>
            <label>
                Email
            <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Username
            <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
            <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Confirm Password
            <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit" className="loginbutton buttonstyle">Open Your Closet</button>
            <Link to="/" className="create-you-closet">Already Have A Closet</Link>
        </form>
    );
}

export default SignUpForm;
