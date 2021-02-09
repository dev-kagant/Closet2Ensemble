import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import { login } from "../../../store/user";


import './CategoryDisplay.css'

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
        return dispatch(login({ email, password }))
            .then((res, rej) => {
                if (res && authentication) {
                    return history.push(`/closet/${res}`);
                }
                return history.push("/");
            })
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
    }


    return (
        <form onSubmit={handleSubmit} className="login-container" >
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="login-header">
                <h1>Closet to Ensemble</h1>
                <h3>Please Login</h3>
            </div>
            <input
                type="text"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="loginbutton buttonstyle">YOU MAY ENTER</button>
            <Link to="/sign-up" className="">CREATE  YOUR  CLOSET</Link>
        </form>
    );
}

export default LoginForm;
