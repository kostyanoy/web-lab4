import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ButtonContainer, StyledButton, TextFieldStyle, Message } from "./loginStyles";
import { useAuth } from "../../services/auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLoginChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9.@]+$/.test(value) || value === "") {
            setUsername(value);
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
            setMessage("Вы не заполнили все поля");
        } else {
            try {
                await auth.login(username, password);
                navigate("/main");
            } catch (error) {
                setMessage("Ошибка при входе");
            }
        }
    };
    const handleRegister = async () => {
        if (!username || !password) {
            setMessage("Вы не заполнили все поля");
        } else {
            try {
                await auth.register(username, password);
                setMessage("Вы успешно зарегистрировались");
            } catch (error) {
                setMessage("Пользователь уже зарегистрирован");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <Container>
                        <TextFieldStyle
                            type="text"
                            value={username}
                            onChange={handleLoginChange}
                            label="Username"
                            variant="outlined"
                        />
                        <br/>
                        <TextFieldStyle
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            label="Password"
                            variant="outlined"
                        />
                    <br/>
                    <ButtonContainer>
                        <StyledButton type="submit">Login</StyledButton>
                        <StyledButton type="button" onClick={handleRegister}>Register</StyledButton>
                    </ButtonContainer>
                    {message && <Message>{message}</Message>}
                </Container>
            </form>
        </div>
    );
};
export default Login;