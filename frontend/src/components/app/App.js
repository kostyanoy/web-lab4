import React from 'react';
import Description from '../description/description';
import Clock from "../clock/clock";
import LoginPage from "../login/login";
import MainPage from "../mainPage/mainPage";
import {useAuth} from "../../services/auth";
import './App.css';

function App() {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated) {
        return (
            <div>
                <MainPage/>
            </div>
        );
    }
    return (
        <div>
            <Description/>
            <Clock/>
            <LoginPage/>
        </div>
    );
}

export default App;
