import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../login/login';
import MainPage from '../mainPage/mainPage';
import Clock from "../clock/clock";
import Description from "../description/description";
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<>
                    <Description />
                    <Clock />
                    <LoginPage />
                </>} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    );
}
export default App;
