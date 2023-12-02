import React, { useState } from "react";
import { TextFieldStyle } from "./loginStyles";
import { StyledButton } from "./loginStyles";
import { Container } from "./loginStyles";
import { useAuth } from "../../services/auth";
import "./login.css";

const Login = ({ onLoginSuccess }) => {
    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useAuth();

    const handleLoginChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9.@]+$/.test(value) || value === "") {
            setLogin(value);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9.@]+$/.test(value) || value === "") {
            setPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Вы не заполнили все поля");
        } else {
            try {
                await auth.login(username, password);
                onLoginSuccess();
            } catch (error) {
                setError("Ошибка при входе");
            }
        }
    };

    const handleRegister = async () => {
        if (!username || !password) {
            setError("Вы не заполнили все поля");
        } else {
            try {
                await auth.register(username, password);
            } catch (error) {
                setError("Ошибка при регистрации");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <Container>
                    <div className="textFieldContainer">
                        <TextFieldStyle
                            type="text"
                            value={username}
                            onChange={handleLoginChange}
                            label="Username"
                            variant="outlined"
                        />
                        <br />
                        <TextFieldStyle
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                    <br />
                    <div className="buttonContainer">
                        <StyledButton type="submit">Login</StyledButton>
                        <StyledButton type="button" onClick={handleRegister}>
                            Register
                        </StyledButton>
                    </div>
                </Container>
            </form>
        </div>
    );
};

export default Login;
