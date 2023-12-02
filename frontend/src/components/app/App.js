import React, { useState, useEffect } from 'react';
import Description from '../description/description';
import Clock from "../clock/clock";
import LoginPage from "../login/login";
import MainPage from "../mainPage/mainPage";
import { useAuth } from "../../services/auth";
import './App.css';

function App() {
    const { isAuthenticated } = useAuth();
    const [authenticated, setAuthenticated] = useState(isAuthenticated);

    useEffect(() => {
        console.log("Authenticated state changed:", isAuthenticated);
        setAuthenticated(isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        console.log("Authenticated state set to:", authenticated);
    }, [authenticated]);

    if (authenticated) {
        console.log("User is authenticated");
        return (
            <div>
                <MainPage />
            </div>
        );
    }
    return (
        <div>
            <Description />
            <Clock />
            <LoginPage onLoginSuccess={() => setAuthenticated(true)} />
        </div>
    );
}

export default App;
