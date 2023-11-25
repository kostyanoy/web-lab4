import React, { useState } from "react";
import { Button, TextInput } from 'belle';
import "./login.css";

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleLogin = () => {
        //обработка входа
    };
    const handleRegister = () => {
        //обработка регистрации
    };
    return (
        <div>
            <form>
                <TextInput type="login" value={login} onChange={handleLoginChange} placeholder="Username" />
                <br />
                <TextInput type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <br />
                <Button type="button" primary onClick={handleLogin}>Login</Button>
                <Button type="button" onClick={handleRegister}>Register</Button>
            </form>
        </div>
    );
};

export default Login;
