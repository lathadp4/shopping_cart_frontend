import React, { useState } from 'react';
import './LoginPage.css';
import { loginUserData } from '../../service/LoginApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoginsuccess }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage('');

        loginUserData({ user_name: username, password: password })
            .then((response) => {
                if (response?.status === true) {
                    setLoginsuccess(true);
                    navigate("/product");
                } else {
                    setErrorMessage('Login failed. Please check your credentials.');
                }
            })
            .catch((err) => {
                console.error('Error: ', err);
                setErrorMessage('An error occurred. Please try again later.');
            });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e?.target?.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e?.target?.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="signup-text">Don't have an account? <a href="/">Sign Up</a></p>
            </div>
        </div>
    );
};

export default LoginPage;
