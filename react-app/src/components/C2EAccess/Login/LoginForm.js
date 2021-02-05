import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import * as userActions from "../../../store/user";
import { login, notAuthenticated } from "../../../store/user";
import SignUpModal from "../SignUp";

import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authenticated = useSelector((state) => state.user.authenticated)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const authentication = (res) => {
        return authenticated
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login(email, password))
            .then((res) => {
                console.log(res)
                if (authentication) {
                    return history.push(`/closet/${res}`);
                }
            })
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
    }


    return (
        <form onSubmit={handleSubmit} >
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <h1>Log In</h1>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="loginbutton buttonstyle">You May Enter</button>
            <Link to="/sign-up" className="">Create Your Closet</Link>
        </form>
    );
}

export default LoginForm;
